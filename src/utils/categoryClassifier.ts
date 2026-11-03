/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  color: string;
  iconName: string;
}

export const SMART_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'symbols-heritage',
    name: 'National Symbols & Heritage',
    description: 'Ackee, Doctor Bird, Blue Mahoe, Flag, Motto, National Anthem and Coat of Arms',
    keywords: ['flag', 'bird', 'flower', 'motto', 'fruit', 'ackee', 'doctor bird', 'streamertail', 'lignum vitae', 'blue mahoe', 'out of many', 'anthem', 'symbol'],
    color: 'emerald',
    iconName: 'Award'
  },
  {
    id: 'history-heroes',
    name: 'History & National Heroes',
    description: 'Independence 1962, Morant Bay Rebellion, Sam Sharpe, Nanny, Marcus Garvey, Tacky, Rodney',
    keywords: ['history', 'hero', 'heroes', 'maroon', 'nanny', 'bogle', 'garvey', 'sharpe', 'bustamante', 'manley', '1962', '1865', '1831', 'rebellion', 'independence', 'windrush', 'tacky', 'columbus'],
    color: 'amber',
    iconName: 'Crown'
  },
  {
    id: 'culture-music',
    name: 'Culture, Music & Patois',
    description: 'Reggae, Dancehall, Ska, Bob Marley, Miss Lou, Patois dialect, Jonkonnu, Sumfest',
    keywords: ['reggae', 'marley', 'music', 'dancehall', 'ska', 'mento', 'patois', 'patwa', 'miss lou', 'festival', 'culture', 'dance', 'ndtc', 'sumfest', 'edna manley', 'kumina'],
    color: 'purple',
    iconName: 'Music'
  },
  {
    id: 'parishes-geography',
    name: 'Parishes & Geography',
    description: '14 Parishes, Blue Mountain Peak, Cockpit Country, Dunn’s River, Negril, Capitals',
    keywords: ['parish', 'parishes', 'kingston', 'portland', 'st ann', 'trelawny', 'st james', 'montego bay', 'manchester', 'mandeville', 'clarendon', 'st catherine', 'spanish town', 'black river', 'negril', 'cockpit country', 'mountain', 'river', 'county', 'cornwall', 'surrey', 'middlesex'],
    color: 'cyan',
    iconName: 'MapPin'
  },
  {
    id: 'government-economy',
    name: 'Government & Economy',
    description: 'Parliament, Prime Minister, Governor-General, Bauxite, Tourism, Coffee, GCT, Central Bank (BOJ)',
    keywords: ['government', 'parliament', 'prime minister', 'senate', 'economy', 'bauxite', 'tourism', 'coffee', 'gct', 'tax', 'currency', 'boj', 'dollar', 'gdp', 'remittances', 'frome'],
    color: 'blue',
    iconName: 'Building'
  },
  {
    id: 'math-science',
    name: 'Mathematics & Science',
    description: 'Arithmetic, linear/quadratic equations, statistical analysis, geometry, scientific formulas',
    keywords: ['calculate', 'solve', 'equation', 'math', 'algebra', 'quadratic', 'square root', 'variance', 'mean', 'median', 'statistics', 'percentage', 'formula'],
    color: 'indigo',
    iconName: 'Calculator'
  },
  {
    id: 'weather-climate',
    name: 'Weather & Climate Tracking',
    description: 'Tropical climate, rainfall, hurricane tracking, barometric pressure, UV index, temperatures',
    keywords: ['weather', 'climate', 'temperature', 'rain', 'forecast', 'hurricane', 'storm', 'uv index', 'wind', 'humidity', 'radar'],
    color: 'teal',
    iconName: 'CloudSun'
  },
  {
    id: 'database-telemetry',
    name: 'Database & Maintenance',
    description: 'Storage size, VACUUM defragmentation, PRAGMA integrity check, search logs, backup schedule',
    keywords: ['database', 'sqlite', 'log', 'logs', 'storage', 'size', 'mb', 'vacuum', 'integrity', 'backup', 'prune', 'clear', 'storageguard'],
    color: 'rose',
    iconName: 'Database'
  }
];

/**
 * Smart Category Classifier: automatically tags any text, question, or query
 */
export class SmartClassifier {
  public static classify(text: string): { category: CategoryDefinition; confidence: number; allScores: Record<string, number> } {
    const clean = text.toLowerCase();
    const scores: Record<string, number> = {};

    let bestCategory = SMART_CATEGORIES[0];
    let highestScore = -1;

    for (const cat of SMART_CATEGORIES) {
      let score = 0;
      for (const kw of cat.keywords) {
        if (clean.includes(kw)) {
          // Exact match bonus or word boundary
          score += kw.length > 5 ? 3 : 2;
        }
      }
      scores[cat.id] = score;
      if (score > highestScore) {
        highestScore = score;
        bestCategory = cat;
      }
    }

    const confidence = highestScore > 0 ? Math.min(100, highestScore * 20) : 15;

    return {
      category: bestCategory,
      confidence,
      allScores: scores
    };
  }

  public static getCategoryById(id: string): CategoryDefinition {
    return SMART_CATEGORIES.find(c => c.id === id) || SMART_CATEGORIES[0];
  }
}
