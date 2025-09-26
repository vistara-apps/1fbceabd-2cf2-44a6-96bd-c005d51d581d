'use client';

import { useState, useRef } from 'react';
import { Gift, Zap, Coins, Trophy } from 'lucide-react';

interface SpinWheelProps {
  variant?: 'spinning' | 'result';
  onSpin?: (result: string) => void;
}

const rewards = [
  { id: 1, label: 'SOL Tokens', icon: Coins, color: 'from-yellow-400 to-yellow-600', probability: 30 },
  { id: 2, label: 'NFT Drop', icon: Gift, color: 'from-purple-400 to-purple-600', probability: 20 },
  { id: 3, label: 'Burn & Build', icon: Zap, color: 'from-red-400 to-red-600', probability: 25 },
  { id: 4, label: 'Bonus Round', icon: Trophy, color: 'from-green-400 to-green-600', probability: 15 },
  { id: 5, label: 'Double XP', icon: Zap, color: 'from-blue-400 to-blue-600', probability: 10 },
];

export function SpinWheel({ variant = 'spinning', onSpin }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Simulate spinning animation
    if (wheelRef.current) {
      const randomRotation = Math.floor(Math.random() * 360) + 1440; // At least 4 full rotations
      wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    }

    // Wait for animation and determine result
    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setResult(randomReward.label);
      setIsSpinning(false);
      onSpin?.(randomReward.label);
    }, 3000);
  };

  return (
    <div className="glass-card p-8 text-center space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-fg">Reward Wheel</h3>
        <p className="text-muted">Spin to win exclusive rewards!</p>
      </div>

      {/* Wheel */}
      <div className="relative mx-auto w-64 h-64">
        <div
          ref={wheelRef}
          className={`
            w-full h-full rounded-full border-4 border-accent relative overflow-hidden
            transition-transform duration-3000 ease-out
            ${isSpinning ? 'animate-spin-slow' : ''}
          `}
          style={{
            background: `conic-gradient(
              from 0deg,
              #ffd700 0deg 72deg,
              #9333ea 72deg 144deg,
              #dc2626 144deg 216deg,
              #16a34a 216deg 288deg,
              #2563eb 288deg 360deg
            )`
          }}
        >
          {/* Wheel segments */}
          {rewards.map((reward, index) => {
            const angle = (360 / rewards.length) * index;
            const IconComponent = reward.icon;
            
            return (
              <div
                key={reward.id}
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center',
                }}
              >
                <div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2"
                  style={{ transform: `translateX(-50%) rotate(${-angle}deg)` }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent"></div>
        </div>

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-surface border-4 border-accent rounded-full flex items-center justify-center">
          <Zap className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4">
          <div className="text-2xl font-bold text-accent animate-pulse-glow">
            🎉 You won: {result}!
          </div>
          <button className="btn-primary">
            Claim Reward
          </button>
        </div>
      )}

      {/* Spin Button */}
      {!result && (
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`
            btn-primary w-full
            ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>
      )}

      {/* Reward List */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {rewards.map((reward) => {
          const IconComponent = reward.icon;
          return (
            <div key={reward.id} className="flex items-center space-x-2 text-muted">
              <IconComponent className="w-3 h-3" />
              <span>{reward.label}</span>
              <span className="text-accent">({reward.probability}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
