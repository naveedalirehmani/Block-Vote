'use client';

import { useEffect, useState, useContext } from 'react';
import { isOwner, isAuthorizedVoter } from './contract';
import ConnectWallet, { WalletContext } from './components/ConnectWallet';
import CandidateList from './components/CandidateList';
import AuthorizeVoter from './components/AuthorizeVoter';
import ElectionControl from './components/ElectionControl';
import ElectionResults from './components/ElectionResults';

export default function Home() {
  const { address } = useContext(WalletContext);
  const [isUserOwner, setIsUserOwner] = useState<boolean>(false);
  const [isUserAuthorizedVoter, setIsUserAuthorizedVoter] = useState<boolean>(false);

  useEffect(() => {
    const checkRoles = async () => {
      if (address) {
        const ownerStatus = await isOwner(address);
        const voterStatus = await isAuthorizedVoter(address);

        setIsUserOwner(ownerStatus);
        setIsUserAuthorizedVoter(voterStatus);
      }
    };

    checkRoles();
  }, [address]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <ConnectWallet />
      {address && (
        <div className="w-full max-w-3xl mt-8">
          <CandidateList />
          {isUserOwner && <AuthorizeVoter />}
          {isUserOwner && <ElectionControl />}
          {(isUserOwner || isUserAuthorizedVoter) && <ElectionResults />}
        </div>
      )}
    </div>
  );
}
