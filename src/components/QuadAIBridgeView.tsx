/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  Brain,
  Bot,
  ShieldAlert,
  Compass,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  MessageSquare,
  Radio,
  ToggleLeft,
  ToggleRight,
  Activity
} from 'lucide-react';
import {
  JamaicanVoiceEngine,
  AI_PERSONAS,
  AIPersonaId
} from '../utils/jamaicanVoiceEngine';
import { KnowledgeStore } from '../utils/databaseStore';
import { SentinelSecurityAI, FactFinderOracleAI } from '../utils/aiFederation';
import { SelfLearningEngine } from '../utils/selfLearningEngine';
import { QuadAIDispatcher } from '../utils/quadAIDispatcher';

interface InteractionMessage {
  id: string;
  aiId: AIPersonaId;
  aiName: string;
  sender: 'user' | 'ai';
  text: string;
  dialect: 'patois' | 'english';
  timestamp: number;
}

export const QuadAIBridgeView: React.FC = () => {
  const [selectedAI, setSelectedAI] = useState<AIPersonaId>('brain');
  const [usePatois, setUsePatois] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<InteractionMessage[]>([
    {
      id: 'init_msg',
      aiId: 'brain',
      aiName: 'ZG Main Brain Core',
      sender: 'ai',
      text: AI_PERSONAS.brain.defaultGreetingPatois,
      dialect: 'patois',
      timestamp: Date.now()
    }
  ]);

  const activePersona = AI_PERSONAS[selectedAI];
  const permanentCount = KnowledgeStore.getPermanentKnowledgeCount();

  const handleSpeakText = (text: string, personaId: AIPersonaId = selectedAI) => {
    setIsSpeaking(true);
    const spoken = JamaicanVoiceEngine.speak(
      personaId,
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
    if (!spoken) setIsSpeaking(false);
  };

  const handleStopSpeaking = () => {
    JamaicanVoiceEngine.stop();
    setIsSpeaking(false);
  };

  const handleInteractWithAI = (personaId: AIPersonaId) => {
    setSelectedAI(personaId);
    const p = AI_PERSONAS[personaId];
    const greeting = usePatois ? p.defaultGreetingPatois : p.defaultGreetingEnglish;

    const newMsg: InteractionMessage = {
      id: `msg_${Date.now()}`,
      aiId: personaId,
      aiName: p.name,
      sender: 'ai',
      text: greeting,
      dialect: usePatois ? 'patois' : 'english',
      timestamp: Date.now()
    };

    setChatHistory(prev => [newMsg, ...prev.slice(0, 15)]);
    handleSpeakText(greeting, personaId);
  };

  const handleSendPrompt = (presetText?: string) => {
    const textToSend = (presetText || userInput).trim();
    if (!textToSend) return;

    setUserInput('');

    // Add user message
    const userMsg: InteractionMessage = {
      id: `usr_${Date.now()}`,
      aiId: selectedAI,
      aiName: activePersona.name,
      sender: 'user',
      text: textToSend,
      dialect: usePatois ? 'patois' : 'english',
      timestamp: Date.now()
    };

    setChatHistory(prev => [userMsg, ...prev]);

    // Use QuadAIDispatcher for intelligent name detection and response generation
    setTimeout(() => {
      // Check if user specifically addressed an AI by name or if we should use currently selected AI
      const addressedTarget = QuadAIDispatcher.detectAddressedAI(textToSend);
      const responses = addressedTarget === 'all_four'
        ? QuadAIDispatcher.processQuery(textToSend)
        : [QuadAIDispatcher.generateResponseForAI(addressedTarget || selectedAI, textToSend)];

      const newMessages: InteractionMessage[] = responses.map(res => {
        const textToUse = usePatois ? res.patoisDialectText : res.answerText;
        return {
          id: `ai_${Date.now()}_${res.aiId}`,
          aiId: res.aiId,
          aiName: res.aiName,
          sender: 'ai',
          text: textToUse,
          dialect: usePatois ? 'patois' : 'english',
          timestamp: Date.now()
        };
      });

      setChatHistory(prev => [...newMessages, ...prev.slice(0, 20)]);

      // Speak out the primary response
      if (newMessages.length > 0) {
        handleSpeakText(newMessages[0].text, newMessages[0].aiId);
      }
    }, 200);
  };

  const getAIIcon = (id: AIPersonaId) => {
    switch (id) {
      case 'brain':
        return <Brain className="w-5 h-5 text-amber-400" />;
      case 'copilot':
        return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'sentinel':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'factfinder':
        return <Compass className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top 4-AI Command Bridge Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-emerald-500 to-cyan-500 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Radio className="w-7 h-7 text-amber-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Quad-AI Command Bridge &amp; Jamaican Voice Center
                </h2>
                <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-mono font-bold uppercase tracking-wider">
                  4 Autonomous AIs
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Interact with each specialized AI • Authentic Jamaican Patois dialect &amp; real-time audio voice synthesis for <strong className="text-amber-300 font-semibold">Zeeco Grant</strong>
              </p>
            </div>
          </div>

          {/* Master Dialect Switcher & Speech Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-medium">Dialect Mode:</span>
              <button
                onClick={() => setUsePatois(!usePatois)}
                className="flex items-center gap-1.5 font-bold text-xs cursor-pointer text-amber-400"
              >
                {usePatois ? (
                  <ToggleRight className="w-6 h-6 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-500" />
                )}
                <span>{usePatois ? 'Jamaican Patois' : 'Standard English'}</span>
              </button>
            </div>

            {isSpeaking ? (
              <button
                onClick={handleStopSpeaking}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-lg animate-pulse"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop Audio</span>
              </button>
            ) : (
              <button
                onClick={() => handleSpeakText(usePatois ? activePersona.defaultGreetingPatois : activePersona.defaultGreetingEnglish)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors shadow-md shadow-amber-950/50"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear AI Speak</span>
              </button>
            )}
          </div>
        </div>

        {/* Permanent Knowledge Protection Badge */}
        <div className="mt-4 p-3 bg-slate-950/90 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-mono">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Permanent Master Knowledge Bus Active:</span>
            <span className="text-white">{permanentCount} Master Facts Permanently Sealed (Cannot Be Deleted)</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono">
            IMMUTABLE PROTECTED
          </span>
        </div>
      </div>

      {/* 4 Specialized AI Cards with "Speak to AI" Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AI 1: Main Brain */}
        <div
          className={`p-5 rounded-2xl bg-slate-900 border transition-all space-y-3 relative overflow-hidden ${
            selectedAI === 'brain' ? 'border-amber-500 shadow-xl shadow-amber-950/50 ring-1 ring-amber-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              AI #1 • COMMANDER
            </span>
            <Brain className="w-6 h-6 text-amber-400" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">ZG Main Brain</h3>
            <p className="text-[11px] text-amber-300 font-mono mt-0.5">Supreme Executive Commander</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous cognitive synthesis, strategic decision tree, and meta-learning oversight.
          </p>

          <button
            onClick={() => handleInteractWithAI('brain')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm ${
              selectedAI === 'brain'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-950 hover:bg-slate-800 text-amber-400 border border-amber-500/40'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speak to Commander</span>
          </button>
        </div>

        {/* AI 2: Co-Pilot */}
        <div
          className={`p-5 rounded-2xl bg-slate-900 border transition-all space-y-3 relative overflow-hidden ${
            selectedAI === 'copilot' ? 'border-cyan-500 shadow-xl shadow-cyan-950/50 ring-1 ring-cyan-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              AI #2 • 2ND IN COMMAND
            </span>
            <Bot className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">ZG Co-Pilot</h3>
            <p className="text-[11px] text-cyan-300 font-mono mt-0.5">Tactical Field Assistant</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            User interaction liaison, lively Jamaican Patois adaptation, and tactical field execution.
          </p>

          <button
            onClick={() => handleInteractWithAI('copilot')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm ${
              selectedAI === 'copilot'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speak to Co-Pilot</span>
          </button>
        </div>

        {/* AI 3: Sentinel Guardian */}
        <div
          className={`p-5 rounded-2xl bg-slate-900 border transition-all space-y-3 relative overflow-hidden ${
            selectedAI === 'sentinel' ? 'border-rose-500 shadow-xl shadow-rose-950/50 ring-1 ring-rose-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              AI #3 • SECURITY CORE
            </span>
            <ShieldAlert className="w-6 h-6 text-rose-400" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">ZG Sentinel</h3>
            <p className="text-[11px] text-rose-300 font-mono mt-0.5">Security &amp; Efficiency</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous random security sweeps, watermark validation, and $50M anti-theft covenants.
          </p>

          <button
            onClick={() => handleInteractWithAI('sentinel')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm ${
              selectedAI === 'sentinel'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-950 hover:bg-slate-800 text-rose-400 border border-rose-500/40'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speak to Sentinel</span>
          </button>
        </div>

        {/* AI 4: FactFinder Oracle */}
        <div
          className={`p-5 rounded-2xl bg-slate-900 border transition-all space-y-3 relative overflow-hidden ${
            selectedAI === 'factfinder' ? 'border-emerald-500 shadow-xl shadow-emerald-950/50 ring-1 ring-emerald-500' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              AI #4 • TRUTH ENGINE
            </span>
            <Compass className="w-6 h-6 text-emerald-400" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">ZG FactFinder</h3>
            <p className="text-[11px] text-emerald-300 font-mono mt-0.5">Instant Decisive Retrieval</p>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Sub-millisecond knowledge search, right-answer verification, zero-latency pipeline.
          </p>

          <button
            onClick={() => handleInteractWithAI('factfinder')}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm ${
              selectedAI === 'factfinder'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Speak to Oracle</span>
          </button>
        </div>
      </div>

      {/* Live Voice & Dialogue Interaction Bridge */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            {getAIIcon(selectedAI)}
            <h3 className="text-base font-bold text-white tracking-wide">
              Active Dialogue with {activePersona.name}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
              {activePersona.dialectStyle}
            </span>
          </div>

          {/* Audio Visualizer Pulse Wave */}
          {isSpeaking && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Voice Transmitting in Patois...</span>
            </div>
          )}
        </div>

        {/* Input prompt */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">
            Speak or Send Query to {activePersona.name}:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder={`Ask ${activePersona.name} anything in Jamaican dialect or English...`}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={() => handleSendPrompt()}
              disabled={!userInput.trim()}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Send className="w-4 h-4" />
              <span>Send &amp; Speak</span>
            </button>
          </div>
        </div>

        {/* Quick Name-Addressing Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-amber-400 font-mono text-[11px] font-bold whitespace-nowrap">Hey AI Presets (Respond by Name):</span>
          <button onClick={() => handleSendPrompt("Hey Main Brain, what's the answer for 2+2?")} className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 whitespace-nowrap cursor-pointer font-mono font-semibold">Hey Main Brain, what's 2+2?</button>
          <button onClick={() => handleSendPrompt("Hey Co-Pilot, what's 2+2 in Jamaican dialect?")} className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 whitespace-nowrap cursor-pointer font-mono font-semibold">Hey Co-Pilot, what's 2+2?</button>
          <button onClick={() => handleSendPrompt("Hey Sentinel, check 2+2 and security status")} className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 whitespace-nowrap cursor-pointer font-mono font-semibold">Hey Sentinel, what's 2+2?</button>
          <button onClick={() => handleSendPrompt("Hey FactFinder, what is 2+2 and who was Paul Bogle?")} className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 whitespace-nowrap cursor-pointer font-mono font-semibold">Hey FactFinder, what's 2+2?</button>
          <button onClick={() => handleSendPrompt("Hey AIs, what's the answer for 2+2?")} className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50 whitespace-nowrap cursor-pointer font-mono font-bold">Hey AIs, what's 2+2? (All 4 Council)</button>
        </div>

        {/* Live Conversation Transcript Stream */}
        <div className="space-y-3 pt-3 border-t border-slate-800 max-h-96 overflow-y-auto pr-1">
          {chatHistory.map(msg => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-slate-950 border-slate-800 text-slate-200'
                  : 'bg-slate-950/80 border-amber-500/40 text-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-400">
                    {msg.sender === 'user' ? 'Commander Zeeco Grant' : msg.aiName}
                  </span>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                    {msg.dialect.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => handleSpeakText(msg.text, msg.aiId)}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
                  title="Replay Audio"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="font-sans whitespace-pre-line text-sm leading-relaxed">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
