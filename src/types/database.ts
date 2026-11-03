/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  words: string[];
  pinned: boolean;
  packSource: string;
  category: string;
  created: number;
}

export interface SearchLog {
  id: string;
  query: string;
  matchedId?: string;
  matchedQuestion?: string;
  score: number;
  responseTimeMs: number;
  timestamp: number;
  status: 'hit' | 'miss' | 'fallback';
}

export interface DatabaseStats {
  totalSizeMB: number;
  qaCount: number;
  logsCount: number;
  qaTableSizeKB: number;
  logsTableSizeKB: number;
  freeSpaceReclaimedKB: number;
  fragmentationRatio: number;
  isWarning: boolean; // true if > 30MB or > 50MB
  isCritical: boolean; // true if > 50MB
  status: 'healthy' | 'warning' | 'critical';
  lastOptimizedAt: number | null;
}

export interface MaintenanceSchedule {
  lastBackupDate: string | null;
  nextScheduledMaintenance: string;
  autoPruneDays: number;
  weeklyBackupEnabled: boolean;
  storageLimitMB: number;
}

export interface IntegrityCheckResult {
  ok: boolean;
  checkedAt: number;
  pragmaResult: string;
  tablesChecked: string[];
  issuesFound: string[];
  totalRowsScanned: number;
}

export interface ParishInfo {
  name: string;
  capital: string;
  county: 'Cornwall' | 'Middlesex' | 'Surrey';
  areaSqKm: number;
  populationApprox: string;
  famousFor: string;
  history: string;
  notableAttractions: string[];
}
