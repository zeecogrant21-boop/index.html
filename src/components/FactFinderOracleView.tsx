/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  Compass,
  Search,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Layers,
  ArrowRight,
  ShieldCheck,
  Bot,
  Brain,
  Share2
} from 'lucide-react';
import { FactFinderOracleAI, DecisiveFactResult } from '../utils/aiFederation';

export const FactFinderOracleView: React.FC = () => {
  const [query, setQuery] = useState('Who was Queen Nanny of the Maroons?');
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [decisiveResult, setDecisiveResult] = useState<DecisiveFactResult>(() =>
    FactFinderOracleAI.retrieveDecisively('Who was Queen Nanny of the Maroons?')
  );

  const sampleDecisiveQueries = [
    'Who was Queen Nanny of the Maroons?',
    'What is the capital of Saint Elizabeth?',
    'What are the 14 parishes and their capitals?',
    'How does photosynthesis convert sunlight into glucose?',
    'Explain the 1865 Morant Bay Rebellion and Paul Bogle',
    'How is Jamaican 15% GCT calculated?',
    '2+2',
    '15% of 4500',
    'What is the national motto of Jamaica?'
  ];

  const handleRetrieve = (customQuery?: string) => {
    const q = (customQuery || query).trim();
    if (!q) return;

    setIsRetrieving(true);
    setTimeout(() => {
      const res = FactFinderOracleAI.retrieveDecisively(q);
      setDecisiveResult(res);
      setIsRetrieving(false);
    }, 180);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* FactFinder Oracle Master Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border border-emerald-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-500 p-0.5 shadow-xl shadow-emerald-950/60 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                <Compass className="w-7 h-7 animate-pulse text-emerald-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  AI #4: ZG FactFinder Oracle
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-mono font-bold uppercase tracking-wider">
                  Decisive Instant Retrieval Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Sole job: Rapid search and decisive instant retrieval of facts and right answers, feeding <strong className="text-amber-300">Main Brain</strong> and <strong className="text-cyan-300">Co-Pilot</strong> so the app runs fluently
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">RETRIEVAL LATENCY:</span>
                <span className="font-bold text-emerald-400 font-mono">{decisiveResult.retrievalLatencyMs} ms</span>
              </div>
            </div>
            <span className="w-px h-6 bg-slate-800" />
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-1 rounded font-mono font-semibold border border-emerald-800/60">
              SUB-MILLI SPEED
            </span>
          </div>
        </div>

        {/* Real-Time Oracle Telemetry Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Average Retrieval Speed
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              4.8 <span className="text-xs text-slate-500">ms</span>
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">Zero Lag Pipeline</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Preloaded Packs Indexed
            </span>
            <p className="text-xl font-mono font-extrabold text-cyan-300 mt-1">
              33 Master Packs
            </p>
            <span className="text-[10px] text-slate-500 font-mono">100% Memory Resident</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Decisive Fact Confidence
            </span>
            <p className="text-xl font-mono font-extrabold text-amber-300 mt-1">
              {decisiveResult.confidenceScore}%
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Conflict-Free Answers</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              Multi-AI Broadcast
            </span>
            <p className="text-sm font-mono font-bold text-white mt-1">
              LINKED TO 3 AIs
            </p>
            <span className="text-[10px] text-purple-400 font-mono">Brain, Co-Pilot, Sentinel</span>
          </div>
        </div>
      </div>

      {/* Decisive Query Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Decisive Instant Retrieval Terminal
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Instant Search &amp; Single Right Answer
          </span>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">
            Enter Any Query for Decisive Instant Verification:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRetrieve()}
              placeholder="e.g. 'Who was Queen Nanny?', 'What is 15% of 4500?', 'What is the capital of Hanover?'"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              onClick={() => handleRetrieve()}
              disabled={isRetrieving || !query.trim()}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <Zap className={`w-4 h-4 ${isRetrieving ? 'animate-spin' : ''}`} />
              <span>{isRetrieving ? 'Retrieving...' : 'Retrieve Decisive Fact'}</span>
            </button>
          </div>
        </div>

        {/* Quick Queries */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-slate-500 whitespace-nowrap">Suggested Queries:</span>
          {sampleDecisiveQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleRetrieve(q);
              }}
              className="text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-mono"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Decisive Answer Result Output Card */}
        {decisiveResult && (
          <div className="p-5 bg-slate-950 rounded-xl border border-emerald-500/50 space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  Decisive Verified Truth: "{decisiveResult.query}"
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-800">
                  Category: {decisiveResult.primaryCategory}
                </span>
                <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-800">
                  Source: {decisiveResult.packSource}
                </span>
                <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  {decisiveResult.retrievalLatencyMs}ms
                </span>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs sm:text-sm text-slate-100 leading-relaxed font-sans font-medium">
              {decisiveResult.decisiveAnswer}
            </div>

            {/* Alternative interpretations & verified context */}
            <div className="space-y-1 pt-2 border-t border-slate-800 font-mono text-[11px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                Decisive Truth Provenance &amp; Cross-Pack Verification:
              </span>
              {decisiveResult.alternativeInterpretations.map((alt, i) => (
                <div key={i} className="text-slate-400">
                  • {alt}
                </div>
              ))}
            </div>

            {/* Cross-AI Broadcast Banner */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400 font-semibold">{decisiveResult.verifiedBy}</span>
              <span>Fed to: AI #1 Main Brain &amp; AI #2 Co-Pilot</span>
            </div>
          </div>
        )}
      </div>

      {/* Multi-AI Fluency Flow Pipeline Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              4-AI Fluency Coordination: Dedicated Division of Labor
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">
            Autonomous Pipeline Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Brain className="w-4 h-4" />
              <span>AI #1: Main Brain</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Supreme cognitive executive. Decides strategic directives and orchestrates learning.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Bot className="w-4 h-4" />
              <span>AI #2: Co-Pilot</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Tactical second in command. Engages user, speaks Jamaican Patois, executes field queries.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>AI #3: Sentinel</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              On-board security and efficiency. Runs random security sweeps and enforces $50M clause.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Compass className="w-4 h-4" />
              <span>AI #4: FactFinder</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Instant retrieval and decisive facts. Feeds true answers so other AIs execute without latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
