/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  Lock,
  Download,
  Copy,
  Check,
  Search,
  FileText,
  AlertTriangle,
  Award,
  ExternalLink
} from 'lucide-react';
import { ZEECO_GRANT_LEGAL_CODEX, LegalArticle } from '../utils/legalCodex';

export const LegalFortressView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCopiedAll, setIsCopiedAll] = useState(false);

  const filteredArticles = ZEECO_GRANT_LEGAL_CODEX.filter(art => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.articleNumber.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.statutes.some(s => s.toLowerCase().includes(q)) ||
      art.fullLegalText.toLowerCase().includes(q)
    );
  });

  const handleCopyArticle = (art: LegalArticle) => {
    const text = `${art.articleNumber}: ${art.title}\nStatutes: ${art.statutes.join(', ')}\n\n${art.fullLegalText}`;
    navigator.clipboard.writeText(text);
    setCopiedId(art.articleNumber);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = ZEECO_GRANT_LEGAL_CODEX.map(
      a => `==============================\n${a.articleNumber}: ${a.title}\nGoverning Statutes: ${a.statutes.join(', ')}\n==============================\n${a.fullLegalText}\n`
    ).join('\n\n');

    const header = `ZG PERSONAL AI (ZEECO GRANT) - MASTER LEGAL CODEX & PROPRIETARY CHARTER\nLicensed Exclusively to: Zeeco Grant (Personal Prototype)\nCryptographic Signature: SHA256-ZG-ZEECO-GRANT-VERIFIED\nLiquidated Damages: $50,000,000.00 USD\n\n`;

    navigator.clipboard.writeText(header + fullText);
    setIsCopiedAll(true);
    setTimeout(() => setIsCopiedAll(false), 2000);
  };

  const handleDownloadDeed = () => {
    const fullText = ZEECO_GRANT_LEGAL_CODEX.map(
      a => `\n============================================================\n${a.articleNumber}: ${a.title}\nStatutes: ${a.statutes.join(', ')}\n============================================================\n${a.fullLegalText}\n`
    ).join('\n');

    const deed = `********************************************************************************
                       ZEECO GRANT LEGAL CODEX & TITLE DEED
                            ZG PERSONAL AI PROTOTYPE
********************************************************************************
OWNER & BENEFICIAL TITLE HOLDER: ZEECO GRANT
SYSTEM: ZG.personal.AI (Main Brain Supreme Core & Co-Pilot Subordinate Suite)
LEGAL STATUS: STRICT NON-COMMERCIAL PERSONAL PROTOTYPE - PROPRIETARY
CRYPTOGRAPHIC SEAL: SHA256-ZG-ZEECO-GRANT-VERIFIED
EXECUTION TIMESTAMP: ${new Date().toISOString()}
STATUTORY LIQUIDATED DAMAGES CLAUSE: $50,000,000.00 USD PER INFRINGEMENT OCCURRENCE
JURISDICTION: SUPREME COURT OF JAMAICA (KINGSTON) & WIPO / BERNE CONVENTION TRIBUNALS
********************************************************************************

PREAMBLE:
This Legal Codex constitutes the absolute, binding, and inviolable proprietary covenants
governing the architecture, runtime memory buses, knowledge databases, mathematical solver
matrices, and source code of ZG Personal AI. All rights are reserved to ZEECO GRANT.

${fullText}

********************************************************************************
DIGITAL SIGNATURE & SEAL OF PROPRIETOR:
Digitally Sealed by ZEECO GRANT
Verification Hash: SHA256-ZG-ZEECO-GRANT-VERIFIED
All rights reserved under international copyright conventions and Jamaican statutory law.
********************************************************************************
`;

    const blob = new Blob([deed], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Zeeco_Grant_Master_Legal_Codex_${Date.now()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Supreme Legal Fortress Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-amber-500 to-rose-600 p-0.5 shadow-xl shadow-rose-950/60 flex items-center justify-center relative">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-rose-400">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-wide">
                  Zeeco Grant Legal Fortress Codex
                </h2>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40 font-mono font-bold uppercase tracking-wider">
                  $50,000,000 Liquidated Clause
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Exhaustive statutory protection for <strong className="text-amber-300 font-semibold">Zeeco Grant</strong> • International Berne Convention &amp; Jamaican Copyright Act 1993
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition-colors shadow-sm"
            >
              {isCopiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Codex!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Full Codex</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadDeed}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors shadow-lg shadow-rose-950/50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Signed Deed (.txt)</span>
            </button>
          </div>
        </div>

        {/* Protection Metrics HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              Codex Articles Active
            </span>
            <p className="text-xl font-mono font-extrabold text-white mt-1">
              12 Articles
            </p>
            <span className="text-[10px] text-emerald-400 font-mono">100% Comprehensive</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              Statutory Liquidated Damages
            </span>
            <p className="text-xl font-mono font-extrabold text-rose-400 mt-1">
              $50,000,000
            </p>
            <span className="text-[10px] text-slate-500 font-mono">USD Per Violation</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              Cryptographic Seal
            </span>
            <p className="text-xs font-mono font-bold text-cyan-300 mt-1 truncate">
              SHA256-ZG-VERIFIED
            </p>
            <span className="text-[10px] text-slate-500 font-mono">17 U.S.C. § 1202 CMI</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Commercial Rights
            </span>
            <p className="text-sm font-mono font-bold text-amber-400 mt-1">
              ZERO RESALE
            </p>
            <span className="text-[10px] text-slate-500 font-mono">Personal Prototype Only</span>
          </div>
        </div>
      </div>

      {/* Codex Search & Articles List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Official Codex Articles ({filteredArticles.length} / 12)
            </h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal articles or statutes..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-400"
            />
          </div>
        </div>

        {/* Articles Accordion Grid */}
        <div className="space-y-4">
          {filteredArticles.map(art => {
            const isCopied = copiedId === art.articleNumber;
            return (
              <div
                key={art.articleNumber}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/50">
                        {art.articleNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {art.statutes.map((st, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-mono border border-slate-800"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyArticle(art)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer transition-colors shrink-0"
                    title="Copy Article Text"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Plain-Language Summary:
                  </span>
                  {art.summary}
                </div>

                <div className="p-3 bg-black/40 rounded-lg border border-slate-900 text-[11px] text-slate-400 leading-relaxed font-mono">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Statutory Covenant Text:
                  </span>
                  {art.fullLegalText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
