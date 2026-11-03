/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  Coffee,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Search,
  Volume2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import {
  JAMAICA_COFFEE_ESTATES,
  COFFEE_PROCESSING_CYCLE,
  COFFEE_VARIETIES_DETAILS,
  CoffeeEstateInfo,
  CoffeeProcessStep
} from '../utils/coffeeEstateKnowledge';
import { JamaicanVoiceEngine } from '../utils/jamaicanVoiceEngine';

export const CoffeeEstateExplorer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'estates' | 'process' | 'varieties'>('estates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEstate, setSelectedEstate] = useState<CoffeeEstateInfo | null>(JAMAICA_COFFEE_ESTATES[0]);
  const [selectedProcessStep, setSelectedProcessStep] = useState<CoffeeProcessStep | null>(COFFEE_PROCESSING_CYCLE[0]);

  const handleSpeakCoffee = (text: string) => {
    JamaicanVoiceEngine.speak('copilot', text);
  };

  const filteredEstates = JAMAICA_COFFEE_ESTATES.filter(e =>
    !searchQuery.trim() ||
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.parish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.founderOrOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.varietiesCultivated.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border border-amber-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-xl shadow-amber-950/60 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Coffee className="w-7 h-7 animate-pulse text-amber-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Jamaica Blue Mountain Coffee Estates &amp; Process Codex
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-mono font-bold uppercase tracking-wider">
                  Preloaded Terroir Master
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Every historic estate, owner, elevation, botanical variety, and the complete 12-step processing cycle • Voice-enabled for <strong className="text-amber-300">Zeeco Grant</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">TERROIR CERTIFICATION:</span>
                <span className="font-bold text-white font-mono">JACRA Certified</span>
              </div>
            </div>
            <span className="w-px h-6 bg-slate-800" />
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-1 rounded font-mono font-semibold border border-emerald-800/60">
              100% ARABICA TYPICA
            </span>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button
            onClick={() => setActiveSubTab('estates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'estates'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Coffee Estates ({JAMAICA_COFFEE_ESTATES.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('process')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'process'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>12-Step Seed-to-Cup Process</span>
          </button>

          <button
            onClick={() => setActiveSubTab('varieties')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'varieties'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Botanical Varieties</span>
          </button>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coffee estates (e.g. Mavis Bank, Clifton Mount, Wallenford, Craighton, Typica, Geisha)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono transition-colors"
        />
      </div>

      {/* Tab 1: Estates Directory */}
      {activeSubTab === 'estates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-2 lg:max-h-[650px] lg:overflow-y-auto pr-1">
            {filteredEstates.map(est => {
              const isSelected = selectedEstate?.id === est.id;
              return (
                <div
                  key={est.id}
                  onClick={() => setSelectedEstate(est)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {est.parish}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {est.elevationFeet}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{est.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono block mt-1">
                    Founded: {est.foundedYear}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Estate Detail Card */}
          {selectedEstate && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50">
                    {selectedEstate.parish} • {selectedEstate.elevationFeet}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2">{selectedEstate.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Owner &amp; History: <strong className="text-amber-300">{selectedEstate.founderOrOwner}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleSpeakCoffee(`${selectedEstate.name} in ${selectedEstate.parish}. Elevation: ${selectedEstate.elevationFeet}. ${selectedEstate.historicalHighlights}`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear AI Story</span>
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Historical Terroir Overview:
                </span>
                {selectedEstate.historicalHighlights}
              </div>

              {/* Varieties & Flavor notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold block">
                    Cultivars &amp; Varieties:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedEstate.varietiesCultivated.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px] font-mono">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-purple-400 font-mono font-bold block">
                    Signature Cup Profile &amp; Tasting Notes:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedEstate.signatureFlavorNotes.map((note, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300 text-[11px] font-mono">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
                <span className="text-slate-500 block text-[10px]">Processing Facility:</span>
                <span className="text-white font-semibold">{selectedEstate.processingFacility}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: 12-Step Processing Cycle */}
      {activeSubTab === 'process' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {COFFEE_PROCESSING_CYCLE.map(step => (
              <button
                key={step.stepNumber}
                onClick={() => setSelectedProcessStep(step)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedProcessStep?.stepNumber === step.stepNumber
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] block font-mono">Step {step.stepNumber}</span>
                <span className="text-xs truncate block">{step.title}</span>
              </button>
            ))}
          </div>

          {selectedProcessStep && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Step {selectedProcessStep.stepNumber} of 12 • {selectedProcessStep.phase}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{selectedProcessStep.title}</h3>
                </div>

                <button
                  onClick={() => handleSpeakCoffee(`Step ${selectedProcessStep.stepNumber}: ${selectedProcessStep.title}. ${selectedProcessStep.description}`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to Step</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {selectedProcessStep.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Duration:</span>
                  <span className="text-amber-300 font-bold">{selectedProcessStep.duration}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Crucial Parameters:</span>
                  <span className="text-cyan-300">{selectedProcessStep.crucialParameters}</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Traditional Jamaican Heritage:</span>
                  <span className="text-emerald-300">{selectedProcessStep.traditionalMethod}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Botanical Varieties */}
      {activeSubTab === 'varieties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COFFEE_VARIETIES_DETAILS.map((v, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono">{v.variety}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {v.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans">{v.cupProfile}</p>
              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Origin: {v.origin}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
