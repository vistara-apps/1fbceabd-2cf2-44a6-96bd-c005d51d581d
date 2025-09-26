'use client';

import { ReactNode } from 'react';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useTheme } from './ThemeProvider';
import { Settings2, Zap } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'minimal';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const { theme, setTheme } = useTheme();

  if (variant === 'minimal') {
    return (
      <div className="min-h-screen bg-bg">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-bg" />
              </div>
              <h1 className="text-xl font-bold text-fg">StreamCrafter</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-muted hover:text-fg transition-colors duration-200">
                Features
              </a>
              <a href="#" className="text-muted hover:text-fg transition-colors duration-200">
                Discover
              </a>
              <a href="#" className="text-muted hover:text-fg transition-colors duration-200">
                Builders
              </a>
              <a href="#" className="text-muted hover:text-fg transition-colors duration-200">
                Mastery
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Selector */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="bg-surface border border-border rounded-md px-3 py-1 text-sm text-fg"
              >
                <option value="default">Finance</option>
                <option value="solana">Solana</option>
                <option value="celo">Celo</option>
                <option value="base">Base</option>
                <option value="coinbase">Coinbase</option>
              </select>

              {/* Wallet Connection */}
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-2 bg-surface border border-accent rounded-lg px-4 py-2 hover:bg-accent hover:text-bg transition-all duration-200">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>

              <button className="btn-primary">
                Sponsor Toy
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
