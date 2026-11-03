/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2, X } from 'lucide-react';

export const LegalNoticeBanner: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Top Banner Notice */}
      <aside aria-label="Legal and prototype protection notice" className="bg-slate-950 text-slate-300 border-b border-amber-500/30 px-3 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-amber-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              CONFIDENTIAL PROTOTYPE:
            </span>
            <span className="text-slate-200 font-medium">Licensed Exclusively to Zeeco Grant (ZG Personal AI)</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-rose-400 font-semibold uppercase tracking-wider text-[10px] bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40">
              Personal Use Only • Not For Resale
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
              SIG: <span className="text-amber-300">SHA256-ZG-ZEECO-GRANT-VERIFIED</span>
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer flex items-center gap-1 text-[11px]"
              title="View full legal terms, anti-piracy covenants, and copyright protection notice"
            >
              <FileText className="w-3 h-3" />
              Legal Terms & Deed
            </button>
          </div>
        </div>
      </aside>

      {/* Comprehensive Legal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-5 border-b border-slate-800 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">
                    Proprietary Software Legal Terms & Deed
                  </h2>
                  <p className="text-xs text-amber-400 font-mono">
                    Registered to Licensee: Zeeco Grant (ZG Personal AI)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3.5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-300 uppercase tracking-wide text-[11px]">
                    Strict Prohibition: Personal Use Prototype Only - Not For Resale
                  </p>
                  <p className="text-slate-300 mt-0.5">
                    This software system, knowledge engine, mathematical solver, and database management architecture are proprietary confidential works developed exclusively for the personal use of Zeeco Grant (ZG Personal AI). Commercial redistribution, subleasing, or resale is strictly forbidden.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  1. Anti-Theft & Reverse Engineering Proscription
                </h3>
                <p>
                  Any attempt to decompile, disassemble, reverse engineer, intercept network communications, decrypt proprietary logic, or clone this software codebase or its Jamaican knowledge packs constitutes willful intellectual property infringement punishable under civil and criminal statutes internationally.
                </p>

                <h3 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  2. Anti-Piracy & Cryptographic Signature Seal
                </h3>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
                  <div><span className="text-slate-500">OWNER/LICENSEE:</span> <span className="text-emerald-400 font-semibold">ZEECO GRANT (ZG PERSONAL AI)</span></div>
                  <div><span className="text-slate-500">DIGITAL CERTIFICATE:</span> <span className="text-amber-300">ZG-PERSONAL-AI-ZEECO-GRANT-VERIFIED</span></div>
                  <div><span className="text-slate-500">FINGERPRINT HASH:</span> <span className="text-cyan-400">c9e2b10a8873f44192bce81109aef882190</span></div>
                  <div><span className="text-slate-500">LEGAL STATUS:</span> <span className="text-purple-400 font-semibold">CONFIDENTIAL PROTOTYPE COPYRIGHT PROTECTED</span></div>
                </div>

                <h3 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  3. Privacy & Zero-Telemetry Guarantee
                </h3>
                <p>
                  All queries, mathematical operations, search logs, and database defragmentation files reside locally in private sandboxed storage. No biometric, confidential, or private search telemetry is transmitted or monetized without explicit cryptographic consent.
                </p>

                <h3 className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  4. Disclaimer of Warranty ("As-Is" Prototype)
                </h3>
                <p className="text-slate-400">
                  This software is delivered strictly "AS IS", without warranties of any kind, either express or implied, including without limitation warranties of merchantability, fitness for a particular purpose, or non-infringement. In no event shall the author or licensee be liable for any incidental or consequential damages.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Signed & Cryptographically Verified
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Acknowledge Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
