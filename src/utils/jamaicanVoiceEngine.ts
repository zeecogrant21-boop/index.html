/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Zeeco Grant (ZG Personal AI)
 */

export type AIPersonaId = 'brain' | 'copilot' | 'sentinel' | 'factfinder';

export interface AIPersona {
  id: AIPersonaId;
  aiNumber: 1 | 2 | 3 | 4;
  name: string;
  role: string;
  dialectStyle: string;
  defaultGreetingPatois: string;
  defaultGreetingEnglish: string;
  pitch: number;
  rate: number;
  chimeFrequencyHz: number;
  color: {
    text: string;
    badge: string;
    border: string;
  };
}

export const AI_PERSONAS: Record<AIPersonaId, AIPersona> = {
  brain: {
    id: 'brain',
    aiNumber: 1,
    name: 'ZG Main Brain Core',
    role: 'Supreme Executive Commander',
    dialectStyle: 'Authoritative, Supreme Executive Jamaican Dialect',
    defaultGreetingPatois:
      'Big up Commander Zeeco Grant! Di Main Brain a supreme executive power. Every single neural synapse lock down, cognitive matrix pure strength. A supreme executive order dis, ready fi synthesize any complex task!',
    defaultGreetingEnglish:
      'Greetings Commander Zeeco Grant. I am the supreme Main Brain. All executive cognitive matrices are synchronized and awaiting your high-level strategic directives.',
    pitch: 0.85,
    rate: 0.95,
    chimeFrequencyHz: 440,
    color: {
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
      border: 'border-amber-500/60'
    }
  },
  copilot: {
    id: 'copilot',
    aiNumber: 2,
    name: 'ZG Co-Pilot Suite',
    role: 'Second in Command (Tactical Field Officer)',
    dialectStyle: 'Lively, Agile Tactical Jamaican Patois Dialect',
    defaultGreetingPatois:
      'Wah gwaan Commander Zeeco Grant! Second in Command ready fi roll out! Any math problem, question bout Jamaica or coding, mi deh ya fi execute wid speed and precision right now!',
    defaultGreetingEnglish:
      'Greetings Commander Zeeco Grant. Co-Pilot, Second in Command, ready for action. Reporting directly to the Main Brain to execute all tactical user tasks.',
    pitch: 1.05,
    rate: 1.05,
    chimeFrequencyHz: 587,
    color: {
      text: 'text-cyan-400',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
      border: 'border-cyan-500/60'
    }
  },
  sentinel: {
    id: 'sentinel',
    aiNumber: 3,
    name: 'ZG Sentinel Guardian',
    role: 'On-Board Security & Systems Efficiency Engine',
    dialectStyle: 'Hyper-Vigilant, Impenetrable Anti-Theft Protector Dialect',
    defaultGreetingPatois:
      'Hold on deh! Sentinel Security a sweep di system right now! SHA256 Zeeco Grant watermark 100% valid. Fifty Million Dollar legal fortress active—no thief, hacker or reverse engineer caan touch dis system!',
    defaultGreetingEnglish:
      'Security alert verified. Sentinel Security Core active. Autonomous random security sweeps operational, $50M liquidated damages clause enforced, zero vulnerabilities detected.',
    pitch: 0.9,
    rate: 1.0,
    chimeFrequencyHz: 330,
    color: {
      text: 'text-rose-400',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
      border: 'border-rose-500/60'
    }
  },
  factfinder: {
    id: 'factfinder',
    aiNumber: 4,
    name: 'ZG FactFinder Oracle',
    role: 'Decisive Instant Retrieval & Truth Engine',
    dialectStyle: 'Sharp, Instant Truth, Decisive Jamaican Factual Dialect',
    defaultGreetingPatois:
      'Hear di truth straight! FactFinder Oracle pull up di exact answer inna four milliseconds! Thirty-three master packs permanent inna memory, zero delay, truth decisive every single time!',
    defaultGreetingEnglish:
      'FactFinder Oracle online. Sub-millisecond instant retrieval operational across all 33 master packs. Serving verified, conflict-free truth to all AI cores without latency.',
    pitch: 1.1,
    rate: 1.1,
    chimeFrequencyHz: 659,
    color: {
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      border: 'border-emerald-500/60'
    }
  }
};

/**
 * Universal Jamaican Voice & Speech Engine
 * Coordinates Web Speech API Synthesis and authentic dialect phonetics across all 4 AIs
 */
export class JamaicanVoiceEngine {
  private static currentlySpeaking: boolean = false;
  private static activeAudioContext: AudioContext | null = null;

  /**
   * Play futuristic cyber activation chime using Web Audio API
   */
  public static playCyberChime(freqHz: number = 520): void {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.activeAudioContext) {
        this.activeAudioContext = new AudioCtx();
      }

      if (this.activeAudioContext.state === 'suspended') {
        this.activeAudioContext.resume();
      }

      const osc = this.activeAudioContext.createOscillator();
      const gain = this.activeAudioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqHz, this.activeAudioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqHz * 1.5, this.activeAudioContext.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.activeAudioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.activeAudioContext.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.activeAudioContext.destination);

      osc.start();
      osc.stop(this.activeAudioContext.currentTime + 0.25);
    } catch {
      // AudioContext may require user gesture on some browsers
    }
  }

  /**
   * Convert arbitrary text or math solution into authentic Jamaican Patois phrasing
   * tailored to the specific AI's persona
   */
  public static toJamaicanPatois(text: string, personaId: AIPersonaId): string {
    const persona = AI_PERSONAS[personaId];

    // Core dialect replacements
    let patois = text
      .replace(/\bthe\b/gi, 'di')
      .replace(/\bthis\b/gi, 'dis')
      .replace(/\bthat\b/gi, 'dat')
      .replace(/\bthere\b/gi, 'deh')
      .replace(/\bwith\b/gi, 'wid')
      .replace(/\bthem\b/gi, 'dem')
      .replace(/\bthey\b/gi, 'dem')
      .replace(/\btheir\b/gi, 'dem')
      .replace(/\bis the\b/gi, 'a di')
      .replace(/\bare the\b/gi, 'a di')
      .replace(/\bwas a\b/gi, 'did a')
      .replace(/\bwere\b/gi, 'did deh')
      .replace(/\bhave\b/gi, 'have')
      .replace(/\bwhat is\b/gi, 'wah a')
      .replace(/\bhow is\b/gi, 'how dem calculate')
      .replace(/\bvery\b/gi, 'proper')
      .replace(/\bgood\b/gi, 'criss')
      .replace(/\bgreat\b/gi, 'nuff respect')
      .replace(/\bcalculate\b/gi, 'work out')
      .replace(/\bproblem\b/gi, 'matter')
      .replace(/\bmoney\b/gi, 'cash')
      .replace(/\bchildren\b/gi, 'pickney');

    // Add persona-specific framing
    if (personaId === 'brain') {
      return `[Main Brain Commander • Jamaican Directive]: Respect Commander Zeeco Grant! ${patois} Everything locked and sealed under executive protocol!`;
    } else if (personaId === 'copilot') {
      return `[Co-Pilot 2nd in Command • Patwa Reflex]: Hear wah gwaan Commander! ${patois} Mi take care of dis right now wid precision!`;
    } else if (personaId === 'sentinel') {
      return `[Sentinel Guardian • Security Dialect]: Hold on deh! ${patois} Sentinel a keep watch, zero threat detected, watermark verified!`;
    } else {
      return `[FactFinder Oracle • Decisive Truth]: Straight facts, no hesitation! ${patois} Verified permanent inna memory!`;
    }
  }

  /**
   * Speak text out loud using Web Speech API with persona settings
   */
  public static speak(
    personaId: AIPersonaId,
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }

    // Stop ongoing speech
    window.speechSynthesis.cancel();

    const persona = AI_PERSONAS[personaId];
    this.playCyberChime(persona.chimeFrequencyHz);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate;

    // Pick best available voice if present
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US')) || voices[0];
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      this.currentlySpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentlySpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentlySpeaking = false;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  }

  /**
   * Stop active speech synthesis
   */
  public static stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentlySpeaking = false;
    }
  }

  public static isSpeaking(): boolean {
    return this.currentlySpeaking;
  }
}
