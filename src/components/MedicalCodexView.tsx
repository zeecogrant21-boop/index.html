/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  Bandage,
  Pill,
  AlertTriangle,
  Search,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import {
  ENCYCLOPEDIC_DISEASES_DB,
  WOUND_AND_CUTS_PROTOCOLS,
  ESSENTIAL_MEDICATIONS_DB,
  DiseaseInfo,
  MedicationGuideItem,
  WoundAndCutsTreatment
} from '../utils/medicalKnowledgeData';
import { JamaicanVoiceEngine, AIPersonaId } from '../utils/jamaicanVoiceEngine';

export const MedicalCodexView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diseases' | 'wounds' | 'medications'>('diseases');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(ENCYCLOPEDIC_DISEASES_DB[0]);
  const [selectedWound, setSelectedWound] = useState<WoundAndCutsTreatment | null>(WOUND_AND_CUTS_PROTOCOLS[0]);
  const [selectedMed, setSelectedMed] = useState<MedicationGuideItem | null>(ESSENTIAL_MEDICATIONS_DB[0]);
  const [spokenNotification, setSpokenNotification] = useState<string | null>(null);

  const handleSpeakMedicalInfo = (text: string, persona: AIPersonaId = 'factfinder') => {
    JamaicanVoiceEngine.speak(persona, text, () => {
      setSpokenNotification(`Speaking via AI: "${text.slice(0, 60)}..."`);
    }, () => {
      setSpokenNotification(null);
    });
  };

  // Filter lists
  const filteredDiseases = ENCYCLOPEDIC_DISEASES_DB.filter(d =>
    !searchQuery.trim() ||
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    d.primaryMedications.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredWounds = WOUND_AND_CUTS_PROTOCOLS.filter(w =>
    !searchQuery.trim() ||
    w.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.cleansingAndDisinfection.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.medicationsAndOintments.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMeds = ESSENTIAL_MEDICATIONS_DB.filter(m =>
    !searchQuery.trim() ||
    m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.drugClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.brandNames.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.primaryIndications.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Medical Codex Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-amber-500 to-rose-600 p-0.5 shadow-xl shadow-rose-950/60 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-rose-400">
                <HeartPulse className="w-7 h-7 animate-pulse text-rose-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Medical, Diseases, Cuts Treatment &amp; Medications Codex
                </h2>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40 font-mono font-bold uppercase tracking-wider">
                  Permanent Clinical Repository
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Exhaustive preloaded protocols for illnesses, wounds, burns, first aid, and essential pharmacology • Voice-enabled for <strong className="text-amber-300">Zeeco Grant</strong>
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-rose-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">PRELOADED PROTOCOLS:</span>
                <span className="font-bold text-white font-mono">100% Immutable Core</span>
              </div>
            </div>
            <span className="w-px h-6 bg-slate-800" />
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-1 rounded font-mono font-semibold border border-emerald-800/60">
              CLINICAL CERTAINTY
            </span>
          </div>
        </div>

        {/* Navigation Tabs Bar inside Medical Codex */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <button
            onClick={() => setActiveTab('diseases')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'diseases'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Diseases &amp; Sicknesses ({ENCYCLOPEDIC_DISEASES_DB.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wounds')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'wounds'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Bandage className="w-3.5 h-3.5" />
            <span>Cuts, Burns &amp; Wound Treatment</span>
          </button>

          <button
            onClick={() => setActiveTab('medications')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'medications'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Medications &amp; Pharmacology ({ESSENTIAL_MEDICATIONS_DB.length})</span>
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
          placeholder="Search diseases, cuts treatment, burns, asthma, dengue, or medications like Metformin, Lisinopril..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 font-mono transition-colors"
        />
      </div>

      {/* Tab 1: Diseases & Illnesses */}
      {activeTab === 'diseases' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-2 lg:max-h-[650px] lg:overflow-y-auto pr-1">
            {filteredDiseases.map(d => {
              const isSelected = selectedDisease?.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDisease(d)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50">
                      {d.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      d.severity.includes('Critical') ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {d.severity.split('/')[0]}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{d.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{d.description}</p>
                </div>
              );
            })}
          </div>

          {/* Disease Detail Pane */}
          {selectedDisease && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60">
                    {selectedDisease.category} • {selectedDisease.severity}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-2">{selectedDisease.name}</h3>
                </div>

                <button
                  onClick={() => handleSpeakMedicalInfo(`${selectedDisease.name}. ${selectedDisease.description}. Standard treatment: ${selectedDisease.standardTreatment}`, 'brain')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear AI Briefing</span>
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">
                  Clinical Overview:
                </span>
                {selectedDisease.description}
              </div>

              {/* Symptoms Checklist */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  Key Clinical Symptoms &amp; Signs:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDisease.symptoms.map((s, i) => (
                    <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Treatment & Primary Medications */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                    Standard Clinical Treatment:
                  </span>
                  {selectedDisease.standardTreatment}
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-cyan-400" />
                    First-Line Pharmaceuticals &amp; Medications:
                  </span>
                  <div className="space-y-1.5">
                    {selectedDisease.primaryMedications.map((med, i) => (
                      <div key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200 font-mono">
                        • {med}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency First Aid Steps if present */}
              {selectedDisease.firstAidOrEmergencySteps && (
                <div className="p-3 bg-rose-950/20 border border-rose-500/40 rounded-xl space-y-1.5">
                  <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Immediate Emergency First Aid Steps:
                  </span>
                  {selectedDisease.firstAidOrEmergencySteps.map((step, i) => (
                    <p key={i} className="text-xs text-slate-200 font-mono leading-relaxed">
                      {i + 1}. {step}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wounds, Cuts & Burns Treatment */}
      {activeTab === 'wounds' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {WOUND_AND_CUTS_PROTOCOLS.map((w, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedWound(w)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedWound?.type === w.type
                    ? 'bg-slate-900 border-amber-500 shadow-md ring-1 ring-amber-500'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Bandage className="w-4 h-4" />
                  <span>{w.type}</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">{w.severityGrade}</span>
              </button>
            ))}
          </div>

          {selectedWound && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bandage className="w-5 h-5 text-amber-400" />
                    {selectedWound.type} Protocol
                  </h3>
                  <span className="text-xs text-slate-400">{selectedWound.severityGrade}</span>
                </div>

                <button
                  onClick={() => handleSpeakMedicalInfo(`${selectedWound.type}. Immediate Action: ${selectedWound.immediateAction.join('. ')}`, 'sentinel')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen in Jamaican Dialect</span>
                </button>
              </div>

              {/* Immediate Step-by-Step Action */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  1. Immediate Emergency Actions:
                </span>
                <div className="space-y-2">
                  {selectedWound.immediateAction.map((act, i) => (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                      <strong className="text-amber-400 font-mono">Step {i + 1}: </strong>
                      {act}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cleansing and Dressings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    2. Cleansing &amp; Disinfection:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedWound.cleansingAndDisinfection}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                    3. Dressings, Closures &amp; Steri-Strips:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{selectedWound.dressingsAndClosure}</p>
                </div>
              </div>

              {/* Infection signs & when to seek emergency care */}
              <div className="p-4 bg-rose-950/20 border border-rose-500/40 rounded-xl space-y-2 text-xs">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  When to Seek Immediate Emergency Hospital Care:
                </span>
                <p className="text-rose-200 font-semibold">{selectedWound.whenToSeekEmergencyCare}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Medications & Pharmacology Guide */}
      {activeTab === 'medications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-2 lg:max-h-[650px] lg:overflow-y-auto pr-1">
            {filteredMeds.map(m => {
              const isSelected = selectedMed?.genericName === m.genericName;
              return (
                <div
                  key={m.genericName}
                  onClick={() => setSelectedMed(m)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                    {m.drugClass}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">{m.genericName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Brands: {m.brandNames.join(', ')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Medication Detail Pane */}
          {selectedMed && (
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                    {selectedMed.drugClass}
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-2">{selectedMed.genericName}</h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Brands: {selectedMed.brandNames.join(', ')}
                  </span>
                </div>

                <button
                  onClick={() => handleSpeakMedicalInfo(`${selectedMed.genericName}. Indications: ${selectedMed.primaryIndications.join(', ')}. Warnings: ${selectedMed.warningsAndNotes}`, 'copilot')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-md"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen in Jamaican Patois</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Standard Dosing Range:</span>
                  <span className="text-cyan-300 font-bold">{selectedMed.commonDosingRange}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Mechanism of Action:</span>
                  <span className="text-slate-200">{selectedMed.mechanismOfAction}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Primary Clinical Indications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMed.primaryIndications.map((ind, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300 font-mono text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-rose-950/20 border border-rose-500/40 rounded-xl text-xs space-y-1">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  Critical Contraindications &amp; Warnings:
                </span>
                <p className="text-rose-200 font-medium leading-relaxed">{selectedMed.warningsAndNotes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
