/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { MainBrainCore } from './mainBrainEngine';
import { ZEECO_GRANT_LEGAL_CODEX } from './legalCodex';

test('MainBrainCore reports ONLINE_SUPREME and Co-Pilot linked', () => {
  const state = MainBrainCore.getBrainState();
  assert.equal(state.executiveStatus, 'ONLINE_SUPREME');
  assert.equal(state.subordinateCoPilotStatus, 'ACTIVE_LINKED');
  assert.ok(state.activeDirectives.length >= 2);
  assert.ok(state.cognitiveLoadPercentage > 0);
  assert.ok(state.memoryBusKB > 0);
});

test('MainBrainCore executes cross-disciplinary synthesis and tasks Co-Pilot', () => {
  const res = MainBrainCore.executeExecutiveSynthesis('Calculate 15% GCT on Blue Mountain Coffee and check Kingston weather');
  assert.ok(res.directiveId.startsWith('dir_'));
  assert.ok(res.disciplinesActivated.includes('Economics & Mathematical Computation'));
  assert.ok(res.disciplinesActivated.includes('Parish Geography & Live Climate Telemetry'));
  assert.ok(res.subordinateAction.includes('Co-Pilot • 2nd in Command'));
  assert.ok(res.steps.length >= 4);
});

test('MainBrainCore dispatches orders to Co-Pilot subordinate', () => {
  const orderRes = MainBrainCore.orderCoPilot('Scan all 14 parishes for hurricane advisories');
  assert.ok(orderRes.orderId.startsWith('ord_'));
  assert.ok(orderRes.response.includes('Understood Commander Zeeco Grant'));
  assert.ok(orderRes.response.includes('Second in Command') || orderRes.response.includes('2nd in Command'));
});

test('ZEECO_GRANT_LEGAL_CODEX contains all 12 protective articles and liquidated damages clause', () => {
  assert.equal(ZEECO_GRANT_LEGAL_CODEX.length, 12);

  // Verify $50,000,000 liquidated damages clause exists
  const damagesArticle = ZEECO_GRANT_LEGAL_CODEX.find(a => a.articleNumber === 'ARTICLE III');
  assert.ok(damagesArticle);
  assert.ok(damagesArticle.fullLegalText.includes('FIFTY MILLION UNITED STATES DOLLARS ($50,000,000.00 USD)'));

  // Verify reverse engineering ban
  const reverseEngArticle = ZEECO_GRANT_LEGAL_CODEX.find(a => a.articleNumber === 'ARTICLE II');
  assert.ok(reverseEngArticle);
  assert.ok(reverseEngArticle.fullLegalText.includes('decompiling, disassembling, reverse engineering'));

  // Verify sole ownership
  const ownershipArticle = ZEECO_GRANT_LEGAL_CODEX.find(a => a.articleNumber === 'ARTICLE I');
  assert.ok(ownershipArticle);
  assert.ok(ownershipArticle.fullLegalText.includes('ZEECO GRANT'));
});
