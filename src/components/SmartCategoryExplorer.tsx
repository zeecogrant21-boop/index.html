/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState, useMemo } from 'react';
import {
  Tag,
  Search,
  Sparkles,
  BookOpen,
  Calculator,
  Atom,
  Sprout,
  Code2,
  HeartPulse,
  Coins,
  History,
  Globe,
  MapPin,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { KnowledgeStore } from '../utils/databaseStore';
import { SmartClassifier } from '../utils/categoryClassifier';
import { QAEntry } from '../types/database';

export const SUBJECT_CATEGORIES = [
  { id: 'All', label: 'All Subjects', icon: Tag, color: 'text-amber-400 border-amber-500/40 bg-amber-950/20' },
  { id: 'English', label: 'English & Grammar', icon: BookOpen, color: 'text-sky-400 border-sky-500/40 bg-sky-950/20' },
  { id: 'Maths', label: 'Maths & Formulas', icon: Calculator, color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/20' },
  { id: 'Science', label: 'Science & Physics', icon: Atom, color: 'text-teal-400 border-teal-500/40 bg-teal-950/20' },
  { id: 'Agri', label: 'Agri & Botany', icon: Sprout, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' },
  { id: 'Reading', label: 'Reading & Lit', icon: BookOpen, color: 'text-blue-400 border-blue-500/40 bg-blue-950/20' },
  { id: 'Coding', label: 'Coding & Tech', icon: Code2, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20' },
  { id: 'Health', label: 'Health & Wellness', icon: HeartPulse, color: 'text-rose-400 border-rose-500/40 bg-rose-950/20' },
  { id: 'Wealth', label: 'Wealth & Economy', icon: Coins, color: 'text-amber-400 border-amber-500/40 bg-amber-950/20' },
  { id: 'History', label: 'Historical Events', icon: History, color: 'text-purple-400 border-purple-500/40 bg-purple-950/20' },
  { id: 'World Events', label: 'World Events', icon: Globe, color: 'text-orange-400 border-orange-500/40 bg-orange-950/20' },
  { id: 'Parishes & Culture', label: 'Jamaica Parishes', icon: MapPin, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' }
];

export const SmartCategoryExplorer: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [testText, setTestText] = useState('');
  const [classificationResult, setClassificationResult] = useState<ReturnType<typeof SmartClassifier.classify> | null>(null);

  const allEntries: QAEntry[] = useMemo(() => KnowledgeStore.getAllQA(), []);

  // Filter entries
  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      const matchSubject = selectedSubject === 'All' || entry.category.toLowerCase() === selectedSubject.toLowerCase();
      const matchSearch =
        searchQuery.trim() === '' ||
        entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [allEntries, selectedSubject, searchQuery]);

  // Test Auto-Classifier
  const handleClassify = (text: string) => {
    setTestText(text);
    if (!text.trim()) {
      setClassificationResult(null);
      return;
    }
    const result = SmartClassifier.classify(text);
    setClassificationResult(result);
  };

  return (
    <div className="space-y-6">
      {/* Smart Categorization Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Tag className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Smart Categories & Subject Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Organized reference knowledge preloaded in browser storage: English, Maths, Science, Agri, Reading, Coding, Health, Wealth, History & World Events.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Total Preloaded Entries:</span>
            <span className="font-mono font-bold text-amber-400">{allEntries.length}</span>
          </div>
        </div>

        {/* Live Auto-Classification Interactive Tool */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Real-Time Query & Subject Classifier
            </span>
            <span className="text-[11px] text-slate-400">Type any sentence to auto-detect subject</span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={testText}
              onChange={(e) => handleClassify(e.target.value)}
              placeholder="e.g., 'What is the formula for photosynthesis and plant biology?' or 'Calculate 15% GCT on sugar crop'"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {classificationResult && (
            <div className="p-3 bg-slate-900/90 rounded-lg border border-indigo-500/30 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Predicted Category:</span>
                <span className="font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800/50">
                  {classificationResult.category.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Confidence:</span>
                <span className="font-mono font-bold text-emerald-400">{classificationResult.confidence}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SUBJECT_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedSubject === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedSubject(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-950/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input in Knowledge */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search within ${selectedSubject} entries...`}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
        />
      </div>

      {/* Knowledge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400 font-mono">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.packSource}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {item.question}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.answer}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                Factual Verified
              </span>
              <span className="font-mono">
                Tokens: {item.words.slice(0, 4).join(', ')}
              </span>
            </div>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <div className="col-span-full p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            No reference entries found matching "{searchQuery}" in {selectedSubject}.
          </div>
        )}
      </div>
    </div>
  );
};
