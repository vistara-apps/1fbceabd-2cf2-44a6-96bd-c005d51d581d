'use client';

import { useState, useEffect } from 'react';
import { Users, TrendingUp, Zap, Eye } from 'lucide-react';

interface LiveStreamData {
  viewers: number;
  activeIdeas: number;
  totalVotes: number;
  currentMultiplier: number;
}

export function LiveStreamOverlay() {
  const [streamData, setStreamData] = useState<LiveStreamData>({
    viewers: 1247,
    activeIdeas: 8,
    totalVotes: 342,
    currentMultiplier: 1.05
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'CryptoBuilder', action: 'submitted idea', timestamp: '2s ago' },
    { id: 2, user: 'SolanaFan', action: 'voted on NFT concept', timestamp: '5s ago' },
    { id: 3, user: 'DegenDev', action: 'won 50 SOL tokens', timestamp: '12s ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamData(prev => ({
        ...prev,
        viewers: prev.viewers + Math.floor(Math.random() * 10) - 5,
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        currentMultiplier: Number((prev.currentMultiplier + (Math.random() * 0.02 - 0.01)).toFixed(2))
      }));

      // Add new activity
      if (Math.random() > 0.7) {
        const actions = ['submitted idea', 'voted', 'won reward', 'deployed contract'];
        const users = ['CryptoBuilder', 'SolanaFan', 'DegenDev', 'Web3Wizard', 'BlockchainBoss'];
        
        setRecentActivity(prev => [
          {
            id: Date.now(),
            user: users[Math.floor(Math.random() * users.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            timestamp: 'now'
          },
          ...prev.slice(0, 4)
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 w-80 space-y-4 z-50">
      {/* Live Stats */}
      <div className="glass-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-fg">Live Stream</h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-500">LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-bold text-fg">{streamData.viewers.toLocaleString()}</div>
              <div className="text-xs text-muted">Viewers</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-bold text-fg">{streamData.activeIdeas}</div>
              <div className="text-xs text-muted">Active Ideas</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-bold text-fg">{streamData.totalVotes}</div>
              <div className="text-xs text-muted">Total Votes</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-bold text-accent">{streamData.currentMultiplier}x</div>
              <div className="text-xs text-muted">Multiplier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-fg">Recent Activity</h3>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-fg font-medium">{activity.user}</span>
                <span className="text-muted">{activity.action}</span>
              </div>
              <span className="text-muted">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="text-sm font-semibold text-fg">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-secondary text-xs py-2">
            Submit Idea
          </button>
          <button className="btn-secondary text-xs py-2">
            Vote Now
          </button>
          <button className="btn-primary text-xs py-2 col-span-2">
            Spin Wheel
          </button>
        </div>
      </div>
    </div>
  );
}
