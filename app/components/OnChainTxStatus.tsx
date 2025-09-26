'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'submission' | 'vote' | 'reward' | 'deployment';
  status: 'pending' | 'success' | 'error';
  hash?: string;
  timestamp: string;
  description: string;
}

interface OnChainTxStatusProps {
  variant?: 'pending' | 'success' | 'error';
  transactions?: Transaction[];
}

export function OnChainTxStatus({ variant = 'pending', transactions = [] }: OnChainTxStatusProps) {
  const [txList, setTxList] = useState<Transaction[]>(transactions);

  // Simulate real-time transaction updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTxList(prev => prev.map(tx => {
        if (tx.status === 'pending' && Math.random() > 0.7) {
          return {
            ...tx,
            status: Math.random() > 0.1 ? 'success' : 'error',
            hash: `0x${Math.random().toString(16).substr(2, 64)}`
          };
        }
        return tx;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-accent animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-accent';
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-fg">On-Chain Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-muted">Live</span>
        </div>
      </div>

      {txList.length === 0 ? (
        <div className="text-center py-8 text-muted">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {txList.map((tx) => (
            <div
              key={tx.id}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border
                ${getStatusColor(tx.status)} bg-surface bg-opacity-50
              `}
            >
              {getStatusIcon(tx.status)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-fg truncate">
                    {tx.description}
                  </p>
                  <span className="text-xs text-muted">
                    {tx.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${tx.status === 'success' ? 'bg-green-500 bg-opacity-20 text-green-400' :
                      tx.status === 'error' ? 'bg-red-500 bg-opacity-20 text-red-400' :
                      'bg-accent bg-opacity-20 text-accent'
                    }
                  `}>
                    {tx.type}
                  </span>
                  
                  {tx.hash && (
                    <a
                      href={`https://solscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-xs text-accent hover:text-yellow-400 transition-colors duration-200"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-accent">
            {txList.filter(tx => tx.status === 'success').length}
          </div>
          <div className="text-xs text-muted">Confirmed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400">
            {txList.filter(tx => tx.status === 'pending').length}
          </div>
          <div className="text-xs text-muted">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">
            {txList.filter(tx => tx.status === 'error').length}
          </div>
          <div className="text-xs text-muted">Failed</div>
        </div>
      </div>
    </div>
  );
}
