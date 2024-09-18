import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const getEthereumProvider = async (): Promise<any> => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return new ethers.BrowserProvider(provider as any);
  } else {
    console.log('Please install MetaMask!');
    return null;
  }
};

export default getEthereumProvider;
