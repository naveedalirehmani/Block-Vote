'use client';

import React, { useState } from 'react';
import { getElectionContract } from '../contract';

const AuthorizeVoter = () => {
  const [voterAddress, setVoterAddress] = useState<string>('');
  const [authorizing, setAuthorizing] = useState<boolean>(false);

  const handleAuthorize = async () => {
    if (!voterAddress) {
      alert('Please enter a voter address');
      return;
    }

    setAuthorizing(true);
    try {
      const contract = await getElectionContract();
      const transaction = await contract.authorizeVoter(voterAddress);
      await transaction.wait();
      alert(`Voter authorized: ${voterAddress}`);
      setVoterAddress('');
    } catch (error) {
      console.error('Error authorizing voter:', error);
      alert('Authorization failed.');
    }
    setAuthorizing(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Authorize Voter</h2>
      <input
        type="text"
        placeholder="Enter voter address"
        className="border p-2 rounded w-full mb-2"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAuthorize}
        disabled={authorizing}
      >
        {authorizing ? 'Authorizing...' : 'Authorize Voter'}
      </button>
    </div>
  );
};

export default AuthorizeVoter;
