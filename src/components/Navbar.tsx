/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React from 'react';
import {
  Bot,
  Database,
  Tag,
  Calculator,
  CloudSun,
  MapPin,
  FileCode2,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Settings,
  Cpu,
  Radio,
  Brain,
  ShieldAlert,
  Sparkles,
  Compass,
  HeartPulse,
  Coffee,
  Mic
} from 'lucide-react';
import { DatabaseStats } from '../types/database';
import { CRITICAL_THRESHOLD_MB, WARNING_THRESHOLD_MB } from '../utils/databaseStore';

export type ActiveTab =
  | 'bridge'
  | 'brain'
  | 'copilot'
  | 'sentinel'
  | 'factfinder'
  | 'learning'
  | 'medical'
  | 'coffee'
  | 'database'
  | 'categories'
  | 'math'
  | 'weather'
  | 'parishes'
  | 'loader'
  | 'logs'
  | 'legal'
  | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stats: DatabaseStats;
  themeAccent?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, stats, themeAccent = 'solar-gold' }) => {
  const isOver50MB = stats.totalSizeMB > CRITICAL_THRESHOLD_MB;
  const isOver30MB = stats.totalSizeMB > WARNING_THRESHOLD_MB;

  const dbPillColor = isOver50MB
    ? 'bg-rose-950/90 text-rose-300 border-rose-500/70 shadow-rose-900/40 animate-pulse'
    : isOver30MB
    ? 'bg-amber-950/90 text-amber-300 border-amber-500/70'
    : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50';

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'bridge', label: 'Quad-AI Voice Bridge', icon: Mic },
    { id: 'brain', label: 'AI #1: Main Brain', icon: Brain },
    { id: 'copilot', label: 'AI #2: Co-Pilot', icon: Bot },
    { id: 'sentinel', label: 'AI #3: Sentinel Security', icon: ShieldAlert },
    { id: 'factfinder', label: 'AI #4: FactFinder Oracle', icon: Compass },
    { id: 'learning', label: 'Self-Learning Matrix', icon: Sparkles },
    { id: 'medical', label: 'Medical & Wounds Codex', icon: HeartPulse },
    { id: 'coffee', label: 'Coffee Estates & Process', icon: Coffee },
    { id: 'database', label: 'Database Maintenance', icon: Database },
    { id: 'categories', label: 'Smart Categories', icon: Tag },
    { id: 'math', label: 'Math & Solver', icon: Calculator },
    { id: 'weather', label: 'Live Weather', icon: CloudSun },
    { id: 'parishes', label: '14 Parishes', icon: MapPin },
    { id: 'loader', label: 'Knowledge Loader', icon: FileCode2 },
    { id: 'logs', label: 'Audit Logs', icon: Activity },
    { id: 'legal', label: 'Legal Fortress ($50M)', icon: ShieldAlert },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <header className="bg-slate-950/90 border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-xl shadow-2xl">
      {/* Top Futuristic Telemetry Ticker */}
      <div className="bg-black/60 border-b border-slate-900/90 px-4 py-1 text-[10px] text-slate-400 font-mono flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
            ZG CORE ONLINE
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            OWNER: <strong className="text-amber-400">ZEECO GRANT</strong>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-cyan-400">
            SYSTEM: ZG.PERSONAL.AI PROTOTYPE v2.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <Cpu className="w-3 h-3 text-amber-400" />
            ENGINE: ACTIVE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">100% SECURE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo / Brand with Cyber Accents */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center relative group">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm tracking-tight transition-transform group-hover:scale-105">
                ZG
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-wide flex items-center gap-1.5">
                  ZG Personal AI
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wider font-mono">
                  Zeeco Grant Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Exclusive Personal AI Suite • Jamaican Knowledge &amp; Diagnostics Engine
              </p>
            </div>
          </div>

          {/* Quick Metrics & Live Status */}
          <div className="flex items-center gap-2.5">
            {/* Live Database Size Pill with Dynamic Warning Color */}
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all shadow-sm ${dbPillColor}`}
              title={`Database Storage: ${stats.totalSizeMB.toFixed(2)} MB ${isOver50MB ? '(CRITICAL >50MB)' : isOver30MB ? '(WARNING >30MB)' : '(HEALTHY)'}`}
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono">{stats.totalSizeMB.toFixed(2)} MB</span>
              {isOver50MB && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
            </button>

            {/* Signature Security Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zeeco Grant Seal</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-900 scrollbar-none">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/50 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'database' && isOver50MB && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
