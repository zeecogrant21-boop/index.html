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
  Sparkles,
  Calculator,
  RefreshCw,
  Download,
  Search,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Sliders
} from 'lucide-react';
import {
  SelfLearningEngine,
  NeuralSynapse,
  ComplexityLevel,
  COMPLEXITY_TIERS
} from '../utils/selfLearningEngine';

export const SelfLearningMatrixView: React.FC = () => {
  const [synapses, setSynapses] = useState<NeuralSynapse[]>(() => SelfLearningEngine.getAllSynapses());
  const [metrics, setMetrics] = useState(() => SelfLearningEngine.getMetrics());
  const [activeTierFilter, setActiveTierFilter] = useState<number | 'ALL'>('ALL');
  const [activeEntityFilter, setActiveEntityFilter] = useState<'ALL' | 'Main Brain' | 'Co-Pilot'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Test Sandbox State
  const [inputQuestion, setInputQuestion] = useState('2+2');
  const [selectedEntity, setSelectedEntity] = useState<'Main Brain (Commander)' | 'Co-Pilot (Second in Command)'>('Main Brain (Commander)');
  const [isIngesting, setIsIngesting] = useState(false);
  const [lastLearningNotice, setLastLearningNotice] = useState<{
    synapse: NeuralSynapse;
    explanation: string;
    notice: string;
  } | null>(null);

  const testProgressionPresets = [
    { label: 'Level 1: 2+2', query: '2+2' },
    { label: 'Level 1: 14 * 14', query: '14 * 14' },
    { label: 'Level 2: 15% of 4500', query: '15% of 4500' },
    { label: 'Level 2: sqrt(256) + 3^3', query: 'sqrt(256) + 3^3' },
    { label: 'Level 3: solve 5x - 15 = 35', query: 'solve 5x - 15 = 35' },
    { label: 'Level 4: solve x^2 - 9 = 0', query: 'solve 1x^2 + 0x - 9 = 0' },
    { label: 'Level 5: Jamaican GCT on JMD $85,000', query: 'Calculate Jamaican GCT on JMD $85,000 with 15% tax' }
  ];

  const handleIngest = (preset?: string) => {
    const q = (preset || inputQuestion).trim();
    if (!q) return;

    setIsIngesting(true);

    setTimeout(() => {
      const res = SelfLearningEngine.ingestQuestion(selectedEntity, q);
      setLastLearningNotice({
        synapse: res.synapse,
        explanation: res.explanation,
        notice: res.crossSyncNotice
      });

      setSynapses([...SelfLearningEngine.getAllSynapses()]);
      setMetrics(SelfLearningEngine.getMetrics());
      setIsIngesting(false);
    }, 300);
  };

  const handleReinforceOne = (syn: NeuralSynapse) => {
    const res = SelfLearningEngine.ingestQuestion(
      syn.learnedBy.includes('Main Brain') ? 'Main Brain (Commander)' : 'Co-Pilot (Second in Command)',
      syn.rawQuestion
    );
    setSynapses([...SelfLearningEngine.getAllSynapses()]);
    setMetrics(SelfLearningEngine.getMetrics());
  };

  const handleSimulateEpoch = () => {
    SelfLearningEngine.reinforceAllSynapses();
    setSynapses([...SelfLearningEngine.getAllSynapses()]);
    setMetrics(SelfLearningEngine.getMetrics());
  };

  const handleExportJSON = () => {
    const jsonStr = SelfLearningEngine.exportSynapticMatrixJSON();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ZG_Self_Learning_Matrix_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetCore = () => {
    if (confirm('Reset Self-Learning Synaptic Network to default foundational core?')) {
      SelfLearningEngine.resetToFoundational();
      setSynapses([...SelfLearningEngine.getAllSynapses()]);
      setMetrics(SelfLearningEngine.getMetrics());
      setLastLearningNotice(null);
    }
  };

  // Filter synapses
  const filteredSynapses = synapses.filter(s => {
    const matchTier = activeTierFilter === 'ALL' || s.complexityLevel === activeTierFilter;
    const matchEntity = activeEntityFilter === 'ALL'
      ? true
      : activeEntityFilter === 'Main Brain'
      ? s.learnedBy.includes('Main Brain')
      : s.learnedBy.includes('Co-Pilot');
    const matchSearch = !searchQuery.trim()
      || s.rawQuestion.toLowerCase().includes(searchQuery.toLowerCase())
      || s.problemFormat.toLowerCase().includes(searchQuery.toLowerCase())
      || String(s.solutionResult).toLowerCase().includes(searchQuery.toLowerCase());
    return matchTier && matchEntity && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Cyber Neural Matrix Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Brain className="w-7 h-7 text-amber-400 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Dual Self-Learning Neural Matrix
                </h2>
                <span className="text-[10px] bg-amber-500/15 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-mono font-bold uppercase tracking-wider">
                  Continuous Synaptic Evolution
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Autonomously learning from every question asked (Math &amp; Logic Simple ➔ Complex) • Synchronized between <strong className="text-amber-300">Main Brain</strong> &amp; <strong className="text-cyan-300">Co-Pilot</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateEpoch}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors shadow-sm"
              title="Simulate a training epoch by reinforcing all synapses"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reinforce All (+Epoch)</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors shadow-md shadow-amber-950/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Signed Matrix</span>
            </button>
          </div>
        </div>

        {/* Real-Time Neural Telemetry Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Total Synapses Learned
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              {metrics.totalIngested}
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">Continuous Growth</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              Main Brain Nodes
            </span>
            <p className="text-xl font-mono font-extrabold text-amber-400 mt-1">
              {metrics.mainBrainSynapses}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Commander Core</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              Co-Pilot Reflexes
            </span>
            <p className="text-xl font-mono font-extrabold text-cyan-400 mt-1">
              {metrics.coPilotSynapses}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">2nd in Command</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-purple-400" />
              Math Formats Solved
            </span>
            <p className="text-xl font-mono font-extrabold text-purple-400 mt-1">
              {metrics.totalMathProblemsSolved}
            </p>
            <span className="text-[10px] text-slate-500 font-mono">2+2 to Quadratic</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Avg Neural Confidence
            </span>
            <p className="text-xl font-mono font-extrabold text-emerald-400 mt-1">
              {metrics.averageConfidence}%
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Weight: {metrics.averageWeight}</span>
          </div>
        </div>
      </div>

      {/* Interactive Self-Learning Sandbox (Test any math or general question) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Live Self-Learning Ingestion Sandbox
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Ingest via:</span>
            <button
              onClick={() => setSelectedEntity('Main Brain (Commander)')}
              className={`px-3 py-1 rounded-lg font-mono text-xs cursor-pointer transition-colors ${
                selectedEntity.includes('Main Brain')
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              Main Brain
            </button>
            <button
              onClick={() => setSelectedEntity('Co-Pilot (Second in Command)')}
              className={`px-3 py-1 rounded-lg font-mono text-xs cursor-pointer transition-colors ${
                selectedEntity.includes('Co-Pilot')
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              Co-Pilot
            </button>
          </div>
        </div>

        {/* Input & Ingest Trigger */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">
            Submit a Mathematical or Logic Question (Progression from 2+2 to Complex):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleIngest()}
              placeholder="e.g. '2+2', '15% of 3500', 'solve 3x + 9 = 30', or 'sqrt(144) + 10'"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={() => handleIngest()}
              disabled={isIngesting || !inputQuestion.trim()}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Zap className={`w-4 h-4 ${isIngesting ? 'animate-spin' : ''}`} />
              <span>{isIngesting ? 'Ingesting...' : 'Ingest & Learn'}</span>
            </button>
          </div>
        </div>

        {/* Test Progression Presets: Simple to Complex */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-slate-500 whitespace-nowrap">Simple ➔ Complex Presets:</span>
          {testProgressionPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuestion(preset.query);
                handleIngest(preset.query);
              }}
              className="text-[11px] bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors font-mono"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Live Learning Feedback Box */}
        {lastLearningNotice && (
          <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-amber-300">
                  {lastLearningNotice.synapse.complexityLabel} Synapse Active
                </span>
              </div>
              <span className="text-[10px] bg-slate-900 text-cyan-300 px-2 py-0.5 rounded font-mono border border-slate-800">
                Format: {lastLearningNotice.synapse.problemFormat}
              </span>
            </div>

            <div className="text-xs text-white leading-relaxed font-mono">
              <span className="text-slate-400">Solution: </span>
              <strong className="text-emerald-400 text-sm">{lastLearningNotice.synapse.solutionResult}</strong>
            </div>

            <p className="text-xs text-slate-300">{lastLearningNotice.explanation}</p>

            {lastLearningNotice.synapse.stepBreakdown.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-slate-800/80 font-mono text-[11px]">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Step-by-Step Mathematical Derivation:
                </span>
                {lastLearningNotice.synapse.stepBreakdown.map((st, i) => (
                  <div key={i} className="text-slate-300">
                    {i + 1}. {st}
                  </div>
                ))}
              </div>
            )}

            <div className="p-2.5 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-200 font-mono">
              {lastLearningNotice.notice}
            </div>
          </div>
        )}
      </div>

      {/* Synaptic Memory Matrix Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Learned Synaptic Network ({filteredSynapses.length} Nodes)
            </h3>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search learned formulas..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Complexity Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Complexity Filter:</span>
          <button
            onClick={() => setActiveTierFilter('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeTierFilter === 'ALL'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Tiers ({synapses.length})
          </button>
          {([1, 2, 3, 4, 5] as ComplexityLevel[]).map(lvl => {
            const info = COMPLEXITY_TIERS[lvl];
            const count = synapses.filter(s => s.complexityLevel === lvl).length;
            const isSelected = activeTierFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setActiveTierFilter(lvl)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors border ${
                  isSelected
                    ? `${info.badgeColor} font-bold ring-1 ring-amber-400`
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {info.label.split(':')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Entity Filter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Learned By:</span>
          {(['ALL', 'Main Brain', 'Co-Pilot'] as const).map(entity => (
            <button
              key={entity}
              onClick={() => setActiveEntityFilter(entity)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                activeEntityFilter === entity
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-900'
              }`}
            >
              {entity === 'ALL' ? 'All Entities' : entity}
            </button>
          ))}
        </div>

        {/* Synapse Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSynapses.map(syn => (
            <div
              key={syn.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3 relative group"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${COMPLEXITY_TIERS[syn.complexityLevel].badgeColor}`}>
                    {syn.complexityLabel}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5 font-mono">
                    "{syn.rawQuestion}"
                  </h4>
                </div>
                <button
                  onClick={() => handleReinforceOne(syn)}
                  className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded-lg border border-slate-800 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1"
                  title="Reinforce this specific synapse"
                >
                  <RefreshCw className="w-2.5 h-2.5 text-amber-400" />
                  <span>Reinforce ({syn.reinforcementCount})</span>
                </button>
              </div>

              {/* Solution Result */}
              <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 text-[11px] block">Computed Solution:</span>
                <span className="text-emerald-400 font-bold text-sm">{syn.solutionResult}</span>
              </div>

              {/* Format & Template */}
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div>
                  <span className="text-slate-500">Pattern: </span>
                  <span className="text-amber-300">{syn.problemFormat}</span>
                </div>
                <div>
                  <span className="text-slate-500">Template: </span>
                  <span className="text-cyan-300">{syn.formatTemplate}</span>
                </div>
              </div>

              {/* Step breakdown */}
              {syn.stepBreakdown.length > 0 && (
                <div className="space-y-0.5 text-[10px] text-slate-400 font-mono border-t border-slate-900 pt-2">
                  {syn.stepBreakdown.slice(0, 3).map((st, i) => (
                    <div key={i} className="truncate">
                      • {st}
                    </div>
                  ))}
                  {syn.stepBreakdown.length > 3 && (
                    <span className="text-slate-500 italic">+ {syn.stepBreakdown.length - 3} more steps</span>
                  )}
                </div>
              )}

              {/* Footer info */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                <span>By: {syn.learnedBy}</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">Weight: {syn.synapticWeight}</span>
                  <span className="text-amber-400">Conf: {syn.confidenceScore}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSynapses.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono text-xs">
            No synapses match the selected filter. Ingest a new question above to expand the network!
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            Sovereign Neural Storage • Encrypted &amp; Watermarked for Zeeco Grant
          </span>
          <button
            onClick={handleResetCore}
            className="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer transition-colors font-mono"
          >
            Reset to Foundational Core
          </button>
        </div>
      </div>
    </div>
  );
};
