/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { KnowledgeStore, tokens } from './databaseStore';
import { SmartMathEngine } from './mathSolver';
import { SmartClassifier } from './categoryClassifier';

test('tokens function tokenizes and filters text properly', () => {
  const result = tokens('What is the national fruit of Jamaica?');
  assert.ok(result.includes('what'));
  assert.ok(result.includes('national'));
  assert.ok(result.includes('fruit'));
  assert.ok(result.includes('jamaica'));
  assert.ok(!result.includes('of')); // filtered out short words <= 2 chars
});

test('bulkInsertPinned adds entries to KnowledgeStore', () => {
  const initialCount = KnowledgeStore.getAllQA().length;
  const inserted = KnowledgeStore.bulkInsertPinned([
    {
      question: 'Test Unit Question Alpha',
      answer: 'Test Unit Answer Alpha',
      category: 'Testing'
    }
  ]);
  assert.equal(inserted, 1);
  assert.equal(KnowledgeStore.getAllQA().length, initialCount + 1);
});

test('clearOldLogs deletes logs older than threshold and returns count', () => {
  const now = Date.now();
  // Log a recent search
  KnowledgeStore.logSearch({
    query: 'Recent test query',
    score: 95,
    responseTimeMs: 20,
    status: 'hit'
  });

  // clearOldLogs with 30 days should delete seeded logs older than 30 days
  const deletedCount = KnowledgeStore.clearOldLogs(30);
  assert.ok(deletedCount >= 0, 'deletedCount should be non-negative');

  // Any remaining logs should all be newer than 30 days
  const threshold = now - 30 * 86400 * 1000;
  const remainingLogs = KnowledgeStore.getAllLogs();
  for (const log of remainingLogs) {
    assert.ok(log.timestamp >= threshold - 1000, `Log ${log.id} should be newer than 30 days`);
  }
});

test('Database stats computes MB and flags warning when > 50MB', () => {
  const statsNormal = KnowledgeStore.getDatabaseSize();
  assert.ok(statsNormal.totalSizeMB >= 0);
  assert.ok(typeof statsNormal.qaTableSizeKB === 'number');
  assert.ok(typeof statsNormal.logsTableSizeKB === 'number');

  // Test simulated high memory (>50MB critical threshold)
  KnowledgeStore.setSimulatedOverheadMB(55.0);
  const statsHigh = KnowledgeStore.getDatabaseSize();
  assert.equal(statsHigh.isCritical, true);
  assert.equal(statsHigh.status, 'critical');

  // Test optimizeDatabase (VACUUM) reclaims space
  const vacuumResult = KnowledgeStore.optimizeDatabase();
  assert.ok(vacuumResult.reclaimedKB > 0);
  const statsCleaned = KnowledgeStore.getDatabaseSize();
  assert.equal(statsCleaned.isCritical, false);
});

test('verifyDatabaseHealth runs PRAGMA integrity_check', () => {
  const health = KnowledgeStore.verifyDatabaseHealth();
  assert.equal(health.ok, true);
  assert.ok(health.pragmaResult.includes('ok'));
  assert.ok(health.tablesChecked.includes('qa'));
  assert.ok(health.tablesChecked.includes('logs'));
});

test('exportLogsCSV outputs valid CSV with header, watermark and content', () => {
  const csv = KnowledgeStore.exportLogsCSV();
  assert.ok(csv.includes('ZEECO GRANT'));
  assert.ok(csv.includes('ID,Query,Score,ResponseTimeMs,Status,Timestamp,FormattedDate,MatchedQuestion'));
});

test('SmartMathEngine solves arithmetic and percentages', () => {
  const eval1 = SmartMathEngine.evaluateArithmetic('15% of 2500');
  assert.equal(eval1.value, 375);

  const eval2 = SmartMathEngine.evaluateArithmetic('sqrt(144) + 2^3');
  assert.equal(eval2.value, 20);
});

test('SmartMathEngine solves linear and quadratic equations', () => {
  const lin = SmartMathEngine.solveLinear('2x + 10 = 30');
  assert.equal(lin.x, 10);

  const quad = SmartMathEngine.solveQuadratic(1, -5, 6);
  assert.deepEqual(quad.roots, [3, 2]);
});

test('SmartMathEngine calculates Jamaican GCT (15%)', () => {
  const gct = SmartMathEngine.calculateGCT(1000, 0.15);
  assert.equal(gct.subtotal, 1000);
  assert.equal(gct.gctAmount, 150);
  assert.equal(gct.grandTotal, 1150);
});

test('SmartClassifier categorizes text correctly', () => {
  const res1 = SmartClassifier.classify('Who is Nanny of the Maroons and when was independence?');
  assert.equal(res1.category.id, 'history-heroes');

  const res2 = SmartClassifier.classify('What are the 14 parishes and capitals of Jamaica?');
  assert.equal(res2.category.id, 'parishes-geography');
});
