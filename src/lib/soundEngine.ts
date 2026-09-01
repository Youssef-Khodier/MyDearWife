import { ChapterId } from '../types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];

  constructor() {
    // Initialized lazily on first user interaction
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.ambientGain = this.ctx.createGain();

      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
      this.ambientGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      this.ambientGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio API is not supported or was blocked:', e);
    }
  }

  public async resume() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.65;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setChapterMood(chapter: ChapterId) {
    if (!this.ctx || this.isMuted) return;
    this.updateAmbientChords(chapter);
  }

  private stopAmbientOscillators() {
    this.ambientOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.ambientOscillators = [];
  }

  private updateAmbientChords(chapter: ChapterId) {
    if (!this.ctx || !this.ambientGain) return;
    this.stopAmbientOscillators();

    // Subtle warm cinematic frequencies (in Hz) for each chapter mood
    let freqs: number[] = [];
    switch (chapter) {
      case 'intro':
      case 'room':
        // A gentle, mysterious peaceful A minor / F major bed
        freqs = [110.0, 164.81, 220.0, 329.63]; // A2, E3, A3, E4
        break;
      case 'hub':
        // Atmospheric floating chords
        freqs = [130.81, 196.0, 261.63, 392.0]; // C3, G3, C4, G4
        break;
      case 'memories':
        // Warm nostalgic C major 9
        freqs = [130.81, 164.81, 196.0, 246.94, 293.66]; // C3, E3, G3, B3, D4
        break;
      case 'messages':
        // Soft intimate F major 7
        freqs = [87.31, 130.81, 174.61, 220.0, 261.63]; // F2, C3, F3, A3, C4
        break;
      case 'future':
        // Dreamy cosmic ethereal D major / suspended
        freqs = [146.83, 220.0, 293.66, 440.0, 554.37]; // D3, A3, D4, A4, C#5
        break;
      case 'interlude':
        // Deep silence / minimal low hum
        freqs = [65.41, 130.81]; // C2, C3
        break;
      case 'cake':
      case 'final-letter':
        // Warm, glowing celebratory F# major / golden harmony
        freqs = [185.0, 277.18, 369.99, 440.0, 554.37]; // F#3, C#4, F#4, A4, C#5
        break;
    }

    const now = this.ctx.currentTime;
    freqs.forEach((f, i) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      // Soft sine/triangle blend with lowpass warmth
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      // Lowpass warmth filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(chapter === 'future' ? 900 : 500, now);

      // Gentle gain per oscillator
      const oscGain = 0.05 / (freqs.length * 0.7);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(oscGain, now + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc.start(now);
      this.ambientOscillators.push(osc);
    });
  }

  // Interaction Sound: Soft Bell / Sparkle Chime
  public playChime(freq: number = 587.33) {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  // Interaction Sound: Typewriter Key Click
  public playTypewriterClick() {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Short tactile click
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.055);
  }

  // Interaction Sound: Candle Blow Out Sound (White Noise Breath)
  public playCandleBlow() {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.72);
  }

  // Celebration Fanfare / Sparkle Burst
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    // Arpeggiated cheerful chords (C, E, G, B, D, G)
    const chord = [261.63, 329.63, 392.0, 493.88, 587.33, 783.99, 1046.5];
    const now = this.ctx.currentTime;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.1, now + idx * 0.09 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.3);
    });
  }
}

export const soundEngine = new SoundEngine();
