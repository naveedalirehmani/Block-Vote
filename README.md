# Election dApp ( Block-Vote )

##### This is my final year project for college, Bachelor in Software Engineering (B.Sc. in SE)

This is a decentralized application (dApp) for running elections on the Ethereum blockchain. It allows users to connect their wallets via MetaMask, vote for candidates, and view election results. The election contract is written in Solidity, and the frontend is built using Next.js, Tailwind CSS, and ethers.js for interacting with the Ethereum blockchain.

## Features

- Add candidates before the election starts (Owner only)
- Authorize voters before the election begins (Owner only)
- Start and stop the election (Owner only)
- Voters can cast their vote during the election period
- Display all candidates and their vote counts
- Show election results after voting ends

## Technologies Used

- **Next.js** (React Framework)
- **Tailwind CSS** (CSS Utility Framework)
- **ethers.js** (Ethereum Blockchain Interaction)
- **MetaMask** (Ethereum Wallet Integration)
- **Solidity** (Smart Contract)

## Prerequisites

- **Node.js** (v18.17.0 or higher)
- **MetaMask** browser extension installed
- **Ethereum Test Network** (e.g., Rinkeby, Goerli, or local blockchain like Hardhat/Ganache)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/election-dapp.git
cd election-dapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variables

Create a `.env.local` file in the root directory and add the following values:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

### 4. Compile and Deploy the Smart Contract

To deploy the contract, follow these steps:

1. Compile the contract using Remix or Hardhat.
2. Deploy the `Election` contract on your desired Ethereum network.
3. Copy the deployed contract address and paste it in the `.env.local` file.

### 5. Start the development server

```bash
npm run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

### 6. Open on Local Network (Optional)

To access the app from your local network, add this option to your `package.json`:

```json
"scripts": {
  "dev": "next dev -H 0.0.0.0"
}
```

Then run:

```bash
npm run dev
```

Access the app using your machine's local IP address (e.g., `http://192.168.1.100:3000`).

## Usage

### Connect Wallet

1. Click **Connect Wallet** to connect your MetaMask wallet.
2. If you are the contract owner, you will be able to add candidates, authorize voters, and control the election.

### Voting

1. Once the election is started, authorized voters can cast their vote for their preferred candidate.
2. The vote count for each candidate will be updated in real-time.

### Election Control (Owner Only)

- **Start Election**: Begin the election, allowing voters to cast votes.
- **End Election**: Stop the election and finalize the results.

### Viewing Results

After the election ends, the results will be displayed, showing the total votes each candidate received.

## File Structure

```
.
├── app/
│   ├── components/
│   │   ├── ConnectWallet.tsx
│   │   ├── CandidateList.tsx
│   │   ├── AuthorizeVoter.tsx
│   │   ├── ElectionControl.tsx
│   │   └── ElectionResults.tsx
│   ├── page.tsx
│   └── layout.tsx
├── public/
├── styles/
│   └── globals.css
├── contract/
│   └── Election.sol
├── config/
│   └── ethereum.config.ts
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

## Smart Contract

The election smart contract is written in Solidity and allows the following:

- Adding candidates (owner only)
- Authorizing voters (owner only)
- Starting and stopping the election (owner only)
- Casting votes during the election
- Viewing candidates and results

### Smart Contract Deployment

To deploy the contract:

1. Compile the Solidity contract using Remix or Hardhat.
2. Deploy it to a testnet or a local Ethereum environment (e.g., using Ganache or Hardhat).
3. Replace the contract address in the `.env.local` file with the deployed address.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin my-feature`
5. Open a pull request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.