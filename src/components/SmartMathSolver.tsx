/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import {
  Calculator,
  Equal,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Percent,
  TrendingUp,
  Hash,
  Copy,
  CheckCircle2,
  HelpCircle,
  Coins
} from 'lucide-react';
import { SmartMathEngine, MathSolution } from '../utils/mathSolver';

export const SmartMathSolver: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arithmetic' | 'algebra' | 'gct' | 'stats'>('arithmetic');

  // Arithmetic State
  const [arithInput, setArithInput] = useState('sqrt(144) + 3^3 - 15% of 200');
  const [arithResult, setArithResult] = useState<{ value: number; steps: string[] } | null>(null);
  const [arithError, setArithError] = useState<string | null>(null);

  // Algebra State
  const [linearInput, setLinearInput] = useState('2x + 14 = 38');
  const [linearResult, setLinearResult] = useState<{ x: number; steps: string[] } | null>(null);
  const [linearError, setLinearError] = useState<string | null>(null);

  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(-5);
  const [quadC, setQuadC] = useState(6);
  const [quadResult, setQuadResult] = useState<ReturnType<typeof SmartMathEngine.solveQuadratic> | null>(null);

  // GCT State
  const [gctBase, setGctBase] = useState(15000);
  const [gctRate, setGctRate] = useState(0.15); // Standard 15%
  const [gctResult, setGctResult] = useState<ReturnType<typeof SmartMathEngine.calculateGCT> | null>(null);

  // Statistics State
  const [statsInput, setStatsInput] = useState('45, 62, 78, 85, 92, 62, 54, 88, 95');
  const [statsResult, setStatsResult] = useState<ReturnType<typeof SmartMathEngine.calculateStatistics> | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Solve Arithmetic
  const handleSolveArith = () => {
    try {
      setArithError(null);
      const res = SmartMathEngine.evaluateArithmetic(arithInput);
      setArithResult(res);
    } catch (err: any) {
      setArithError(err.message || 'Calculation error');
      setArithResult(null);
    }
  };

  // Solve Linear
  const handleSolveLinear = () => {
    try {
      setLinearError(null);
      const res = SmartMathEngine.solveLinear(linearInput);
      setLinearResult(res);
    } catch (err: any) {
      setLinearError(err.message || 'Algebra syntax error');
      setLinearResult(null);
    }
  };

  // Solve Quadratic
  const handleSolveQuad = () => {
    try {
      const res = SmartMathEngine.solveQuadratic(quadA, quadB, quadC);
      setQuadResult(res);
    } catch (err: any) {
      // ignore
    }
  };

  // Calculate GCT
  const handleCalculateGCT = () => {
    const res = SmartMathEngine.calculateGCT(gctBase, gctRate);
    setGctResult(res);
  };

  // Calculate Stats
  const handleCalculateStats = () => {
    const nums = statsInput
      .split(',')
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n));
    if (nums.length > 0) {
      const res = SmartMathEngine.calculateStatistics(nums);
      setStatsResult(res);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Smart Mathematical Calculation &amp; Solving Software
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Step-by-step arithmetic, linear/quadratic equations, Jamaican GCT taxation, and statistical datasets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {(['arithmetic', 'algebra', 'gct', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'gct' ? 'Jamaican GCT' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Arithmetic & Expression Evaluator */}
      {activeTab === 'arithmetic' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Mathematical Expression (Supports sqrt, powers ^, functions &amp; percentages):</span>
              <span className="text-[11px] text-slate-500 font-mono">e.g. sqrt(256) + 5^3 - 15% of 1000</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={arithInput}
                onChange={(e) => setArithInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolveArith()}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSolveArith}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Solve
              </button>
            </div>
          </div>

          {arithError && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300">
              {arithError}
            </div>
          )}

          {arithResult && (
            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Final Answer:</span>
                <button
                  onClick={() => copyToClipboard(arithResult.value.toString(), 'arith')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === 'arith' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 'arith' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-2xl font-mono font-bold text-indigo-300">
                {arithResult.value.toLocaleString()}
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Step-by-Step Breakdown:</span>
                {arithResult.steps.map((st, i) => (
                  <p key={i} className="text-xs text-slate-300 font-mono">
                    {i + 1}. {st}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Algebra (Linear & Quadratic) */}
      {activeTab === 'algebra' && (
        <div className="space-y-6">
          {/* Linear Solver */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Hash className="w-3.5 h-3.5 text-indigo-400" />
              Linear Equation Solver (ax + b = c)
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={linearInput}
                onChange={(e) => setLinearInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSolveLinear()}
                placeholder="e.g. 3x + 12 = 48"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSolveLinear}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
              >
                Find x
              </button>
            </div>

            {linearResult && (
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-emerald-400 font-mono text-sm">Solution: x = {linearResult.x}</p>
                {linearResult.steps.map((st, i) => (
                  <p key={i} className="text-[11px] text-slate-400 font-mono">{st}</p>
                ))}
              </div>
            )}
          </div>

          {/* Quadratic Solver */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Equal className="w-3.5 h-3.5 text-amber-400" />
              Quadratic Equation Solver (ax² + bx + c = 0)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Coefficient a:</label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Coefficient b:</label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Coefficient c:</label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white"
                />
              </div>
            </div>

            <button
              onClick={handleSolveQuad}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Solve Quadratic Formula
            </button>

            {quadResult && (
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                <p className="font-bold text-amber-400">
                  {quadResult.roots.length === 2
                    ? `Two Real Roots: x₁ = ${quadResult.roots[0]}, x₂ = ${quadResult.roots[1]}`
                    : quadResult.roots.length === 1
                    ? `Single Real Root: x = ${quadResult.roots[0]}`
                    : 'No Real Roots (Discriminant Δ < 0)'}
                </p>
                {quadResult.steps.map((st, i) => (
                  <p key={i} className="text-[11px] text-slate-400">{st}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Jamaican GCT (15%) Calculator */}
      {activeTab === 'gct' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Jamaican General Consumption Tax (GCT) Calculator
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400">Subtotal Amount (JMD $):</label>
                <input
                  type="number"
                  value={gctBase}
                  onChange={(e) => setGctBase(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-white mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">GCT Rate:</label>
                <select
                  value={gctRate}
                  onChange={(e) => setGctRate(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white mt-1"
                >
                  <option value={0.15}>Standard Commercial GCT (15.0%)</option>
                  <option value={0.10}>Tourism / Hotel Sector GCT (10.0%)</option>
                  <option value={0.25}>Telecommunications GCT (25.0%)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculateGCT}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Calculate Tax Breakdown
            </button>

            {gctResult && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Subtotal</span>
                    <p className="text-xs font-bold font-mono text-slate-200 mt-0.5">
                      JMD ${gctResult.subtotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-amber-400">GCT Tax</span>
                    <p className="text-xs font-bold font-mono text-amber-400 mt-0.5">
                      JMD ${gctResult.gctAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/30">
                    <span className="text-[10px] text-emerald-400">Grand Total</span>
                    <p className="text-xs font-bold font-mono text-emerald-400 mt-0.5">
                      JMD ${gctResult.grandTotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Statistical Analytics */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              Statistical Data Analyzer (Mean, Median, Variance, StdDev)
            </h3>
            <label className="text-xs text-slate-400">
              Enter numbers separated by commas:
            </label>
            <input
              type="text"
              value={statsInput}
              onChange={(e) => setStatsInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-white"
            />
            <button
              onClick={handleCalculateStats}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs cursor-pointer"
            >
              Analyze Dataset
            </button>

            {statsResult && (
              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400">Mean (Average)</span>
                  <p className="text-sm font-bold font-mono text-cyan-400 mt-0.5">{statsResult.mean}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400">Median</span>
                  <p className="text-sm font-bold font-mono text-indigo-400 mt-0.5">{statsResult.median}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400">Standard Dev (σ)</span>
                  <p className="text-sm font-bold font-mono text-amber-400 mt-0.5">{statsResult.stdDev}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400">Variance (σ²)</span>
                  <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{statsResult.variance}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
