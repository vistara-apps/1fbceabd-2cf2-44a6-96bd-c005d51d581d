import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana StreamCrafter',
  description: 'Turn Livestream Ideas into Deployable Web3 Assets Live',
  keywords: ['Solana', 'Web3', 'Livestream', 'DeFi', 'Smart Contracts'],
  authors: [{ name: 'StreamCrafter Team' }],
  openGraph: {
    title: 'Solana StreamCrafter',
    description: 'Turn Livestream Ideas into Deployable Web3 Assets Live',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
