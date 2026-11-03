/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

export interface AppSettings {
  // Co-Pilot Preferences
  defaultDialect: 'english' | 'patois';
  responseTone: 'academic' | 'concise' | 'island_copilot';
  searchSensitivity: number; // 20 - 80
  autoSpeakResponse: boolean;
  prioritizePinnedPacks: boolean;

  // Database & Maintenance Preferences
  autoPruneDays: number; // 7, 14, 30, 60
  storageThresholdMB: number; // default 50.0
  autoVacuumOnStartup: boolean;
  weeklyAutoBackup: boolean;
  preferredExportFormat: 'json' | 'csv';

  // Security & Licensee
  licenseeName: string;
  licenseeEmail: string;
  signatureHash: string;
  watermarkIntensity: 'subtle' | 'medium' | 'pronounced';
  antiPiracyAlerts: boolean;

  // Futuristic Interface & Aesthetics
  themeAccent: 'neon-emerald' | 'solar-gold' | 'cyber-cyan' | 'midnight-violet';
  hudGlowEffects: boolean;
  tacticalScanlines: boolean;
  temperatureUnit: 'C' | 'F';
  soundFeedbackEnabled: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  defaultDialect: 'english',
  responseTone: 'academic',
  searchSensitivity: 35,
  autoSpeakResponse: false,
  prioritizePinnedPacks: true,

  autoPruneDays: 30,
  storageThresholdMB: 50.0,
  autoVacuumOnStartup: true,
  weeklyAutoBackup: true,
  preferredExportFormat: 'json',

  licenseeName: 'Zeeco Grant',
  licenseeEmail: 'zeeco.grant@personal.ai',
  signatureHash: 'SHA256-ZG-ZEECO-GRANT-VERIFIED',
  watermarkIntensity: 'subtle',
  antiPiracyAlerts: true,

  themeAccent: 'solar-gold',
  hudGlowEffects: true,
  tacticalScanlines: false,
  temperatureUnit: 'C',
  soundFeedbackEnabled: false
};

const SETTINGS_KEY = 'zg_personal_ai_app_settings_v2';

export class SettingsStoreEngine {
  private currentSettings: AppSettings;

  constructor() {
    this.currentSettings = this.load();
  }

  public getSettings(): AppSettings {
    return { ...this.currentSettings };
  }

  public updateSettings(partial: Partial<AppSettings>): AppSettings {
    this.currentSettings = { ...this.currentSettings, ...partial };
    this.save();
    return { ...this.currentSettings };
  }

  public resetToDefaults(): AppSettings {
    this.currentSettings = { ...DEFAULT_SETTINGS };
    this.save();
    return { ...this.currentSettings };
  }

  private load(): AppSettings {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return { ...DEFAULT_SETTINGS };
      }
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      // fallback
    }
    return { ...DEFAULT_SETTINGS };
  }

  private save() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.currentSettings));
    } catch {
      // ignore
    }
  }
}

export const SettingsStore = new SettingsStoreEngine();
