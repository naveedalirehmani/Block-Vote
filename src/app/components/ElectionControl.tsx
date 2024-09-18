'use client';

import React, { useState } from 'react';
import { getElectionContract } from '../contract';

const ElectionControl = () => {
  const [electionStarted, setElectionStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleStartElection = async () => {
    setLoading(true);
    try {
      const contract = await getElectionContract();
      const transaction = await contract.startElection();
      await transaction.wait();
      alert('Election started!');
      setElectionStarted(true);
    } catch (error) {
      console.error('Error starting election:', error);
      alert('Failed to start election.');
    }
    setLoading(false);
  };

  const handleEndElection = async () => {
    setLoading(true);
    try {
      const contract = await getElectionContract();
      const transaction = await contract.endElection();
      await transaction.wait();
      alert('Election ended!');
      setElectionStarted(false);
    } catch (error) {
      console.error('Error ending election:', error);
      alert('Failed to end election.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Election Control</h2>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleStartElection}
          disabled={loading || electionStarted}
        >
          {loading ? 'Processing...' : 'Start Election'}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleEndElection}
          disabled={loading || !electionStarted}
        >
          {loading ? 'Processing...' : 'End Election'}
        </button>
      </div>
    </div>
  );
};

export default ElectionControl;
