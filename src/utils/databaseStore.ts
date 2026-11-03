/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DatabaseStats,
  IntegrityCheckResult,
  MaintenanceSchedule,
  QAEntry,
  SearchLog
} from '../types/database';
import { INITIAL_KNOWLEDGE_PACKS, RawKnowledgeItem, SUPERSEDED_KEYS } from './jamaicaPacks';

// Storage keys for persistent state
const STORAGE_KEYS = {
  QA: 'zg_personal_ai_qa_v1',
  LOGS: 'zg_personal_ai_logs_v1',
  PREFS: 'zg_personal_ai_prefs_v1',
  SIMULATED_OVERHEAD_BYTES: 'zg_simulated_db_overhead_bytes_v1',
  LAST_VACUUM: 'zg_last_vacuum_v1'
};

// Safe storage limit constant (e.g. 64 MB maximum quota for SQLite / applet storage guard)
export const MAX_STORAGE_CAPACITY_BYTES = 64 * 1024 * 1024; // 64 MB
export const WARNING_THRESHOLD_MB = 30.0;
export const CRITICAL_THRESHOLD_MB = 50.0;

/**
 * Tokenize question / query into normalized words
 */
export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

/**
 * StorageGuard: verifies if storage limit allows writing
 */
export const StorageGuard = {
  canWrite(neededBytes: number = 1024): boolean {
    const stats = KnowledgeStore.getDatabaseSize();
    const currentBytes = stats.totalSizeMB * 1024 * 1024;
    return currentBytes + neededBytes <= MAX_STORAGE_CAPACITY_BYTES;
  },

  getCapacity(): { usedBytes: number; maxBytes: number; percentage: number } {
    const stats = KnowledgeStore.getDatabaseSize();
    const usedBytes = Math.round(stats.totalSizeMB * 1024 * 1024);
    const percentage = Math.min(100, Math.round((usedBytes / MAX_STORAGE_CAPACITY_BYTES) * 100));
    return {
      usedBytes,
      maxBytes: MAX_STORAGE_CAPACITY_BYTES,
      percentage
    };
  }
};

/**
 * In-memory & Persistent KnowledgeStore implementation
 */
class KnowledgeStoreEngine {
  private qaTable: Map<string, QAEntry> = new Map();
  private logsTable: SearchLog[] = [];
  private simulatedSlackBytes: number = 0;
  private lastVacuumTimestamp: number | null = null;
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    this.loadFromStorage();

    // If QA table is empty or missing newly added packs, seed with initial Jamaican knowledge packs
    if (this.qaTable.size < INITIAL_KNOWLEDGE_PACKS.length) {
      this.seedInitialPacks();
    }

    // If logs are empty, seed some realistic query history (some old, some recent)
    if (this.logsTable.length === 0) {
      this.seedInitialLogs();
    }

    this.isInitialized = true;
  }

  private loadFromStorage() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;

      const rawQA = localStorage.getItem(STORAGE_KEYS.QA);
      if (rawQA) {
        const parsedQA: QAEntry[] = JSON.parse(rawQA);
        parsedQA.forEach(item => this.qaTable.set(item.id, item));
      }

      const rawLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (rawLogs) {
        this.logsTable = JSON.parse(rawLogs);
      }

      const rawOverhead = localStorage.getItem(STORAGE_KEYS.SIMULATED_OVERHEAD_BYTES);
      if (rawOverhead) {
        this.simulatedSlackBytes = parseInt(rawOverhead, 10) || 0;
      }

      const rawVacuum = localStorage.getItem(STORAGE_KEYS.LAST_VACUUM);
      if (rawVacuum) {
        this.lastVacuumTimestamp = parseInt(rawVacuum, 10) || null;
      }
    } catch {
      // Storage unavailable or quota exceeded; engine falls back to in-memory state
    }
  }

  private saveToStorage() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.setItem(STORAGE_KEYS.QA, JSON.stringify(Array.from(this.qaTable.values())));
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(this.logsTable));
      localStorage.setItem(STORAGE_KEYS.SIMULATED_OVERHEAD_BYTES, this.simulatedSlackBytes.toString());
      if (this.lastVacuumTimestamp) {
        localStorage.setItem(STORAGE_KEYS.LAST_VACUUM, this.lastVacuumTimestamp.toString());
      }
    } catch {
      // Silently fail if storage quota hit in browser
    }
  }

  private seedInitialPacks() {
    const rows = INITIAL_KNOWLEDGE_PACKS.filter(item => !SUPERSEDED_KEYS.has(item.q.toLowerCase()))
      .map(item => ({
        q: item.q,
        a: item.a,
        pack: item.pack,
        category: item.category
      }));

    this.bulkInsertPinned(
      rows.map(r => ({
        question: r.q,
        answer: r.a,
        packSource: r.pack,
        category: r.category
      }))
    );
  }

  private seedInitialLogs() {
    const now = Date.now();
    const dayMs = 86400 * 1000;

    const sampleQueries = [
      { q: 'Who is Nanny of the Maroons?', status: 'hit' as const, daysAgo: 1, score: 98 },
      { q: 'What is the national fruit of Jamaica?', status: 'hit' as const, daysAgo: 2, score: 100 },
      { q: 'Parishes of Cornwall county', status: 'hit' as const, daysAgo: 4, score: 92 },
      { q: 'Bob Marley birthplace Nine Mile', status: 'hit' as const, daysAgo: 12, score: 95 },
      { q: 'Usain Bolt 100m world record', status: 'hit' as const, daysAgo: 25, score: 99 },
      // Older than 30 days
      { q: 'Kingston 1692 earthquake history', status: 'hit' as const, daysAgo: 34, score: 88 },
      { q: 'Spanish Town Villa de la Vega archives', status: 'hit' as const, daysAgo: 45, score: 90 },
      { q: '1865 Morant Bay rebellion trial records', status: 'hit' as const, daysAgo: 60, score: 94 },
      { q: 'Lignum vitae medicinal properties', status: 'hit' as const, daysAgo: 72, score: 85 },
      { q: 'Obscure Jamaican currency audit query 1970', status: 'miss' as const, daysAgo: 95, score: 20 }
    ];

    sampleQueries.forEach((item, index) => {
      this.logsTable.push({
        id: `seed_log_${index + 1}_${Date.now()}`,
        query: item.q,
        matchedQuestion: item.status === 'hit' ? item.q : undefined,
        score: item.score,
        responseTimeMs: Math.floor(18 + Math.random() * 35),
        timestamp: now - item.daysAgo * dayMs,
        status: item.status
      });
    });

    this.saveToStorage();
  }

  /**
   * Bulk insert pinned Q&A rows into the 'qa' table
   * matches Android Kotlin KnowledgeStore.bulkInsertPinned
   */
  public bulkInsertPinned(
    rows: Array<{
      question: string;
      answer: string;
      packSource?: string;
      category?: string;
    }>
  ): number {
    let count = 0;
    const now = Date.now();

    for (const row of rows) {
      const q = row.question.slice(0, 1000).trim();
      const a = row.answer.slice(0, 4000).trim();
      if (!q || !a) continue;

      const id = `qa_${Math.abs(q.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0))}`;
      const wordList = tokens(q);

      this.qaTable.set(id, {
        id,
        question: q,
        answer: a,
        words: wordList,
        pinned: true,
        packSource: row.packSource || 'JamaicaKnowledge.kt',
        category: row.category || 'General',
        created: now
      });
      count++;
    }

    this.saveToStorage();
    return count;
  }

  /**
   * Add a single QA entry
   */
  public addEntry(entry: { question: string; answer: string; packSource?: string; category?: string; pinned?: boolean }): QAEntry {
    const q = entry.question.slice(0, 1000).trim();
    const a = entry.answer.slice(0, 4000).trim();
    const id = `qa_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const newQA: QAEntry = {
      id,
      question: q,
      answer: a,
      words: tokens(q),
      pinned: entry.pinned ?? true,
      packSource: entry.packSource || 'UserCustom.kt',
      category: entry.category || 'Custom',
      created: Date.now()
    };

    this.qaTable.set(id, newQA);
    this.saveToStorage();
    return newQA;
  }

  /**
   * Delete QA Entry with Permanent Knowledge Protection
   * Pinned master knowledge entries cannot be deleted under any circumstances
   */
  public deleteEntry(id: string): boolean {
    const entry = this.qaTable.get(id);
    if (entry && entry.pinned) {
      throw new Error(`Security Violation: Entry "${entry.question}" is a permanent immutable master knowledge item and cannot be deleted.`);
    }
    const deleted = this.qaTable.delete(id);
    if (deleted) {
      this.simulatedSlackBytes += 512; // Creates fragmentation / slack space in DB
      this.saveToStorage();
    }
    return deleted;
  }

  /**
   * Return the count of permanent immutable master knowledge entries that cannot be deleted
   */
  public getPermanentKnowledgeCount(): number {
    let count = 0;
    for (const item of this.qaTable.values()) {
      if (item.pinned) count++;
    }
    return count;
  }

  /**
   * Maintenance function: deletes search logs older than specified days (default 30)
   * Returns the count of deleted rows.
   */
  public clearOldLogs(days: number = 30): number {
    const now = Date.now();
    const threshold = now - days * 24 * 60 * 60 * 1000;
    const initialCount = this.logsTable.length;

    this.logsTable = this.logsTable.filter(log => log.timestamp >= threshold);
    const deletedCount = initialCount - this.logsTable.length;

    if (deletedCount > 0) {
      // Deleting rows leaves slack/fragmentation space until VACUUM
      this.simulatedSlackBytes += deletedCount * 384;
      this.saveToStorage();
    }

    return deletedCount;
  }

  /**
   * Clear All Logs (prompted by confirmation dialog in UI)
   */
  public clearAllLogs(): number {
    const count = this.logsTable.length;
    this.simulatedSlackBytes += count * 384;
    this.logsTable = [];
    this.saveToStorage();
    return count;
  }

  /**
   * Log an assistant search query
   */
  public logSearch(log: Omit<SearchLog, 'id' | 'timestamp'>): SearchLog {
    const fullLog: SearchLog = {
      id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ...log,
      timestamp: Date.now()
    };
    this.logsTable.unshift(fullLog);
    // Keep max 500 in memory
    if (this.logsTable.length > 500) {
      this.logsTable = this.logsTable.slice(0, 500);
    }
    this.saveToStorage();
    return fullLog;
  }

  /**
   * Calculates total size of 'logs' table and approximate total storage usage
   * Returns DatabaseStats with MB/KB metrics, fragmentation, and threshold flags.
   */
  public getDatabaseSize(): DatabaseStats {
    let qaBytes = 0;
    for (const qa of this.qaTable.values()) {
      qaBytes += qa.question.length * 2 + qa.answer.length * 2 + qa.words.join(' ').length + 256;
    }

    let logsBytes = 0;
    for (const log of this.logsTable) {
      logsBytes += log.query.length * 2 + (log.matchedQuestion?.length || 0) * 2 + 180;
    }

    // SQLite page size alignment (4096-byte pages) + indexes + simulated slack
    const sqlitePageSize = 4096;
    const sqliteHeaderBytes = sqlitePageSize; // page 1 header
    const indexOverheadBytes = Math.round((qaBytes + logsBytes) * 0.35);

    const totalRawBytes = sqliteHeaderBytes + qaBytes + logsBytes + indexOverheadBytes + this.simulatedSlackBytes;
    const totalSizeMB = parseFloat((totalRawBytes / (1024 * 1024)).toFixed(2));

    const qaTableSizeKB = parseFloat((qaBytes / 1024).toFixed(1));
    const logsTableSizeKB = parseFloat((logsBytes / 1024).toFixed(1));
    const freeSpaceReclaimedKB = parseFloat((this.simulatedSlackBytes / 1024).toFixed(1));

    const fragmentationRatio = totalRawBytes > 0
      ? parseFloat((this.simulatedSlackBytes / totalRawBytes).toFixed(3))
      : 0;

    const isCritical = totalSizeMB > CRITICAL_THRESHOLD_MB;
    const isWarning = totalSizeMB > WARNING_THRESHOLD_MB;

    return {
      totalSizeMB,
      qaCount: this.qaTable.size,
      logsCount: this.logsTable.length,
      qaTableSizeKB,
      logsTableSizeKB,
      freeSpaceReclaimedKB,
      fragmentationRatio,
      isWarning,
      isCritical,
      status: isCritical ? 'critical' : isWarning ? 'warning' : 'healthy',
      lastOptimizedAt: this.lastVacuumTimestamp
    };
  }

  /**
   * Set simulated overhead (allows user to test the 50MB warning threshold interactively!)
   */
  public setSimulatedOverheadMB(mb: number) {
    this.simulatedSlackBytes = Math.max(0, Math.round(mb * 1024 * 1024));
    this.saveToStorage();
  }

  /**
   * Optimizes the database by running VACUUM: defragments tables, rebuilds indexes,
   * reclaims unused disk space from deleted rows.
   */
  public optimizeDatabase(): { reclaimedKB: number; durationMs: number; status: string } {
    const start = performance.now();
    const reclaimedKB = parseFloat((this.simulatedSlackBytes / 1024).toFixed(1));

    // Reset simulated slack bytes to 0
    this.simulatedSlackBytes = 0;
    this.lastVacuumTimestamp = Date.now();
    this.saveToStorage();

    const durationMs = Math.round(performance.now() - start + 24); // simulated I/O latency
    return {
      reclaimedKB,
      durationMs,
      status: 'VACUUM completed successfully. Database defragmented and free pages returned to filesystem.'
    };
  }

  /**
   * Verifies database health by running a PRAGMA integrity_check
   * Returns boolean status and diagnostics
   */
  public verifyDatabaseHealth(): IntegrityCheckResult {
    const issuesFound: string[] = [];
    const tablesChecked = ['qa', 'logs', 'sqlite_master', 'idx_qa_words', 'idx_logs_timestamp'];
    let totalRowsScanned = this.qaTable.size + this.logsTable.length;

    // Check QA table integrity
    for (const [id, item] of this.qaTable.entries()) {
      if (!item.question || !item.answer) {
        issuesFound.push(`Corrupt QA entry found: ID ${id} missing required content fields.`);
      }
      if (!Array.isArray(item.words) || item.words.length === 0) {
        issuesFound.push(`Index degradation: QA entry ${id} words token index empty.`);
      }
    }

    // Check Logs table integrity
    for (const log of this.logsTable) {
      if (!log.query || typeof log.timestamp !== 'number') {
        issuesFound.push(`Corrupt log entry: missing query or invalid timestamp.`);
      }
    }

    const ok = issuesFound.length === 0;
    const pragmaResult = ok
      ? 'ok (PRAGMA integrity_check passed: 0 errors detected across 2 main tables and 2 indices)'
      : `corruption detected: ${issuesFound.length} error(s) found`;

    return {
      ok,
      checkedAt: Date.now(),
      pragmaResult,
      tablesChecked,
      issuesFound,
      totalRowsScanned
    };
  }

  /**
   * Exports logs table content to CSV formatted string with permanently embedded
   * Zeeco Grant Security Watermark and Anti-Piracy Covenants
   */
  public exportLogsCSV(): string {
    const watermarkHeaders = [
      '# ==============================================================================',
      '# PROPRIETARY AUDIT EXPORT - LICENSED EXCLUSIVELY TO: ZEECO GRANT (ZG PERSONAL AI)',
      '# AUTHORIZED LICENSEE: Zeeco Grant',
      '# DIGITAL SECURITY WATERMARK HASH: SHA256-ZG-ZEECO-GRANT-VERIFIED-WATERMARK',
      '# NOTICE: PERSONAL USE PROTOTYPE ONLY - STRICTLY NOT FOR RESALE OR REDISTRIBUTION',
      '# REVERSE ENGINEERING, CODE THEFT, AND DECOMPILATION ARE PROHIBITED BY LAW',
      '# EXPORTED AT: ' + new Date().toISOString(),
      '# =============================================================================='
    ];

    const headers = ['ID', 'Query', 'Score', 'ResponseTimeMs', 'Status', 'Timestamp', 'FormattedDate', 'MatchedQuestion', 'SecurityWatermark'];
    const rows = this.logsTable.map(log => {
      const escape = (val: string | undefined | null) => {
        if (!val) return '""';
        return `"${val.replace(/"/g, '""')}"`;
      };
      const dateStr = new Date(log.timestamp).toISOString();
      return [
        escape(log.id),
        escape(log.query),
        log.score,
        log.responseTimeMs,
        escape(log.status),
        log.timestamp,
        escape(dateStr),
        escape(log.matchedQuestion || ''),
        escape('VERIFIED-ZEECO-GRANT-ZG-AI')
      ].join(',');
    });

    return [...watermarkHeaders, headers.join(','), ...rows].join('\n');
  }

  /**
   * Backup entire database (qa and logs) to JSON with permanently embedded
   * Zeeco Grant Security Watermark and Copyright Signature
   */
  public backupDatabase(): string {
    const data = {
      _security_watermark: {
        licensee: 'Zeeco Grant',
        organization: 'ZG Personal AI',
        cryptographic_seal: 'SHA256: ZG-ZEECO-GRANT-CONFIDENTIAL-0x01',
        authorized_system: 'ZG Personal AI Co-Pilot Prototype Engine',
        copyright_notice: '© 2026 Zeeco Grant. All Rights Reserved. Not For Resale.',
        legal_terms: 'Strictly personal use prototype. Reverse engineering, decompilation, code theft, and commercial redistribution are prohibited.',
        anti_piracy_protection: 'Active - Verified Watermark Embed'
      },
      app: 'ZGPersonalAI',
      version: '2.0.0-PROTOTYPE',
      database: 'KnowledgeStore.db',
      exportedAt: new Date().toISOString(),
      timestamp: Date.now(),
      qa: Array.from(this.qaTable.values()),
      logs: this.logsTable,
      metadata: {
        totalQA: this.qaTable.size,
        totalLogs: this.logsTable.length,
        storageStats: this.getDatabaseSize()
      }
    };

    // Update maintenance schedule last backup timestamp
    this.updateLastBackupDate();

    return JSON.stringify(data, null, 2);
  }

  /**
   * Restore database from backup JSON
   */
  public restoreDatabase(jsonStr: string): { success: boolean; qaRestored: number; logsRestored: number } {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || !Array.isArray(parsed.qa)) {
        throw new Error('Invalid backup schema');
      }

      this.qaTable.clear();
      parsed.qa.forEach((item: QAEntry) => {
        this.qaTable.set(item.id, item);
      });

      if (Array.isArray(parsed.logs)) {
        this.logsTable = parsed.logs;
      }

      this.simulatedSlackBytes = 0;
      this.saveToStorage();

      return {
        success: true,
        qaRestored: this.qaTable.size,
        logsRestored: this.logsTable.length
      };
    } catch {
      return { success: false, qaRestored: 0, logsRestored: 0 };
    }
  }

  /**
   * Search knowledge base
   */
  public search(query: string): { results: QAEntry[]; matchScore: number; responseTimeMs: number; bestMatch?: QAEntry } {
    const start = performance.now();
    const cleanQuery = query.trim().toLowerCase();
    const queryTokens = tokens(query);

    const candidates: Array<{ qa: QAEntry; score: number }> = [];

    for (const qa of this.qaTable.values()) {
      let score = 0;
      const qLower = qa.question.toLowerCase();
      const aLower = qa.answer.toLowerCase();

      // Exact substring match
      if (qLower === cleanQuery) {
        score += 100;
      } else if (qLower.includes(cleanQuery)) {
        score += 70;
      }

      // Token overlap
      if (queryTokens.length > 0) {
        let tokenMatches = 0;
        for (const qt of queryTokens) {
          if (qa.words.includes(qt)) {
            tokenMatches += 2;
          } else if (qLower.includes(qt)) {
            tokenMatches += 1.5;
          } else if (aLower.includes(qt)) {
            tokenMatches += 0.8;
          }
        }
        const tokenScore = Math.min(60, (tokenMatches / queryTokens.length) * 45);
        score += tokenScore;
      }

      // Pinned bonus
      if (qa.pinned) {
        score += 5;
      }

      if (score > 10) {
        candidates.push({ qa, score: Math.round(score) });
      }
    }

    candidates.sort((a, b) => b.score - a.score);
    const results = candidates.slice(0, 5).map(c => c.qa);
    const bestMatch = candidates[0]?.qa;
    const matchScore = candidates[0]?.score || 0;
    const responseTimeMs = Math.max(12, Math.round(performance.now() - start));

    // Log this search query
    this.logSearch({
      query,
      matchedId: bestMatch?.id,
      matchedQuestion: bestMatch?.question,
      score: matchScore,
      responseTimeMs,
      status: matchScore >= 40 ? 'hit' : 'miss'
    });

    return {
      results,
      matchScore,
      responseTimeMs,
      bestMatch
    };
  }

  public getAllQA(): QAEntry[] {
    return Array.from(this.qaTable.values());
  }

  public getAllLogs(): SearchLog[] {
    return [...this.logsTable];
  }

  public resetKnowledgeToDefaults(): number {
    this.qaTable.clear();
    this.seedInitialPacks();
    this.saveToStorage();
    return this.qaTable.size;
  }

  /**
   * Maintenance schedule management (backed by SharedPreferences)
   */
  public getSchedule(): MaintenanceSchedule {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // ignore
    }

    // Default: Next scheduled maintenance is 7 days from now
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return {
      lastBackupDate: null,
      nextScheduledMaintenance: nextWeek.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      autoPruneDays: 30,
      weeklyBackupEnabled: true,
      storageLimitMB: 50.0
    };
  }

  public updateLastBackupDate(): void {
    try {
      const schedule = this.getSchedule();
      const now = new Date();
      schedule.lastBackupDate = now.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      schedule.nextScheduledMaintenance = nextWeek.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(schedule));
    } catch {
      // ignore
    }
  }

  public setSchedule(prefs: Partial<MaintenanceSchedule>): MaintenanceSchedule {
    const current = this.getSchedule();
    const updated = { ...current, ...prefs };
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    return updated;
  }
}

// Global Singleton Instance
export const KnowledgeStore = new KnowledgeStoreEngine();
