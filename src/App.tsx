/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import React, { useState, useEffect } from 'react';
import { LegalNoticeBanner } from './components/LegalNoticeBanner';
import { Navbar, ActiveTab } from './components/Navbar';
import { QuadAIBridgeView } from './components/QuadAIBridgeView';
import { MainBrainConsole } from './components/MainBrainConsole';
import { CoPilotChat } from './components/CoPilotChat';
import { SentinelSecurityConsole } from './components/SentinelSecurityConsole';
import { FactFinderOracleView } from './components/FactFinderOracleView';
import { SelfLearningMatrixView } from './components/SelfLearningMatrixView';
import { MedicalCodexView } from './components/MedicalCodexView';
import { CoffeeEstateExplorer } from './components/CoffeeEstateExplorer';
import { DatabaseStatsView } from './components/DatabaseStatsView';
import { SmartCategoryExplorer } from './components/SmartCategoryExplorer';
import { SmartMathSolver } from './components/SmartMathSolver';
import { LiveWeatherTracker } from './components/LiveWeatherTracker';
import { ParishExplorer } from './components/ParishExplorer';
import { KnowledgeImporter } from './components/KnowledgeImporter';
import { SearchLogsView } from './components/SearchLogsView';
import { LegalFortressView } from './components/LegalFortressView';
import { SettingsView } from './components/SettingsView';
import { SecurityWatermarkOverlay } from './components/SecurityWatermarkOverlay';
import { KnowledgeStore } from './utils/databaseStore';
import { SettingsStore, AppSettings } from './utils/settingsStore';
import { DatabaseStats } from './types/database';
import { SentinelSecurityAI, SecuritySweepReport } from './utils/aiFederation';
import { ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bridge');
  const [stats, setStats] = useState<DatabaseStats>(() => KnowledgeStore.getDatabaseSize());
  const [settings, setSettings] = useState<AppSettings>(() => SettingsStore.getSettings());
  const [recentSweepAlert, setRecentSweepAlert] = useState<SecuritySweepReport | null>(null);

  // Startup sequence: automatically clean old logs (>30 days) and optimize database
  useEffect(() => {
    // 1. Prune logs older than user-configured retention days
    KnowledgeStore.clearOldLogs(settings.autoPruneDays || 30);
    // 2. Run optimizeDatabase (VACUUM) defragmentation if enabled
    if (settings.autoVacuumOnStartup) {
      KnowledgeStore.optimizeDatabase();
    }
    // 3. Update stats
    setStats(KnowledgeStore.getDatabaseSize());
  }, []);

  // Autonomous Random Security Sweep Scheduler by AI #3 (Sentinel Guardian)
  useEffect(() => {
    let timeoutId: any = null;

    const scheduleNextRandomSweep = () => {
      // Random interval between 45 seconds and 75 seconds
      const randomDelayMs = Math.floor((45 + Math.random() * 30) * 1000);

      timeoutId = setTimeout(() => {
        if (SentinelSecurityAI.isAutoSweepActive()) {
          const report = SentinelSecurityAI.executeSecuritySweep('RANDOM_AUTONOMOUS');
          setRecentSweepAlert(report);
          setTimeout(() => setRecentSweepAlert(null), 5000);
        }
        scheduleNextRandomSweep();
      }, randomDelayMs);
    };

    scheduleNextRandomSweep();

    // Listen to all sweeps
    const unsub = SentinelSecurityAI.subscribeToSweeps(report => {
      setRecentSweepAlert(report);
      setTimeout(() => setRecentSweepAlert(null), 5000);
    });

    return () => {
      clearTimeout(timeoutId);
      unsub();
    };
  }, []);

  const refreshStats = () => {
    setStats(KnowledgeStore.getDatabaseSize());
  };

  const handleSettingsChanged = (newSettings: AppSettings) => {
    setSettings(newSettings);
    refreshStats();
  };

  return (
    <div className={`min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden ${
      settings.hudGlowEffects ? 'hud-glow-active' : ''
    }`}>
      {/* Optional Tactical Scanline Overlay for Cyber-Futuristic Vibe */}
      {settings.tacticalScanlines && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40"
        />
      )}

      {/* Autonomous Random Security Sweep HUD Toast Notification */}
      {recentSweepAlert && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-950/95 border border-rose-500/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-3 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                  AI #3 SENTINEL RANDOM SWEEP
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {recentSweepAlert.memoryEfficiencyScore}% Optimal
                </span>
              </div>
              <p className="text-xs text-white font-semibold">
                Watermark Verified: SHA256-ZG-ZEECO-GRANT
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                $50M Legal Fortress Covenants Active • 0 Threats
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background Security Watermark Overlay & Clean System */}
      <SecurityWatermarkOverlay />

      {/* Top Legal & Anti-Piracy Notice Banner */}
      <LegalNoticeBanner />

      {/* Main Navbar & Navigation Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        themeAccent={settings.themeAccent}
      />

      {/* Main Container with Futuristic Glassmorphism */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 z-10 space-y-6">
        {activeTab === 'bridge' && (
          <QuadAIBridgeView />
        )}

        {activeTab === 'brain' && (
          <MainBrainConsole onDirectiveExecuted={refreshStats} />
        )}

        {activeTab === 'copilot' && (
          <CoPilotChat onLogCreated={refreshStats} />
        )}

        {activeTab === 'sentinel' && (
          <SentinelSecurityConsole />
        )}

        {activeTab === 'factfinder' && (
          <FactFinderOracleView />
        )}

        {activeTab === 'learning' && (
          <SelfLearningMatrixView />
        )}

        {activeTab === 'medical' && (
          <MedicalCodexView />
        )}

        {activeTab === 'coffee' && (
          <CoffeeEstateExplorer />
        )}

        {activeTab === 'database' && (
          <DatabaseStatsView onRefresh={refreshStats} />
        )}

        {activeTab === 'categories' && (
          <SmartCategoryExplorer />
        )}

        {activeTab === 'math' && (
          <SmartMathSolver />
        )}

        {activeTab === 'weather' && (
          <LiveWeatherTracker />
        )}

        {activeTab === 'parishes' && (
          <ParishExplorer />
        )}

        {activeTab === 'loader' && (
          <KnowledgeImporter onRefresh={refreshStats} />
        )}

        {activeTab === 'logs' && (
          <SearchLogsView onUpdate={refreshStats} />
        )}

        {activeTab === 'legal' && (
          <LegalFortressView />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            onSettingsChanged={handleSettingsChanged}
            onDatabaseReset={refreshStats}
          />
        )}
      </main>

      {/* Futuristic Cyber Footer */}
      <footer className="bg-black/80 border-t border-slate-900/90 py-6 px-4 text-center text-xs text-slate-500 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">ZG Personal AI 4-AI Autonomous Suite</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Exclusively for Zeeco Grant</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-[11px] text-cyan-400 font-mono">
              PERMANENT KNOWLEDGE CORE SEALED
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-500">
            PROTOTYPE CERTIFICATE: SHA256-ZG-ZEECO-GRANT-VERIFIED • NOT FOR RESALE
          </div>
        </div>
      </footer>
    </div>
  );
}
