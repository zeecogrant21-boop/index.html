/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Bot,
  Zap,
  ShieldCheck,
  Send,
  Layers,
  ArrowRight,
  Sparkles,
  Activity,
  Terminal,
  Radio,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MainBrainCore, BrainDirective } from '../utils/mainBrainEngine';

export const MainBrainConsole: React.FC<{ onDirectiveExecuted?: () => void }> = ({ onDirectiveExecuted }) => {
  const [brainState, setBrainState] = useState(() => MainBrainCore.getBrainState());
  const [executiveInput, setExecutiveInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastSynthesis, setLastSynthesis] = useState<ReturnType<typeof MainBrainCore.executeExecutiveSynthesis> | null>(null);
  const [coPilotOrderInput, setCoPilotOrderInput] = useState('');
  const [lastCoPilotResponse, setLastCoPilotResponse] = useState<string | null>(null);

  const quickExecutiveCommands = [
    '2+2',
    'Calculate 15% GCT on JMD $75,000 and total',
    'solve 3x + 15 = 45',
    'Synthesize Jamaican Economic Outlook with GCT and Coffee yields',
    'Compile multi-domain dossier on 1865 Morant Bay Rebellion & Paul Bogle',
    'Verify parish weather sensors and maritime tropical advisory status'
  ];

  const handleExecuteSynthesis = (cmd?: string) => {
    const text = (cmd || executiveInput).trim();
    if (!text) return;

    setIsProcessing(true);
    setExecutiveInput('');

    setTimeout(() => {
      const result = MainBrainCore.executeExecutiveSynthesis(text);
      setLastSynthesis(result);
      setBrainState(MainBrainCore.getBrainState());
      setIsProcessing(false);
      if (onDirectiveExecuted) onDirectiveExecuted();
    }, 450);
  };

  const handleDispatchOrderToCoPilot = () => {
    if (!coPilotOrderInput.trim()) return;
    const res = MainBrainCore.orderCoPilot(coPilotOrderInput);
    setLastCoPilotResponse(res.response);
    setCoPilotOrderInput('');
    setBrainState(MainBrainCore.getBrainState());
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Supreme Brain Master Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Brain className="w-7 h-7 animate-pulse text-amber-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  ZG Main Brain Core
                </h2>
                <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-mono font-bold uppercase tracking-wider">
                  Supreme Executive Commander
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Primary cognitive decision authority for <strong className="text-amber-300 font-semibold">Zeeco Grant</strong> • Overseeing Co-Pilot (Second in Command)
              </p>
            </div>
          </div>

          {/* Subordinate Link Status Card */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">SUBORDINATE SYSTEM:</span>
                <span className="font-bold text-white">Co-Pilot (2nd in Command)</span>
              </div>
            </div>
            <span className="w-px h-6 bg-slate-800" />
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-1 rounded font-mono font-semibold border border-emerald-800/60">
              ACTIVE LINKED
            </span>
          </div>
        </div>

        {/* Real-Time Brain Telemetry HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Cognitive Core Load
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              {brainState.cognitiveLoadPercentage}%
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">Supreme Multi-Threading</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Main Brain Memory Bus
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              {brainState.memoryBusKB} <span className="text-xs text-slate-500">KB</span>
            </p>
            <span className="text-[10px] text-slate-400 font-mono">SQLite Pinned Bus</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-400" />
              Directives Executed
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              {brainState.activeDirectives.length}
            </p>
            <span className="text-[10px] text-purple-400 font-mono">100% Success Rate</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Security Protocol
            </span>
            <p className="text-sm font-mono font-bold text-emerald-400 mt-1">
              $50M CLAUSE ACTIVE
            </p>
            <span className="text-[10px] text-slate-500 font-mono">WIPO Berne Sealed</span>
          </div>
        </div>
      </div>

      {/* Main Executive Command Terminal */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Executive Strategic Command Terminal
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Commander Terminal • Ready for Input
          </span>
        </div>

        {/* Input Directive */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">
            Issue High-Level Strategic Directive to Main Brain Core:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={executiveInput}
              onChange={(e) => setExecutiveInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleExecuteSynthesis()}
              placeholder="e.g. 'Synthesize Jamaican economic indicators with GCT and coffee harvest' or 'Run security sweep'"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={() => handleExecuteSynthesis()}
              disabled={isProcessing || !executiveInput.trim()}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Zap className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Synthesizing...' : 'Execute Directive'}</span>
            </button>
          </div>
        </div>

        {/* Quick Executive Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-slate-500 whitespace-nowrap">Suggested Directives:</span>
          {quickExecutiveCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleExecuteSynthesis(cmd)}
              className="text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Executive Synthesis Output Console */}
        {lastSynthesis && (
          <div className="p-5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-amber-300">
                  Directive {lastSynthesis.directiveId} Synthesized Successfully
                </span>
              </div>
              <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-800">
                Disciplines: {lastSynthesis.disciplinesActivated.join(', ')}
              </span>
            </div>

            <p className="text-xs text-white leading-relaxed font-semibold">
              {lastSynthesis.executiveSummary}
            </p>

            <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-200 font-mono">
              {lastSynthesis.subordinateAction}
            </div>

            {/* Execution Trace */}
            <div className="space-y-1 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Main Brain Cognitive Reasoning Trace:
              </span>
              {lastSynthesis.steps.map((st, i) => (
                <div key={i} className="text-slate-300">
                  {st}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Brain -> Co-Pilot Task Delegation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Direct Order Dispatch: Main Brain ➔ Co-Pilot
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Issue direct supervisory orders to the subordinate Co-Pilot (Second in Command) for field retrieval or user translation.
          </p>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={coPilotOrderInput}
                onChange={(e) => setCoPilotOrderInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDispatchOrderToCoPilot()}
                placeholder="Order Co-Pilot to perform a tactical task..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleDispatchOrderToCoPilot}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Order
              </button>
            </div>

            {lastCoPilotResponse && (
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 font-mono leading-relaxed mt-3">
                {lastCoPilotResponse}
              </div>
            )}
          </div>
        </div>

        {/* Directives Ledger */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Directives &amp; Execution Ledger
              </h3>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              Immutable Audit Log
            </span>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {brainState.activeDirectives.map(d => (
              <div key={d.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{d.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    d.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{d.description}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Assigned: {d.assignedTo}</span>
                  <span>{new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
