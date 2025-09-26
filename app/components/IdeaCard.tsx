'use client';

import { useState } from 'react';
import { Heart, MessageCircle, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    author: string;
    votes: number;
    timestamp: string;
    status: 'active' | 'voted' | 'winner';
    category: string;
  };
  variant?: 'active' | 'voted' | 'winner';
  onVote?: (ideaId: string) => void;
}

export function IdeaCard({ idea, variant = 'active', onVote }: IdeaCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(variant === 'voted');

  const handleVote = async () => {
    if (hasVoted || isVoting) return;
    
    setIsVoting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate transaction
      setHasVoted(true);
      onVote?.(idea.id);
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusIcon = () => {
    switch (variant) {
      case 'winner':
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case 'voted':
        return <Heart className="w-5 h-5 text-red-500 fill-current" />;
      default:
        return <Clock className="w-5 h-5 text-muted" />;
    }
  };

  const getCardStyles = () => {
    switch (variant) {
      case 'winner':
        return 'glass-card glow-accent border-accent';
      case 'voted':
        return 'glass-card border-green-500';
      default:
        return 'glass-card hover:border-accent transition-all duration-200';
    }
  };

  return (
    <div className={`${getCardStyles()} p-6 space-y-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            {idea.category}
          </span>
        </div>
        <div className="text-xs text-muted">
          {idea.timestamp}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-fg line-clamp-2">
          {idea.title}
        </h3>
        <p className="text-sm text-muted line-clamp-3">
          {idea.description}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-bg">
            {idea.author.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm text-muted">by {idea.author}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-fg">{idea.votes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">12</span>
          </div>
        </div>

        {variant === 'active' && (
          <button
            onClick={handleVote}
            disabled={hasVoted || isVoting}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${hasVoted 
                ? 'bg-green-500 text-white cursor-not-allowed' 
                : isVoting
                ? 'bg-muted text-fg cursor-not-allowed'
                : 'bg-accent text-bg hover:bg-yellow-400'
              }
            `}
          >
            {isVoting ? 'Voting...' : hasVoted ? 'Voted' : 'Vote'}
          </button>
        )}

        {variant === 'winner' && (
          <div className="px-4 py-2 bg-accent text-bg rounded-lg text-sm font-medium">
            Winner!
          </div>
        )}
      </div>
    </div>
  );
}
