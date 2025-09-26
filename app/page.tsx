'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { IdeaCard } from './components/IdeaCard';
import { SpinWheel } from './components/SpinWheel';
import { OnChainTxStatus } from './components/OnChainTxStatus';
import { LiveStreamOverlay } from './components/LiveStreamOverlay';
import { TrendingUp, Zap, Users, Trophy, Plus, Filter } from 'lucide-react';

// Mock data
const mockIdeas = [
  {
    id: '1',
    title: 'Smart Governance Token with Quadratic Voting',
    description: 'A governance token that implements quadratic voting to prevent whale dominance and ensure fair community decision-making.',
    author: 'CryptoBuilder',
    votes: 127,
    timestamp: '2 hours ago',
    status: 'active' as const,
    category: 'DeFi'
  },
  {
    id: '2',
    title: 'NFT Marketplace for Livestream Moments',
    description: 'Create and trade NFTs of memorable livestream moments, clips, and highlights with automatic royalty distribution.',
    author: 'StreamMaster',
    votes: 89,
    timestamp: '1 hour ago',
    status: 'voted' as const,
    category: 'NFT'
  },
  {
    id: '3',
    title: 'Decentralized Prediction Market for Stream Outcomes',
    description: 'Let viewers bet on stream outcomes, game results, and content decisions using a transparent prediction market.',
    author: 'DegenDev',
    votes: 156,
    timestamp: '30 minutes ago',
    status: 'winner' as const,
    category: 'Gaming'
  }
];

const mockTransactions = [
  {
    id: '1',
    type: 'submission' as const,
    status: 'success' as const,
    hash: '0x1234...5678',
    timestamp: '2 min ago',
    description: 'Idea submission: Smart Governance Token'
  },
  {
    id: '2',
    type: 'vote' as const,
    status: 'pending' as const,
    timestamp: '1 min ago',
    description: 'Vote on NFT Marketplace concept'
  },
  {
    id: '3',
    type: 'reward' as const,
    status: 'success' as const,
    hash: '0xabcd...efgh',
    timestamp: '30 sec ago',
    description: 'Reward claim: 50 SOL tokens'
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'ideas' | 'wheel' | 'activity'>('ideas');
  const [ideas, setIdeas] = useState(mockIdeas);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', category: 'DeFi' });

  const handleVote = (ideaId: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === ideaId 
        ? { ...idea, votes: idea.votes + 1, status: 'voted' as const }
        : idea
    ));
  };

  const handleSubmitIdea = () => {
    if (!newIdea.title || !newIdea.description) return;

    const idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      description: newIdea.description,
      author: 'You',
      votes: 0,
      timestamp: 'just now',
      status: 'active' as const,
      category: newIdea.category
    };

    setIdeas(prev => [idea, ...prev]);
    setNewIdea({ title: '', description: '', category: 'DeFi' });
    setShowSubmissionForm(false);
  };

  return (
    <AppShell>
      {/* Live Stream Overlay */}
      <LiveStreamOverlay />

      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-fg">
            Solana StreamCrafter
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Turn Livestream Ideas into Deployable Web3 Assets Live
          </p>
          <p className="text-muted max-w-2xl mx-auto">
            Listeners bring their ideas and merged gather into the 
            validating medium on-chain and its potential for 
            your life can solidify new often on-chain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Wheel Contract</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Deal Play</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-accent mb-2">1,050x</div>
          <div className="text-sm text-muted">Current Multiplier</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-fg mb-2">$16,250.00</div>
          <div className="text-sm text-muted">Total Value Locked</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-fg mb-2">2,531</div>
          <div className="text-sm text-muted">Active Participants</div>
        </div>
        <div className="metric-card text-center">
          <div className="text-3xl font-bold text-fg mb-2">$144.0k</div>
          <div className="text-sm text-muted">Rewards Distributed</div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === 'ideas' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-fg'
                }
              `}
            >
              Smart Contracts
            </button>
            <button
              onClick={() => setActiveTab('wheel')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === 'wheel' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-fg'
                }
              `}
            >
              Wheel Contract
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === 'activity' 
                  ? 'bg-accent text-bg' 
                  : 'text-muted hover:text-fg'
                }
              `}
            >
              Live Stream
            </button>
          </div>

          {activeTab === 'ideas' && (
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button
                onClick={() => setShowSubmissionForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Idea</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {activeTab === 'ideas' && (
            <>
              {/* Ideas List */}
              <div className="lg:col-span-2 space-y-6">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    variant={idea.status}
                    onVote={handleVote}
                  />
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <OnChainTxStatus transactions={mockTransactions} />
                
                {/* Deploy Section */}
                <div className="glass-card p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                    <Trophy className="w-8 h-8 text-bg" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-fg">Deploy</h3>
                    <p className="text-sm text-muted">Strongfall connections</p>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Deploy Now</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'wheel' && (
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpinWheel />
                <OnChainTxStatus transactions={mockTransactions} />
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-fg mb-4">Live Stream Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Current Viewers</span>
                      <span className="text-fg font-semibold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Ideas Submitted Today</span>
                      <span className="text-fg font-semibold">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Total Votes Cast</span>
                      <span className="text-fg font-semibold">342</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Rewards Distributed</span>
                      <span className="text-accent font-semibold">$2,531</span>
                    </div>
                  </div>
                </div>
                <OnChainTxStatus transactions={mockTransactions} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submission Form Modal */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-fg">Submit New Idea</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fg mb-2">Category</label>
                <select
                  value={newIdea.category}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-fg"
                >
                  <option value="DeFi">DeFi</option>
                  <option value="NFT">NFT</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Social">Social</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fg mb-2">Title</label>
                <input
                  type="text"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-fg"
                  placeholder="Enter your idea title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fg mb-2">Description</label>
                <textarea
                  value={newIdea.description}
                  onChange={(e) => setNewIdea(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-fg h-24 resize-none"
                  placeholder="Describe your idea in detail..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSubmissionForm(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitIdea}
                className="flex-1 btn-primary"
              >
                Submit Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
