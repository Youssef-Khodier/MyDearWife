import { ExperienceStage } from '../types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private melodyTimer: number | null = null;
  private isMelodyPlaying: boolean = false;

  constructor() {
    // Lazy initialization on first interaction
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.ambientGain = this.ctx.createGain();

      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
      this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

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
      const targetGain = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (this.isMuted) {
      this.stopMusicBoxMelody();
    } else {
      this.startMusicBoxMelody();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Celesta / Music Box Note Synthesizer
  public playCelestaNote(freq: number, duration: number = 1.2, volume: number = 0.08) {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Pure bell tone (sine + gentle 2nd harmonic)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2.02, now); // slightly detuned harmonic for warmth

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);

    // Exponential decay typical of real music boxes
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    overtone.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + duration);
    overtone.stop(now + duration);
  }

  // Gentle background music box arpeggio melody
  public startMusicBoxMelody() {
    if (this.isMuted || this.isMelodyPlaying) return;
    this.resume();
    this.isMelodyPlaying = true;

    // Sweet romantic progression: Fmaj7 -> Cmaj7 -> Dm7 -> Bbmaj7
    const melodyPattern: number[] = [
      349.23, 440.0, 523.25, 659.25, // F4, A4, C5, E5
      523.25, 440.0, 392.0, 329.63,  // C5, A4, G4, E4
      261.63, 329.63, 392.0, 493.88, // C4, E4, G4, B4
      392.0, 349.23, 293.66, 349.23   // G4, F4, D4, F4
    ];

    let noteIndex = 0;
    const stepInterval = 500; // ms per note

    const playNext = () => {
      if (!this.isMelodyPlaying || this.isMuted) return;
      const freq = melodyPattern[noteIndex % melodyPattern.length];
      this.playCelestaNote(freq, 1.4, 0.045);
      noteIndex++;
      this.melodyTimer = window.setTimeout(playNext, stepInterval);
    };

    this.melodyTimer = window.setTimeout(playNext, 100);
  }

  public stopMusicBoxMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimer !== null) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  public setStageMood(stage: ExperienceStage, year?: number | string) {
    if (!this.ctx || this.isMuted) return;
    this.updateAmbientChords(stage, year);
  }

  private stopAmbientOscillators() {
    this.ambientOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.ambientOscillators = [];
  }

  private updateAmbientChords(stage: ExperienceStage, year?: number | string) {
    if (!this.ctx || !this.ambientGain) return;
    this.stopAmbientOscillators();

    const numericYear =
      typeof year === 'string' ? parseInt(year.slice(0, 4), 10) : year;

    let freqs: number[] = [];
    switch (stage) {
      case 'intro':
        freqs = [174.61, 261.63, 349.23, 440.0];
        break;
      case 'timeline':
        if (numericYear && numericYear <= 2021) {
          freqs = [130.81, 196.0, 261.63, 329.63];
        } else if (numericYear && numericYear <= 2024) {
          freqs = [146.83, 220.0, 293.66, 369.99];
        } else {
          freqs = [174.61, 261.63, 349.23, 440.0, 523.25];
        }
        break;
      case 'birthday-reveal':
        freqs = [220.0, 277.18, 329.63];
        break;
      case 'birthday':
      case 'final-message':
        freqs = [220.0, 277.18, 329.63, 440.0, 554.37];
        break;
    }

    const now = this.ctx.currentTime;
    freqs.forEach((f, i) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);

      const oscGain = 0.025 / (freqs.length * 0.5);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(oscGain, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      osc.start(now);
      this.ambientOscillators.push(osc);
    });
  }

  // Soft sparkle chime
  public playChime(freq: number = 659.25) {
    if (this.isMuted) return;
    this.playCelestaNote(freq, 0.9, 0.07);
    setTimeout(() => {
      this.playCelestaNote(freq * 1.25, 0.9, 0.05);
    }, 90);
  }

  // Soft button tap
  public playTap() {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Candle blow out sound (gentle breath puff)
  public playCandleBlow() {
    if (this.isMuted) return;
    this.resume();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.5);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.52);
  }

  // Celebration Fanfare / Happy Sparkle Arpeggio
  public playCelebrationFanfare() {
    if (this.isMuted) return;
    this.resume();

    // Melodic music box burst: C5 -> E5 -> G5 -> B5 -> C6 -> E6
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        this.playCelestaNote(freq, 1.4, 0.09);
      }, idx * 95);
    });
  }
}

export const soundEngine = new SoundEngine();
