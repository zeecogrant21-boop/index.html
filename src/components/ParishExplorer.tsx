/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, Info, CheckCircle2, Building, LandPlot } from 'lucide-react';
import { JAMAICA_PARISHES } from '../utils/jamaicaPacks';
import { ParishInfo } from '../types/database';

export const ParishExplorer: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState<'All' | 'Cornwall' | 'Middlesex' | 'Surrey'>('All');
  const [selectedParish, setSelectedParish] = useState<ParishInfo>(JAMAICA_PARISHES[0]);

  const filtered = selectedCounty === 'All'
    ? JAMAICA_PARISHES
    : JAMAICA_PARISHES.filter(p => p.county === selectedCounty);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              The 14 Parishes &amp; Historic Counties of Jamaica
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive geography, capitals, historical uprisings, ecological heritage, and attractions
            </p>
          </div>
        </div>

        {/* County Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['All', 'Cornwall', 'Middlesex', 'Surrey'] as const).map(county => (
            <button
              key={county}
              onClick={() => setSelectedCounty(county)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCounty === county
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {county} {county !== 'All' ? `(${county === 'Surrey' ? 4 : 5})` : '(14)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parishes List */}
        <div className="space-y-2 lg:max-h-[580px] overflow-y-auto pr-1">
          {filtered.map(parish => {
            const isSelected = selectedParish.name === parish.name;
            const countyColor =
              parish.county === 'Cornwall'
                ? 'text-amber-400 bg-amber-950/60 border-amber-800/50'
                : parish.county === 'Middlesex'
                ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50'
                : 'text-purple-400 bg-purple-950/60 border-purple-800/50';

            return (
              <button
                key={parish.name}
                onClick={() => setSelectedParish(parish)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/50 border-emerald-400/80 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{parish.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase ${countyColor}`}>
                    {parish.county}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3 text-amber-400" />
                    Capital: <strong className="text-slate-200">{parish.capital}</strong>
                  </span>
                  <span>•</span>
                  <span>{parish.areaSqKm} km²</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Parish Detail Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-bold">
                  County of {selectedParish.county}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedParish.areaSqKm} km² • Approx. Pop: {selectedParish.populationApprox}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                Parish of {selectedParish.name}
              </h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                Capital Town: {selectedParish.capital}
              </p>
            </div>
          </div>

          {/* Famous For */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Famous For &amp; Cultural Identity
            </h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              {selectedParish.famousFor}
            </p>
          </div>

          {/* Historical Significance */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Historical Milestones &amp; Origins
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
              {selectedParish.history}
            </p>
          </div>

          {/* Attractions */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Notable Attractions &amp; Heritage Sites
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedParish.notableAttractions.map((att, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{att}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
