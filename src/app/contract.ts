import { ethers } from "ethers";
import getEthereumProvider from "./config/ethereum.config";
import electionAbi from './data.json'

const electionContractAddress = "0x393c95cf8181e6a3b7f255a73abab0b207346a1e";

export const getElectionContract = async (): Promise<ethers.Contract> => {
  const provider = await getEthereumProvider();
  if (!provider) {
    throw new Error("Ethereum provider not available");
  }
  const signer = await provider.getSigner();
  return new ethers.Contract(electionContractAddress, electionAbi, signer);
};

export const voteForCandidate = async (candidateId: number): Promise<void> => {
  const contract = await getElectionContract();
  const transaction = await contract.vote(candidateId);
  await transaction.wait();
};

export const isOwner = async (userAddress: string): Promise<boolean | undefined> => {
  const contract = await getElectionContract();
  try{
    const owner = await contract.owner();
    console.log(owner,'owner')
    return owner.toLowerCase() === userAddress.toLowerCase();
  }catch(error){
    console.log(error,'kos')
  }
};

export const isAuthorizedVoter = async (userAddress: string): Promise<boolean> => {
  const contract = await getElectionContract();
  const voter = await contract.voters(userAddress);
  return voter.authorized;
};

export const getAllCandidates = async () => {
  try {
    const contract = await getElectionContract();
    const candidates = await contract.getAllCandidates();
    return candidates;
  } catch (error) {
    console.error("Failed to fetch candidates", error);
    throw error;
  }
};