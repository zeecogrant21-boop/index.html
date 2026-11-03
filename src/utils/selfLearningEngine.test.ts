/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { SelfLearningEngine } from './selfLearningEngine';

describe('SelfLearningEngine Tests', () => {
  beforeEach(() => {
    SelfLearningEngine.resetToFoundational();
  });

  it('initializes with foundational seed synapses covering simple to complex', () => {
    const synapses = SelfLearningEngine.getAllSynapses();
    assert.ok(synapses.length >= 7, 'Should have at least 7 foundational synapses');

    // Verify 2+2 is in the foundational seeds at Level 1 Elementary
    const twoPlusTwo = synapses.find(s => s.rawQuestion === '2+2');
    assert.ok(twoPlusTwo, 'Should contain 2+2 seed');
    assert.strictEqual(twoPlusTwo?.complexityLevel, 1);
    assert.strictEqual(twoPlusTwo?.solutionResult, 4);

    // Verify Level 3 linear equation is in foundational seeds
    const linear = synapses.find(s => s.complexityLevel === 3);
    assert.ok(linear, 'Should contain Level 3 linear equation');

    // Verify Level 4 quadratic equation is in foundational seeds
    const quad = synapses.find(s => s.complexityLevel === 4);
    assert.ok(quad, 'Should contain Level 4 quadratic equation');
  });

  it('ingests simple arithmetic "2+2" and reinforces existing pattern', () => {
    const res = SelfLearningEngine.ingestQuestion('Co-Pilot (Second in Command)', '2+2');
    assert.strictEqual(res.isNewPattern, false, '2+2 should match existing seed synapse');
    assert.strictEqual(res.synapse.solutionResult, 4);
    assert.strictEqual(res.synapse.complexityLevel, 1);
    assert.ok(res.synapse.reinforcementCount >= 6, 'Reinforcement count should increase');
  });

  it('ingests novel simple math like "7 * 9" and classifies as Level 1 Elementary', () => {
    const res = SelfLearningEngine.ingestQuestion('Co-Pilot (Second in Command)', '7 * 9');
    assert.strictEqual(res.isNewPattern, true);
    assert.strictEqual(res.synapse.solutionResult, 63);
    assert.strictEqual(res.synapse.complexityLevel, 1);
    assert.ok(res.synapse.problemFormat.includes('MULTIPLICATION'));
    assert.ok(res.crossSyncNotice.includes('Main Brain (Commander)'));
  });

  it('ingests intermediate percentages like "15% of 600" and classifies as Level 2', () => {
    const res = SelfLearningEngine.ingestQuestion('Main Brain (Commander)', '15% of 600');
    assert.strictEqual(res.isNewPattern, true);
    assert.strictEqual(res.synapse.complexityLevel, 2);
    assert.ok(res.synapse.solutionResult === 90 || String(res.synapse.solutionResult).includes('90'));
  });

  it('ingests algebraic equation like "solve 3x + 12 = 27" and solves for x = 5 at Level 3', () => {
    const res = SelfLearningEngine.ingestQuestion('Main Brain (Commander)', 'solve 3x + 12 = 27');
    assert.strictEqual(res.synapse.complexityLevel, 3);
    assert.strictEqual(res.synapse.solutionResult, 'x = 5');
    assert.ok(res.synapse.stepBreakdown.length >= 3);
  });

  it('reinforces all synapses during a simulated training epoch', () => {
    const epoch = SelfLearningEngine.reinforceAllSynapses();
    assert.ok(epoch.reinforcedCount > 0);
    assert.ok(epoch.newAvgConfidence >= 90);
  });

  it('exports synaptic matrix JSON with Zeeco Grant watermark and signature', () => {
    const jsonStr = SelfLearningEngine.exportSynapticMatrixJSON();
    assert.ok(jsonStr.includes('Zeeco Grant'));
    assert.ok(jsonStr.includes('SHA256-ZG-ZEECO-GRANT-VERIFIED'));
    assert.ok(jsonStr.includes('$50,000,000 USD'));

    const parsed = JSON.parse(jsonStr);
    assert.ok(Array.isArray(parsed.synapses));
    assert.strictEqual(parsed._metadata.owner, 'Zeeco Grant');
  });
});
