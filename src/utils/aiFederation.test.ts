/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SentinelSecurityAI, FactFinderOracleAI, AIFederationCoordinator } from './aiFederation';

describe('AI Federation & Specialized Subsystems Tests', () => {
  it('AIFederationCoordinator returns exactly 4 specialized AIs with dedicated roles', () => {
    const nodes = AIFederationCoordinator.getFourAINodes();
    assert.strictEqual(nodes.length, 4, 'Must have exactly 4 specialized AI nodes');

    // AI 1: Main Brain
    assert.strictEqual(nodes[0].aiNumber, 1);
    assert.strictEqual(nodes[0].roleTitle, 'Supreme Executive Commander');

    // AI 2: Co-Pilot
    assert.strictEqual(nodes[1].aiNumber, 2);
    assert.ok(nodes[1].roleTitle.includes('Second in Command'));

    // AI 3: Sentinel Guardian Security & Efficiency
    assert.strictEqual(nodes[2].aiNumber, 3);
    assert.ok(nodes[2].roleTitle.includes('Security'));

    // AI 4: FactFinder Oracle Instant Retrieval
    assert.strictEqual(nodes[3].aiNumber, 4);
    assert.ok(nodes[3].roleTitle.includes('Decisive Instant Retrieval'));
  });

  it('SentinelSecurityAI executes random security sweep and verifies Zeeco Grant watermark', () => {
    const report = SentinelSecurityAI.executeSecuritySweep('RANDOM_AUTONOMOUS');
    assert.ok(report.sweepId.startsWith('swp_'));
    assert.strictEqual(report.watermarkStatus, 'VERIFIED_VALID');
    assert.strictEqual(report.watermarkHash, 'SHA256-ZG-ZEECO-GRANT-VERIFIED');
    assert.strictEqual(report.antiPiracyCovenantsEnforced, true);
    assert.strictEqual(report.liquidatedDamagesEnforced, true);
    assert.ok(report.memoryEfficiencyScore >= 98);
    assert.strictEqual(report.threatsNeutralized, 0);
  });

  it('SentinelSecurityAI maintains sweep history and subscriber notifications', () => {
    let notified = false;
    const unsub = SentinelSecurityAI.subscribeToSweeps((r) => {
      notified = true;
    });

    const report = SentinelSecurityAI.executeSecuritySweep('MANUAL_DEEP');
    assert.strictEqual(notified, true);
    unsub();

    const history = SentinelSecurityAI.getSweepHistory();
    assert.ok(history.length >= 2);
  });

  it('FactFinderOracleAI retrieves decisive answers instantly for factual questions', () => {
    const res = FactFinderOracleAI.retrieveDecisively('Who was Queen Nanny of the Maroons?');
    assert.ok(res.decisiveAnswer.length > 20);
    assert.strictEqual(res.isMathematical, false);
    assert.strictEqual(res.verifiedBy, 'AI #4: FactFinder Oracle (Decisive Retrieval Engine)');
    assert.ok(res.retrievalLatencyMs >= 0);
  });

  it('FactFinderOracleAI handles mathematical queries decisively', () => {
    const res = FactFinderOracleAI.retrieveDecisively('2+2');
    assert.strictEqual(res.isMathematical, true);
    assert.strictEqual(res.mathResult, 4);
    assert.ok(res.decisiveAnswer.includes('4'));
  });
});
