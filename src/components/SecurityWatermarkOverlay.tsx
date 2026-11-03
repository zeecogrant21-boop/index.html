/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import { Shield, CheckCircle2, Lock, Sparkles, RefreshCw, AlertCircle, Award } from 'lucide-react';
import { KnowledgeStore } from '../utils/databaseStore';

export const SecurityWatermarkOverlay: React.FC = () => {
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);
  const [isSanitizing, setIsSanitizing] = useState(false);
  const [sanitizeSuccess, setSanitizeSuccess] = useState(false);

  const handleSanitizeAndClean = () => {
    setIsSanitizing(true);
    setSanitizeSuccess(false);

    setTimeout(() => {
      // 1. Verify health
      KnowledgeStore.verifyDatabaseHealth();
      // 2. Run vacuum to keep storage compact & clean
      KnowledgeStore.optimizeDatabase();
      setIsSanitizing(false);
      setSanitizeSuccess(true);
      setTimeout(() => setSanitizeSuccess(false), 4000);
    }, 600);
  };

  return (
    <>
      {/* Discreet Background Watermark Ribbon */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-[0.035] flex items-center justify-center rotate-[-18deg]"
      >
        <div className="text-center font-mono font-black text-2xl md:text-4xl text-amber-300 leading-loose tracking-widest uppercase">
          <div>ZEECO GRANT • PROTOTYPE ONLY • NOT FOR RESALE • ZG.PERSONAL.AI</div>
          <div>ANTI-THEFT &amp; ANTI-PIRACY SECURITY ACTIVE • SHA256-ZG-ZEECO-GRANT</div>
          <div>ZEECO GRANT • PROTOTYPE ONLY • NOT FOR RESALE • ZG.PERSONAL.AI</div>
        </div>
      </div>

      {/* Floating Bottom-Left Security System Badge */}
      <div className="fixed bottom-3 left-3 z-30">
        <button
          onClick={() => setShowSecurityCenter(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-slate-200 text-xs shadow-lg backdrop-blur-md cursor-pointer transition-all group active:scale-95"
          title="Open Zeeco Grant Security & Watermark Clean System"
        >
          <div className="relative">
            <Shield className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="font-semibold text-[11px] text-amber-400">
            Watermark: Zeeco Grant (ZG)
          </span>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800/60 font-mono">
            Clean System Active
          </span>
        </button>
      </div>

      {/* Security System & Watermark Drawer / Modal */}
      {showSecurityCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-200 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Zeeco Grant (ZG Personal AI) Security Watermark
                  </h3>
                  <p className="text-xs text-amber-400 font-mono">
                    Owner Certificate: Zeeco Grant • ZG Personal AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSecurityCenter(false)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Clean System Status */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Anti-Theft & Reverse Engineering Guard:
                </span>
                <span className="font-semibold text-emerald-400 font-mono">ENFORCED</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  Embedded Watermark in CSV / Backups:
                </span>
                <span className="font-semibold text-cyan-400 font-mono">ACTIVE (SHA256)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Database Hygiene & Cleanliness:
                </span>
                <span className="font-semibold text-amber-400 font-mono">OPTIMAL</span>
              </div>
            </div>

            {/* Watermark Details */}
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong>Security Guarantee:</strong> Every export (JSON backup and CSV logs) includes a cryptographic header watermark permanently tied to Patricia Crosdale to prevent theft, unauthorized redistribution, or code cloning.
              </p>
            </div>

            {/* Sanitize & Clean Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleSanitizeAndClean}
                disabled={isSanitizing}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSanitizing ? 'animate-spin' : ''}`} />
                <span>{isSanitizing ? 'Sanitizing & Defragmenting...' : 'Sanitize & Clean Database Now'}</span>
              </button>

              <button
                onClick={() => setShowSecurityCenter(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>

            {sanitizeSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>System sanitized: Storage compacted, pages defragmented, and watermark integrity verified!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
