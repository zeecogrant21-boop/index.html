/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import {
  Activity,
  Trash2,
  Download,
  AlertTriangle,
  Search,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { KnowledgeStore } from '../utils/databaseStore';
import { SearchLog } from '../types/database';

export const SearchLogsView: React.FC<{ onUpdate?: () => void }> = ({ onUpdate }) => {
  const [logs, setLogs] = useState<SearchLog[]>(() => KnowledgeStore.getAllLogs());
  const [filterQuery, setFilterQuery] = useState('');
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const refreshLogs = () => {
    const updated = KnowledgeStore.getAllLogs();
    setLogs(updated);
    if (onUpdate) onUpdate();
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // 1. Clear Old Logs (>30 days)
  const handleClearOldLogs = () => {
    const deletedCount = KnowledgeStore.clearOldLogs(30);
    refreshLogs();
    if (deletedCount > 0) {
      notify(`✓ Pruned ${deletedCount} logs older than 30 days.`);
    } else {
      notify('ℹ No logs older than 30 days found in the database.');
    }
  };

  // 2. Clear All Logs
  const handleConfirmClearAll = () => {
    const count = KnowledgeStore.clearAllLogs();
    setShowClearAllModal(false);
    refreshLogs();
    notify(`✓ Cleared all ${count} audit log records.`);
  };

  // 3. Export CSV
  const handleExportCSV = () => {
    const csvContent = KnowledgeStore.exportLogsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ZGPersonalAI_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    notify('✓ CSV logs export downloaded with Zeeco Grant watermark.');
  };

  const filtered = logs.filter(l =>
    l.query.toLowerCase().includes(filterQuery.toLowerCase()) ||
    (l.matchedQuestion && l.matchedQuestion.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Search Query Audit &amp; Telemetry Logs
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Persistent 'logs' table tracking user searches, latency, match confidence, and SQLite page footprints
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleClearOldLogs}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Prune &gt; 30 Days</span>
          </button>

          <button
            onClick={() => setShowClearAllModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-800/50 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Clear All Logs</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter search queries by keyword..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase text-[10px] tracking-wider font-mono">
            <tr>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Search Query</th>
              <th className="py-3 px-4">Match Score</th>
              <th className="py-3 px-4">Latency</th>
              <th className="py-3 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
            {filtered.map(log => {
              const isHit = log.status === 'hit';
              const dateStr = new Date(log.timestamp).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              return (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      isHit
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                    }`}>
                      {isHit ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-sans text-white font-medium">
                    {log.query}
                    {log.matchedQuestion && (
                      <span className="block text-[10px] text-slate-400 font-sans mt-0.5 truncate max-w-xs">
                        Matched: {log.matchedQuestion}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={log.score > 70 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {log.score}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-400">
                    {log.responseTimeMs} ms
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                    {dateStr}
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500 font-sans text-xs">
                  No audit logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Clear All Logs */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Clear All Audit Logs?</h4>
                <p className="text-xs text-rose-400">Permanent SQLite Table Deletion</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete all {logs.length} search logs? This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearAllModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
