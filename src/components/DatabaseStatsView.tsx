/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState, useEffect } from 'react';
import {
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  HardDrive,
  Trash2,
  Sliders,
  ShieldCheck,
  FileSpreadsheet,
  Download,
  Calendar,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';
import { DatabaseStats, IntegrityCheckResult, MaintenanceSchedule } from '../types/database';
import { KnowledgeStore, StorageGuard, CRITICAL_THRESHOLD_MB, WARNING_THRESHOLD_MB } from '../utils/databaseStore';

interface DatabaseStatsViewProps {
  onRefresh?: () => void;
}

export const DatabaseStatsView: React.FC<DatabaseStatsViewProps> = ({ onRefresh }) => {
  const [stats, setStats] = useState<DatabaseStats>(() => KnowledgeStore.getDatabaseSize());
  const [schedule, setSchedule] = useState<MaintenanceSchedule>(() => KnowledgeStore.getSchedule());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showClearLogsModal, setShowClearLogsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [integrityResult, setIntegrityResult] = useState<IntegrityCheckResult | null>(null);
  const [isCheckingIntegrity, setIsCheckingIntegrity] = useState(false);
  const [isVacuuming, setIsVacuuming] = useState(false);
  const [simulatedOverhead, setSimulatedOverhead] = useState<number>(0);

  const fetchStats = () => {
    setIsRefreshing(true);
    const newStats = KnowledgeStore.getDatabaseSize();
    setStats(newStats);
    setSchedule(KnowledgeStore.getSchedule());
    if (onRefresh) onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
      if (onRefresh) onRefresh();
    }, 280);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  // 1. Clear Old Logs (> 30 days)
  const handleClearOldLogs = () => {
    const deletedCount = KnowledgeStore.clearOldLogs(30);
    fetchStats();
    if (deletedCount > 0) {
      showToast(
        'Old Logs Pruned Successfully',
        `Deleted ${deletedCount} audit log records older than 30 days. Slack space marked for VACUUM.`,
        'success'
      );
    } else {
      showToast(
        'Database Already Optimal',
        'No search logs older than 30 days found in the database.',
        'info'
      );
    }
  };

  // 2. Clear All Logs (Confirmed)
  const handleConfirmClearAllLogs = () => {
    const count = KnowledgeStore.clearAllLogs();
    setShowClearLogsModal(false);
    fetchStats();
    showToast(
      'Audit Logs Purged',
      `Permanently cleared all ${count} search log records from SQLite store.`,
      'warning'
    );
  };

  // 3. Optimize Database (VACUUM)
  const handleOptimizeDatabase = () => {
    setIsVacuuming(true);
    setTimeout(() => {
      const res = KnowledgeStore.optimizeDatabase();
      setIsVacuuming(false);
      setSimulatedOverhead(0);
      fetchStats();
      showToast(
        'SQLite VACUUM Complete',
        `${res.status} (Reclaimed ${res.reclaimedKB} KB in ${res.durationMs}ms)`,
        'success'
      );
    }, 450);
  };

  // 4. Verify Database Health (PRAGMA integrity_check)
  const handleVerifyIntegrity = () => {
    setIsCheckingIntegrity(true);
    setTimeout(() => {
      const result = KnowledgeStore.verifyDatabaseHealth();
      setIntegrityResult(result);
      setIsCheckingIntegrity(false);
      showToast(
        result.ok ? 'Integrity Check Passed' : 'Database Corruption Warning',
        result.pragmaResult,
        result.ok ? 'success' : 'warning'
      );
    }, 350);
  };

  // 5. Export Logs to CSV
  const handleExportCSV = () => {
    const csvContent = KnowledgeStore.exportLogsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ZGPersonalAI_Logs_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Logs Exported', 'CSV file generated and downloaded successfully.', 'success');
  };

  // 6. Full Backup JSON
  const handleBackupDatabase = () => {
    const jsonStr = KnowledgeStore.backupDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ZGPersonalAI_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    fetchStats();
    showToast('Database Backed Up', 'Full QA & logs database JSON saved. Schedule timestamp updated.', 'success');
  };

  // 7. Interactive Slider for Simulating Storage Pressure (>50MB visual alert testing)
  const handleSimulateStorageChange = (valMB: number) => {
    setSimulatedOverhead(valMB);
    KnowledgeStore.setSimulatedOverheadMB(valMB);
    fetchStats();
  };

  // Dynamic color coding according to prompt specifications:
  // Text component changes color to orange or red if size exceeds 50MB (or warning 30MB)
  const isOver50MB = stats.totalSizeMB > CRITICAL_THRESHOLD_MB;
  const isOver30MB = stats.totalSizeMB > WARNING_THRESHOLD_MB;

  const sizeTextColor = isOver50MB
    ? 'text-rose-500 font-extrabold'
    : isOver30MB
    ? 'text-amber-500 font-bold'
    : 'text-emerald-400 font-bold';

  const statusBadgeBg = isOver50MB
    ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
    : isOver30MB
    ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
    : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300';

  const capacity = StorageGuard.getCapacity();

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-md max-w-md animate-in slide-in-from-bottom duration-200 ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
              : toastMessage.type === 'warning'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-100'
              : 'bg-slate-900/90 border-slate-700 text-slate-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">{toastMessage.title}</p>
              <p className="text-xs opacity-90 mt-0.5">{toastMessage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Database Storage Status Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
            isOver50MB ? 'bg-rose-500/20' : isOver30MB ? 'bg-amber-500/15' : 'bg-emerald-500/10'
          }`}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${
              isOver50MB
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                : isOver30MB
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  SQLite KnowledgeStore Storage Diagnostics
                </h2>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${statusBadgeBg}`}>
                  {isOver50MB ? 'CRITICAL (> 50 MB)' : isOver30MB ? 'WARNING (> 30 MB)' : 'HEALTHY'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time SQLite database footprint with automatic 30-day log purging and StorageGuard
              </p>
            </div>
          </div>

          {/* Refresh Status Button next to Database Size Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              disabled={isRefreshing}
              aria-label="Refresh Status: recalculate storage stats"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
              <span>Refresh Status</span>
            </button>
          </div>
        </div>

        {/* Database Size Hero Metric */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Main Size in MB with Dynamic Warning Color */}
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            isOver50MB
              ? 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/30'
              : isOver30MB
              ? 'bg-amber-950/40 border-amber-500/50 shadow-amber-950/30'
              : 'bg-slate-950/60 border-slate-800'
          }`}>
            <span className="text-xs text-slate-400 font-medium flex items-center justify-between">
              Total Database Size
              {isOver50MB && <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />}
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className={`text-3xl font-mono ${sizeTextColor}`}>
                {stats.totalSizeMB.toFixed(2)}
              </span>
              <span className={`text-sm font-semibold uppercase ${sizeTextColor}`}>MB</span>
            </div>
            <p className="text-[11px] mt-1.5 text-slate-400">
              {isOver50MB
                ? '⚠️ Critical warning: Exceeds 50MB safe boundary! Run VACUUM or prune logs.'
                : isOver30MB
                ? '⚡ Warning: Size approaching threshold. Review search audit logs.'
                : '✓ Well within safe Android/PWA limits (Safe Cap: 64 MB).'}
            </p>
          </div>

          {/* QA Knowledge Table Size */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              'qa' Table (Knowledge Base)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-cyan-400">
                {stats.qaTableSizeKB}
              </span>
              <span className="text-xs text-slate-400 font-mono">KB</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.qaCount} pinned Q&A records indexed
            </p>
          </div>

          {/* Logs Table Size */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              'logs' Table (Query Audits)
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-purple-400">
                {stats.logsTableSizeKB}
              </span>
              <span className="text-xs text-slate-400 font-mono">KB</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.logsCount} search telemetry queries stored
            </p>
          </div>

          {/* Defragmentation & Slack Space Reclaimable */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Reclaimable Slack Space
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-amber-400">
                {stats.freeSpaceReclaimedKB}
              </span>
              <span className="text-xs text-slate-400 font-mono">KB</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Defragment with VACUUM to reclaim
            </p>
          </div>
        </div>

        {/* Storage Guard Capacity Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              StorageGuard Allocation & Safe Capacity
            </span>
            <span className="font-mono text-slate-400">
              {stats.totalSizeMB.toFixed(2)} MB / 64.00 MB ({capacity.percentage}% utilized)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOver50MB
                  ? 'bg-rose-500'
                  : isOver30MB
                  ? 'bg-amber-400'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(3, capacity.percentage))}%` }}
            />
          </div>
        </div>

        {/* Interactive Simulation Slider to Test the >50MB Warning Instantly */}
        <div className="mt-5 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <div>
              <span className="font-semibold text-slate-200">Simulate Storage Bloat / Pressure:</span>
              <span className="text-slate-400 ml-1.5">
                (Test the &gt;50MB color warning rule)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="58"
              step="2"
              value={simulatedOverhead}
              onChange={(e) => handleSimulateStorageChange(parseFloat(e.target.value))}
              className="w-36 accent-amber-400 cursor-pointer"
              aria-label="Simulate database overhead in MB"
            />
            <span className="font-mono font-bold text-amber-400 w-16 text-right">
              +{simulatedOverhead} MB
            </span>
            {simulatedOverhead > 0 && (
              <button
                onClick={() => handleSimulateStorageChange(0)}
                className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Database Maintenance & Scheduled WorkManager Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Actions Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            Database Maintenance Controls
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Prune >30 Days Logs */}
            <button
              onClick={handleClearOldLogs}
              className="flex flex-col items-start p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Trash2 className="w-3.5 h-3.5" />
                Clear Logs (&gt; 30 Days)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Deletes queries older than 30 days to minimize footprint.
              </p>
            </button>

            {/* Clear All Logs with Safety Dialog */}
            <button
              onClick={() => setShowClearLogsModal(true)}
              className="flex flex-col items-start p-3 rounded-xl bg-slate-950 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Clear All Logs
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Purges all search logs with safety confirmation dialog.
              </p>
            </button>

            {/* Optimize Database (VACUUM) */}
            <button
              onClick={handleOptimizeDatabase}
              disabled={isVacuuming}
              className="flex flex-col items-start p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Sparkles className={`w-3.5 h-3.5 ${isVacuuming ? 'animate-spin' : ''}`} />
                Optimize Database (VACUUM)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Runs VACUUM to defragment B-trees and reclaim unused disk space.
              </p>
            </button>

            {/* PRAGMA integrity_check */}
            <button
              onClick={handleVerifyIntegrity}
              disabled={isCheckingIntegrity}
              className="flex flex-col items-start p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className={`w-3.5 h-3.5 ${isCheckingIntegrity ? 'animate-pulse' : ''}`} />
                Integrity Check (PRAGMA)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Audits schema consistency, corrupted pages, and token indices.
              </p>
            </button>
          </div>

          {/* Export & Backup Section */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 cursor-pointer transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              Export Logs (CSV)
            </button>

            <button
              onClick={handleBackupDatabase}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              Full Database Backup (JSON)
            </button>
          </div>
        </div>

        {/* Schedule & Diagnostics Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            Automated WorkManager Scheduling
          </h3>

          <div className="space-y-3">
            {/* Last Backup Date text view */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Last Backup Date</p>
                <p className="text-xs font-semibold text-slate-200 mt-0.5 font-mono">
                  {schedule.lastBackupDate || 'No manual backup executed yet'}
                </p>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                SharedPreferences
              </span>
            </div>

            {/* Next Scheduled Maintenance text view */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Next Scheduled Maintenance</p>
                <p className="text-xs font-semibold text-emerald-400 mt-0.5 font-mono">
                  {schedule.nextScheduledMaintenance}
                </p>
              </div>
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/50">
                Weekly Periodic Task
              </span>
            </div>

            {/* PRAGMA Integrity Result Card */}
            {integrityResult && (
              <div className={`p-3.5 rounded-xl border ${
                integrityResult.ok
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-semibold text-xs">
                  {integrityResult.ok ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>PRAGMA integrity_check Result</span>
                </div>
                <p className="text-[11px] font-mono mt-1 opacity-90">
                  {integrityResult.pragmaResult}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Scanned {integrityResult.totalRowsScanned} records across {integrityResult.tablesChecked.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for 'Clear All Logs' (prevents accidental loss) */}
      {showClearLogsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Clear All Search Logs?</h4>
                <p className="text-xs text-rose-400">Irreversible Database Action</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently clear all <strong className="text-white">{stats.logsCount}</strong> search log entries from the database? This action will reclaim table space but remove historical query response analytics.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              💡 Tip: You can download a CSV backup first via "Export Logs (CSV)" before clearing.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearLogsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAllLogs}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-lg shadow-rose-950"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Yes, Clear All Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
