'use client';

import React, { useEffect, useState } from 'react';
import { getElectionContract } from '../contract';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  voteCount: number;
}

const ElectionResults = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const contract = await getElectionContract();
        const numCandidates = await contract.getNumCandidates();

        const candidateList: Candidate[] = [];
        for (let i = 0; i < numCandidates; i++) {
          const candidate = await contract.getCandidate(i);
          candidateList.push({
            id: i,
            name: candidate[0],
            party: candidate[1],
            symbol: candidate[2],
            voteCount: candidate[3],
          });
        }

        setCandidates(candidateList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching election results:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading election results...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Election Results</h2>
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Party</th>
              <th className="border px-4 py-2">Symbol</th>
              <th className="border px-4 py-2">Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="border px-4 py-2">{candidate.id}</td>
                <td className="border px-4 py-2">{candidate.name}</td>
                <td className="border px-4 py-2">{candidate.party}</td>
                <td className="border px-4 py-2">{candidate.symbol}</td>
                <td className="border px-4 py-2">{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ElectionResults;
