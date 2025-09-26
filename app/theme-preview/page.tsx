'use client';

import { AppShell } from '../components/AppShell';
import { useTheme } from '../components/ThemeProvider';
import { Palette, Eye, Zap } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Finance Pro', description: 'Professional Wall Street meets crypto' },
  { id: 'solana', name: 'Solana', description: 'Purple gradient with Solana branding' },
  { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Navy background with Coinbase blue' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell variant="minimal">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center mx-auto">
            <Palette className="w-8 h-8 text-bg" />
          </div>
          <h1 className="text-3xl font-bold text-fg">Theme Preview</h1>
          <p className="text-muted">
            Explore different visual themes for StreamCrafter
          </p>
        </div>

        {/* Current Theme Display */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Current Theme: {themes.find(t => t.id === theme)?.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-bg border-2 border-border rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-muted">Background</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-surface border-2 border-border rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-muted">Surface</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent border-2 border-border rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-muted">Accent</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary border-2 border-border rounded-lg mx-auto mb-2"></div>
              <span className="text-xs text-muted">Primary</span>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {themes.map((themeOption) => (
            <div
              key={themeOption.id}
              className={`
                glass-card p-6 cursor-pointer transition-all duration-200
                ${theme === themeOption.id ? 'border-accent glow-accent' : 'hover:border-accent'}
              `}
              onClick={() => setTheme(themeOption.id as any)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-fg">{themeOption.name}</h3>
                {theme === themeOption.id && (
                  <Eye className="w-5 h-5 text-accent" />
                )}
              </div>
              <p className="text-sm text-muted mb-4">{themeOption.description}</p>
              <button className="btn-primary w-full text-sm">
                {theme === themeOption.id ? 'Current Theme' : 'Apply Theme'}
              </button>
            </div>
          ))}
        </div>

        {/* Component Previews */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-fg">Component Previews</h2>
          
          {/* Buttons */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="bg-surface border border-border text-fg px-4 py-2 rounded-lg">
                Surface Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-accent" />
                  <div>
                    <div className="text-2xl font-bold text-fg">1,247</div>
                    <div className="text-sm text-muted">Active Users</div>
                  </div>
                </div>
              </div>
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">$12.5K</div>
                    <div className="text-sm text-muted">Total Value</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Elements */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Form Elements</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fg mb-2">Input Field</label>
                <input
                  type="text"
                  placeholder="Enter text here..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-fg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-fg mb-2">Select Dropdown</label>
                <select className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-fg">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
