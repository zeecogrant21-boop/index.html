/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { QuadAIDispatcher } from './quadAIDispatcher';

describe('QuadAIDispatcher Name Attribution & Routing Tests', () => {
  it('detects when Main Brain is addressed by name', () => {
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Main Brain, what is 2+2?'), 'brain');
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Commander, give me an update'), 'brain');
  });

  it('detects when Co-Pilot is addressed by name', () => {
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Co-Pilot, what is 2+2?'), 'copilot');
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Second in Command, wah gwaan?'), 'copilot');
  });

  it('detects when Sentinel Security is addressed by name', () => {
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Sentinel, run a security check'), 'sentinel');
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Security AI, is the system clean?'), 'sentinel');
  });

  it('detects when FactFinder Oracle is addressed by name', () => {
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey FactFinder, who was Queen Nanny?'), 'factfinder');
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey Oracle, what is 2+2?'), 'factfinder');
  });

  it('detects when All 4 AIs are addressed', () => {
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey AIs, what is the answer for 2+2?'), 'all_four');
    assert.strictEqual(QuadAIDispatcher.detectAddressedAI('Hey all 4 AIs, report in'), 'all_four');
  });

  it('generates response by name for 2+2 with both English and Patois dialect', () => {
    const res = QuadAIDispatcher.generateResponseForAI('brain', 'Hey Main Brain, what is 2+2?');
    assert.strictEqual(res.aiName, 'ZG Main Brain Core');
    assert.strictEqual(res.mathematicalResult, 4);
    assert.ok(res.salutation.includes('ZG Main Brain Core'));
    assert.ok(res.answerText.includes('4'));
    assert.ok(res.patoisDialectText.includes('ZG Main Brain Core'));
    assert.ok(res.patoisDialectText.includes('4'));
  });

  it('returns responses from all 4 AIs by their individual names when asked in council mode', () => {
    const responses = QuadAIDispatcher.processQuery('Hey AIs, what is 2+2?');
    assert.strictEqual(responses.length, 4);

    // AI 1
    assert.strictEqual(responses[0].aiId, 'brain');
    assert.ok(responses[0].answerText.includes('ZG Main Brain Core'));

    // AI 2
    assert.strictEqual(responses[1].aiId, 'copilot');
    assert.ok(responses[1].answerText.includes('ZG Co-Pilot'));

    // AI 3
    assert.strictEqual(responses[2].aiId, 'sentinel');
    assert.ok(responses[2].answerText.includes('ZG Sentinel Guardian Core'));

    // AI 4
    assert.strictEqual(responses[3].aiId, 'factfinder');
    assert.ok(responses[3].answerText.includes('ZG FactFinder Oracle'));
  });
});
