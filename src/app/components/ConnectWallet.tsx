'use client';

import React, { useState, createContext, useContext } from 'react';
import getEthereumProvider from '../config/ethereum.config';

export const WalletContext = createContext<{ address: string | null; setAddress: (address: string) => void }>({
  address: null,
  setAddress: () => {},
});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ address, setAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

const ConnectWallet = () => {
  const { address, setAddress } = useContext(WalletContext);

  const connectWallet = async () => {
    try {
      const provider = await getEthereumProvider();
      if (provider) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
      }
    } catch (err) {
      console.error("Failed to connect to MetaMask", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {address ? (
        <p>Connected as: {address}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
