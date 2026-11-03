/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { KnowledgeStore } from '../utils/databaseStore';
import { SelfLearningEngine, NeuralSynapse } from '../utils/selfLearningEngine';
import { QAEntry } from '../types/database';

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: number;
  matchedQA?: QAEntry;
  learnedSynapse?: NeuralSynapse;
  score?: number;
  latencyMs?: number;
  dialect?: 'english' | 'patois';
}

export const CoPilotChat: React.FC<{ onLogCreated?: () => void }> = ({ onLogCreated }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'copilot',
      text: 'Greetings Commander Zeeco Grant! I am your ZG Personal AI Co-Pilot (Second in Command). Both myself and the Main Brain are equipped with real-time Self-Learning: every question you ask—from simple arithmetic like "2+2" to complex algebraic equations and historical inquiries—is autonomously analyzed, solved, learned, and cross-synchronized across our neural matrix. Try asking me "2+2" or any question below!',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isPatoisMode, setIsPatoisMode] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [metrics, setMetrics] = useState(() => SelfLearningEngine.getMetrics());

  const sampleQuestions = [
    '2+2',
    'What is 15% of 2500?',
    'solve 3x + 9 = 30',
    'sqrt(144) + 2^4',
    'Who was Queen Nanny of the Maroons?',
    'What are the 14 parishes and their capitals?',
    'How is Jamaican GCT calculated at 15%?',
    'What was the Empire Windrush migration in 1948?'
  ];

  const handleSend = (queryToSend?: string) => {
    const q = (queryToSend || input).trim();
    if (!q) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSearching(true);

    setTimeout(() => {
      // 1. Ingest into Self-Learning Matrix (Self-learns from each question asked, simple to complex)
      const learning = SelfLearningEngine.ingestQuestion('Co-Pilot (Second in Command)', q);
      const synapse = learning.synapse;

      let answerText = '';

      if (synapse.domain === 'MATHEMATICS' || synapse.domain === 'STRATEGIC_SYNTHESIS') {
        // Mathematical / Computational question learned & solved
        const breakdownStr = synapse.stepBreakdown.length > 0
          ? `\n\nStep-by-Step Breakdown:\n${synapse.stepBreakdown.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n')}`
          : '';

        if (isPatoisMode) {
          answerText = `[Patois Mode • Math]: Hear wah! Di answer fi "${q}" a: ${synapse.solutionResult}.${breakdownStr}\n\n[Self-Learning]: Pattern "${synapse.problemFormat}" lock inna di Co-Pilot memory bank and sync straight up to Main Brain Commander!`;
        } else {
          answerText = `Computed Solution: ${synapse.solutionResult}\n${synapse.learnedSolution}${breakdownStr}\n\n[Self-Learning Neural Matrix]: ${learning.explanation}\n${learning.crossSyncNotice}`;
        }
      } else {
        // Factual query
        const searchResult = KnowledgeStore.search(q);
        const best = searchResult.bestMatch;

        if (best) {
          if (isPatoisMode) {
            answerText = `[Patois Mode]: Hear wah gwaan! ${best.answer.replace(/The national/gi, 'Di national').replace(/is the/gi, 'a di').replace(/was a/gi, 'did a').replace(/They/gi, 'Dem')}\n\n[Self-Learning]: Factual pattern registered into Co-Pilot tactical reflex memory and reported to Main Brain Commander!`;
          } else {
            answerText = `${best.answer}\n\n[Self-Learning Synapse]: ${learning.explanation}\n${learning.crossSyncNotice}`;
          }
        } else {
          answerText = isPatoisMode
            ? `Mi search di knowledge base but mi no find an exact match fi "${q}". Nonetheless, mi assimilate di query inna mi neural matrix fi continuous self-learning!`
            : `I could not find an exact verified record matching "${q}" in the preloaded packs. However, I have ingested this query into my Self-Learning Synaptic Matrix at ${synapse.complexityLabel} and cross-synchronized it with the Main Brain Commander.`;
        }
      }

      const copilotMsg: Message = {
        id: `copilot_${Date.now()}`,
        sender: 'copilot',
        text: answerText,
        timestamp: Date.now(),
        learnedSynapse: synapse,
        score: synapse.confidenceScore,
        latencyMs: 18,
        dialect: isPatoisMode ? 'patois' : 'english'
      };

      setMessages(prev => [...prev, copilotMsg]);
      setMetrics(SelfLearningEngine.getMetrics());
      setIsSearching(false);
      if (onLogCreated) onLogCreated();
    }, 200);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[740px] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                ZG Personal AI Co-Pilot
              </h2>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-700/60 font-mono font-bold">
                Second in Command
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/50 font-mono flex items-center gap-1">
                <Brain className="w-2.5 h-2.5" />
                Self-Learning Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Reports to: <strong className="text-amber-400">ZG Main Brain (Commander)</strong> • Licensed to <strong className="text-white">Zeeco Grant</strong>
            </p>
          </div>
        </div>

        {/* Live Learning Telemetry & Patois Switcher */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Synapses Learned: <strong className="text-emerald-400">{metrics.totalIngested}</strong></span>
          </div>

          {/* Patois Dialect Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px] font-medium">Patois Mode:</span>
            <button
              onClick={() => setIsPatoisMode(!isPatoisMode)}
              className="flex items-center gap-1 font-semibold text-xs cursor-pointer text-amber-400"
            >
              {isPatoisMode ? (
                <ToggleRight className="w-6 h-6 text-amber-400" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-500" />
              )}
              <span className={isPatoisMode ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                {isPatoisMode ? 'Patwa Active' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-md ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.learnedSynapse && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-300 font-semibold bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                      {msg.learnedSynapse.complexityLabel}
                    </span>
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-amber-300 font-mono">
                      Format: {msg.learnedSynapse.problemFormat}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-emerald-400">Weight: {msg.learnedSynapse.synapticWeight}</span>
                    <span className="text-amber-400">Confidence: {msg.learnedSynapse.confidenceScore}%</span>
                    <span className="text-slate-500">Cross-Synced</span>
                  </div>
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isSearching && (
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono p-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Consulting Self-Learning Matrix &amp; SQLite KnowledgeStore...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts (Simple to Complex) */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
        <span className="text-[11px] text-slate-400 whitespace-nowrap flex items-center gap-1 shrink-0 font-medium">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          Test Self-Learning (Simple ➔ Complex):
        </span>
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700 whitespace-nowrap cursor-pointer transition-colors shrink-0 font-mono"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isPatoisMode ? "Ask yuh question yah so... (e.g. '2+2' or 'Calculate 15% of 500')" : "Ask any math problem (e.g. '2+2', '15% of 2500', 'solve 2x+6=20') or factual question..."}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-cyan-950/50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
