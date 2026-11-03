/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Database,
  Palette,
  Sparkles,
  Bot,
  RotateCcw,
  CheckCircle2,
  HardDrive,
  Lock,
  Volume2,
  Cpu,
  Monitor,
  Flame,
  Award,
  Globe
} from 'lucide-react';
import { SettingsStore, AppSettings, DEFAULT_SETTINGS } from '../utils/settingsStore';
import { KnowledgeStore } from '../utils/databaseStore';

interface SettingsViewProps {
  onSettingsChanged: (newSettings: AppSettings) => void;
  onDatabaseReset?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onSettingsChanged, onDatabaseReset }) => {
  const [settings, setSettings] = useState<AppSettings>(() => SettingsStore.getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdate = (partial: Partial<AppSettings>) => {
    const updated = SettingsStore.updateSettings(partial);
    setSettings(updated);
    onSettingsChanged(updated);
    notify('Settings updated and persisted to secure storage.');
  };

  const handleResetDefaults = () => {
    const reset = SettingsStore.resetToDefaults();
    setSettings(reset);
    onSettingsChanged(reset);
    notify('Restored factory default settings.');
  };

  const handleFactoryResetDatabase = () => {
    KnowledgeStore.resetKnowledgeToDefaults();
    KnowledgeStore.clearAllLogs();
    KnowledgeStore.optimizeDatabase();
    setShowResetConfirm(false);
    if (onDatabaseReset) onDatabaseReset();
    notify('Database successfully restored to original factual knowledge packs.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl border border-amber-500/50 bg-slate-900/95 backdrop-blur-md text-amber-200 text-xs flex items-center gap-2 animate-in slide-in-from-bottom"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Card with Holographic Cyber Edge */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-80 h-40 bg-gradient-to-bl from-amber-500/10 via-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Settings className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Futuristic System Controls &amp; Settings
                </h2>
                <span className="text-[10px] bg-amber-950 text-amber-400 font-mono px-2 py-0.5 rounded-full border border-amber-800/50 uppercase font-semibold">
                  v2.0 Tactical HUD
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure Co-Pilot intelligence parameters, SQLite maintenance schedules, and cyber-holographic themes
              </p>
            </div>
          </div>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Restore Defaults</span>
          </button>
        </div>

        {/* 1. Cyber-Holo Visuals & Theme Accent */}
        <div className="mt-6 space-y-4">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
            <Palette className="w-4 h-4" />
            1. Cyber-Holographic HUD &amp; Aesthetic Upgrades
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'solar-gold', name: 'Solar Gold (Lignum Vitae)', color: 'from-amber-400 to-amber-600', border: 'border-amber-500' },
              { id: 'neon-emerald', name: 'Neon Emerald (Cyber-Kingston)', color: 'from-emerald-400 to-emerald-600', border: 'border-emerald-500' },
              { id: 'cyber-cyan', name: 'Cyber Cyan (Blue Lagoon)', color: 'from-cyan-400 to-cyan-600', border: 'border-cyan-500' },
              { id: 'midnight-violet', name: 'Midnight Violet (Port Royal)', color: 'from-purple-400 to-purple-600', border: 'border-purple-500' }
            ].map(thm => (
              <button
                key={thm.id}
                onClick={() => handleUpdate({ themeAccent: thm.id as any })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  settings.themeAccent === thm.id
                    ? `${thm.border} bg-slate-950 shadow-lg`
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${thm.color}`} />
                  <span className="font-bold text-xs text-white">{thm.name.split(' ')[0]} {thm.name.split(' ')[1]}</span>
                </div>
                <span className="text-[10px] text-slate-400">{thm.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {/* Holographic Glow Effects */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Holographic HUD Glow</span>
                <span className="text-[10px] text-slate-400">Radiant aura borders and backdrop blur</span>
              </div>
              <input
                type="checkbox"
                checked={settings.hudGlowEffects}
                onChange={(e) => handleUpdate({ hudGlowEffects: e.target.checked })}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Tactical Scanlines */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Tactical Scanline Grid</span>
                <span className="text-[10px] text-slate-400">Futuristic CRT overlay effect</span>
              </div>
              <input
                type="checkbox"
                checked={settings.tacticalScanlines}
                onChange={(e) => handleUpdate({ tacticalScanlines: e.target.checked })}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Weather Temperature Unit */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Temperature Units</span>
                <span className="text-[10px] text-slate-400">Default parish weather unit</span>
              </div>
              <select
                value={settings.temperatureUnit}
                onChange={(e) => handleUpdate({ temperatureUnit: e.target.value as any })}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-mono"
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Co-Pilot Intelligence & Dialect Tuning */}
        <div className="mt-8 space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <Bot className="w-4 h-4" />
            2. Co-Pilot Behavioral &amp; Dialect Tuning
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Default Dialect */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Default Dialect Mode:
              </label>
              <select
                value={settings.defaultDialect}
                onChange={(e) => handleUpdate({ defaultDialect: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
              >
                <option value="english">Standard Global English</option>
                <option value="patois">Authentic Jamaican Patois (Patwa)</option>
              </select>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Controls the baseline tone of knowledge responses
              </span>
            </div>

            {/* Response Tone */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Response Delivery Style:
              </label>
              <select
                value={settings.responseTone}
                onChange={(e) => handleUpdate({ responseTone: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
              >
                <option value="academic">Academic &amp; Comprehensive</option>
                <option value="concise">Direct &amp; Fast Summary</option>
                <option value="island_copilot">Island Co-Pilot Conversational</option>
              </select>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Depth of factual citations and explanations
              </span>
            </div>

            {/* Search Match Sensitivity */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Match Sensitivity:</span>
                <span className="font-mono text-cyan-400 font-bold">{settings.searchSensitivity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={settings.searchSensitivity}
                onChange={(e) => handleUpdate({ searchSensitivity: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer mt-2"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Minimum score threshold required to declare a search "hit"
              </span>
            </div>
          </div>
        </div>

        {/* 3. Database Maintenance & Storage Thresholds */}
        <div className="mt-8 space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            3. Database &amp; StorageGuard Maintenance Policies
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Auto-Prune Frequency */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Auto-Prune Search Logs:
              </label>
              <select
                value={settings.autoPruneDays}
                onChange={(e) => handleUpdate({ autoPruneDays: parseInt(e.target.value, 10) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
              >
                <option value={7}>Keep last 7 days only</option>
                <option value={14}>Keep last 14 days</option>
                <option value={30}>Keep last 30 days (Default)</option>
                <option value={60}>Keep last 60 days</option>
              </select>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Deletes obsolete search queries automatically
              </span>
            </div>

            {/* Warning Storage Threshold (MB) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-300">Warning Threshold:</span>
                <span className="font-mono text-emerald-400 font-bold">{settings.storageThresholdMB} MB</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={settings.storageThresholdMB}
                onChange={(e) => handleUpdate({ storageThresholdMB: parseFloat(e.target.value) })}
                className="w-full accent-emerald-400 cursor-pointer mt-2"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Visual HUD turns Orange/Red when database exceeds this limit
              </span>
            </div>

            {/* Auto-Vacuum Toggle */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 block">Startup VACUUM Optimization</span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Automatically defragment B-trees and reclaim disk pages on application launch
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Enabled</span>
                <input
                  type="checkbox"
                  checked={settings.autoVacuumOnStartup}
                  onChange={(e) => handleUpdate({ autoVacuumOnStartup: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Database Factory Reset */}
          <div className="pt-2 flex items-center justify-between p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-xl">
            <div>
              <span className="text-xs font-bold text-rose-300 block">Reset KnowledgeStore to Master Packs</span>
              <span className="text-[10px] text-slate-400">
                Restores original verified Jamaican knowledge packs and clears obsolete custom items
              </span>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold cursor-pointer transition-colors"
            >
              Reset Database
            </button>
          </div>
        </div>

        {/* 4. Security, Licensee & Cryptographic Seal */}
        <div className="mt-8 space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
            <Shield className="w-4 h-4" />
            4. Proprietary Licensee Credentials &amp; Watermark Intensity
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 text-[11px] block">AUTHORIZED LICENSEE:</span>
                <span className="text-amber-300 font-bold text-sm">{settings.licenseeName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">SECURITY CREDENTIAL:</span>
                <span className="text-slate-200">{settings.licenseeEmail}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">DIGITAL SIGNATURE FINGERPRINT:</span>
                <span className="text-cyan-400">{settings.signatureHash}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">SECURITY COVENANTS:</span>
                <span className="text-emerald-400 font-semibold">ANTI-THEFT &amp; REVERSE-ENGINEERING PROTECTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Database Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-rose-500/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Reset KnowledgeStore to Master Packs?</h4>
                <p className="text-xs text-rose-400">Restore factory knowledge entries</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will re-initialize the database with verified Jamaican knowledge packs across all subjects and clear custom search logs.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFactoryResetDatabase}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
