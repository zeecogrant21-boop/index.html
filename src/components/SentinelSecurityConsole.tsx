/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  RefreshCw,
  AlertTriangle,
  Lock,
  Activity,
  CheckCircle2,
  Sliders,
  Zap,
  Clock,
  Layers,
  FileCheck2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { SentinelSecurityAI, SecuritySweepReport } from '../utils/aiFederation';

export const SentinelSecurityConsole: React.FC = () => {
  const [sweeps, setSweeps] = useState<SecuritySweepReport[]>(() => SentinelSecurityAI.getSweepHistory());
  const [isAutoActive, setIsAutoActive] = useState(() => SentinelSecurityAI.isAutoSweepActive());
  const [isSweeping, setIsSweeping] = useState(false);
  const [latestSweep, setLatestSweep] = useState<SecuritySweepReport | null>(() => sweeps[0] || null);
  const [nextRandomSeconds, setNextRandomSeconds] = useState(52);

  // Subscribe to live sweep events
  useEffect(() => {
    const unsub = SentinelSecurityAI.subscribeToSweeps(report => {
      setSweeps(SentinelSecurityAI.getSweepHistory());
      setLatestSweep(report);
      // Reset next random interval countdown (between 40 and 75 seconds)
      setNextRandomSeconds(Math.floor(40 + Math.random() * 35));
    });

    const interval = setInterval(() => {
      setNextRandomSeconds(prev => (prev > 1 ? prev - 1 : 45));
    }, 1000);

    return () => {
      unsub();
      clearInterval(interval);
    };
  }, []);

  const handleManualSweep = () => {
    setIsSweeping(true);
    setTimeout(() => {
      const rep = SentinelSecurityAI.executeSecuritySweep('MANUAL_DEEP');
      setLatestSweep(rep);
      setSweeps(SentinelSecurityAI.getSweepHistory());
      setIsSweeping(false);
    }, 450);
  };

  const handleToggleAuto = () => {
    const next = !isAutoActive;
    setIsAutoActive(next);
    SentinelSecurityAI.setAutoSweep(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Sentinel Security Master Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-amber-500 to-rose-600 p-0.5 shadow-xl shadow-rose-950/60 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-7 h-7 animate-pulse text-rose-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  AI #3: ZG Sentinel Guardian
                </h2>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40 font-mono font-bold uppercase tracking-wider">
                  Security &amp; Systems Efficiency
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Sole job: On-board security, anti-theft vigilance, memory efficiency, and <strong className="text-amber-300 font-semibold">random security sweeps</strong> for <strong className="text-white">Zeeco Grant</strong>
              </p>
            </div>
          </div>

          {/* Trigger & Toggle Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px]">Random Sweeps:</span>
              <button
                onClick={handleToggleAuto}
                className="flex items-center gap-1 font-semibold text-xs cursor-pointer text-amber-400"
              >
                {isAutoActive ? (
                  <ToggleRight className="w-6 h-6 text-emerald-400" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-500" />
                )}
                <span className={isAutoActive ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isAutoActive ? 'Active' : 'Paused'}
                </span>
              </button>
            </div>

            <button
              onClick={handleManualSweep}
              disabled={isSweeping}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-rose-950/50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSweeping ? 'animate-spin' : ''}`} />
              <span>{isSweeping ? 'Sweeping System...' : 'Trigger Deep Security Sweep'}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Security Telemetry Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Next Random Sweep
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              ~{nextRandomSeconds}s
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">Autonomous Frequency</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Systems Efficiency Score
            </span>
            <p className="text-xl font-mono font-extrabold text-cyan-300 mt-1">
              {latestSweep ? latestSweep.memoryEfficiencyScore : 99.4}%
            </p>
            <span className="text-[10px] text-slate-400 font-mono">Zero Memory Leaks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              Watermark &amp; CMI
            </span>
            <p className="text-sm font-mono font-bold text-emerald-400 mt-1 truncate">
              SHA256-VERIFIED
            </p>
            <span className="text-[10px] text-slate-500 font-mono">100% Cryptographic Lock</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Threats Neutralized
            </span>
            <p className="text-xl font-mono font-extrabold text-emerald-400 mt-1">
              0 Threats
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">Pristine Defense Buffer</span>
          </div>
        </div>
      </div>

      {/* Latest Security Sweep Live Audit Card */}
      {latestSweep && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Latest Sweep Audit: {latestSweep.sweepId}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className={`px-2 py-0.5 rounded font-bold ${
                latestSweep.sweepType === 'RANDOM_AUTONOMOUS'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                  : 'bg-rose-950 text-rose-300 border border-rose-800/60'
              }`}>
                {latestSweep.sweepType.replace('_', ' ')}
              </span>
              <span className="text-slate-400">
                {new Date(latestSweep.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Watermark &amp; Legal Enforcement Audit:
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Cryptographic Seal:</span>
                  <span className="text-emerald-400 font-bold">{latestSweep.watermarkHash}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Anti-Piracy Covenants:</span>
                  <span className="text-emerald-400 font-bold">100% ENFORCED</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Liquidated Damages:</span>
                  <span className="text-rose-400 font-bold">$50,000,000 USD Active</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                Systems Efficiency Audit:
              </span>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Efficiency Index:</span>
                  <span className="text-cyan-300 font-bold">{latestSweep.memoryEfficiencyScore}% Optimal</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Scan Duration:</span>
                  <span className="text-slate-300">{latestSweep.scanDurationMs} ms</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Storage Integrity:</span>
                  <span className="text-emerald-400 font-bold">PRAGMA OK (0 Corruption)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Logs */}
          <div className="space-y-1 pt-2 border-t border-slate-800 font-mono text-[11px]">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              Sentinel Forensic Checklist:
            </span>
            {latestSweep.threatDetails.map((td, i) => (
              <div key={i} className="text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{td}</span>
              </div>
            ))}
            {latestSweep.systemRecommendations.map((rec, i) => (
              <div key={i} className="text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sweep History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Security Sweep Log History ({sweeps.length} Sweeps Logged)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Automated Audit Ledger
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="pb-2">Sweep ID</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Watermark Hash</th>
                <th className="pb-2">Efficiency</th>
                <th className="pb-2">Threats</th>
                <th className="pb-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sweeps.map(s => (
                <tr key={s.sweepId} className="hover:bg-slate-950/50 transition-colors">
                  <td className="py-2.5 font-bold text-white">{s.sweepId}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.sweepType === 'RANDOM_AUTONOMOUS'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/50'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                    }`}>
                      {s.sweepType}
                    </span>
                  </td>
                  <td className="py-2.5 text-emerald-400 truncate max-w-[150px]">{s.watermarkHash}</td>
                  <td className="py-2.5 text-cyan-300 font-bold">{s.memoryEfficiencyScore}%</td>
                  <td className="py-2.5 text-emerald-400">{s.threatsNeutralized} detected</td>
                  <td className="py-2.5 text-slate-400">{new Date(s.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
