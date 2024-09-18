import './globals.css';
import { WalletProvider } from './components/ConnectWallet';

export const metadata = {
  title: 'Election DApp',
  description: 'Decentralized Voting Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
