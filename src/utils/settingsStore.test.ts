/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SettingsStore, DEFAULT_SETTINGS } from './settingsStore';

test('SettingsStore returns default settings', () => {
  const settings = SettingsStore.getSettings();
  assert.equal(settings.licenseeName, 'Zeeco Grant');
  assert.equal(settings.storageThresholdMB, 50.0);
  assert.equal(settings.autoPruneDays, 30);
  assert.equal(settings.defaultDialect, 'english');
});

test('SettingsStore updates settings partially and persists', () => {
  SettingsStore.updateSettings({
    defaultDialect: 'patois',
    storageThresholdMB: 45.0,
    themeAccent: 'neon-emerald'
  });

  const updated = SettingsStore.getSettings();
  assert.equal(updated.defaultDialect, 'patois');
  assert.equal(updated.storageThresholdMB, 45.0);
  assert.equal(updated.themeAccent, 'neon-emerald');
  assert.equal(updated.licenseeName, 'Zeeco Grant'); // unchanged
});

test('SettingsStore resetToDefaults restores factory config', () => {
  SettingsStore.resetToDefaults();
  const res = SettingsStore.getSettings();
  assert.equal(res.defaultDialect, DEFAULT_SETTINGS.defaultDialect);
  assert.equal(res.themeAccent, DEFAULT_SETTINGS.themeAccent);
});
