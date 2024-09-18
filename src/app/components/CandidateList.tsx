'use client';

import React, { useEffect, useState } from 'react';
import { getElectionContract, voteForCandidate } from '../contract';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  voteCount: number;
}

const CandidateList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<number | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
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
        console.error("Error fetching candidates:", error);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (candidateId: number) => {
    setVoting(candidateId);
    try {
      await voteForCandidate(candidateId);
      alert(`Vote casted for candidate ID: ${candidateId}`);
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Error casting vote.');
    }
    setVoting(null);
  };

  if (loading) {
    return <div>Loading candidates...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id} className="mb-2 border p-2 rounded-lg">
            <p className="font-bold">{candidate.name}</p>
            <p>Party: {candidate.party}</p>
            <p>Symbol: {candidate.symbol}</p>
            <p>Votes: {candidate.voteCount}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleVote(candidate.id)}
              disabled={voting !== null}
            >
              {voting === candidate.id ? 'Voting...' : 'Vote'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
