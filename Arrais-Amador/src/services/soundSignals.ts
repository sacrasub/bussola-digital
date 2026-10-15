/**
 * Sintetizador Náutico com Web Audio API.
 * Gera sons de apitos e buzinas de navegação em frequências acústicas reais (~280-340Hz).
 */

class SoundSignalPlayer {
  private audioCtx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Toca um apito único com duração especificada em segundos
   */
  private playTone(durationSeconds: number, frequency = 300, startTimeOffset = 0): void {
    const ctx = this.getContext();
    const now = ctx.currentTime + startTimeOffset;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Harmônicos náuticos de apito/buzina
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, now);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(frequency * 0.5, now);

    // Envelope de volume (ataque suave, sustentação e decaimento)
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gainNode.gain.setValueAtTime(0.35, now + durationSeconds - 0.08);
    gainNode.gain.linearRampToValueAtTime(0.001, now + durationSeconds);

    // Filtro passa-baixa para dar timbre marítimo quente
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(filter);
    filter.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + durationSeconds);
    subOsc.stop(now + durationSeconds);
  }

  /**
   * Toca sequência de apitos definidos por array de durações (ex: [1, 1] para 2 curtos)
   */
  public playSequence(durations: number[]): Promise<void> {
    let offset = 0;
    const intervalBetweenBlasts = 0.5;

    for (let i = 0; i < durations.length; i++) {
      const dur = durations[i];
      this.playTone(dur, dur >= 3 ? 260 : 320, offset);
      offset += dur + intervalBetweenBlasts;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, offset * 1000);
    });
  }

  /**
   * Toca sinal pelo identificador da regra
   */
  public playSignalByType(signalType: string): void {
    switch (signalType) {
      case 'short_1': // 1 apito curto (guinada para boreste)
        this.playSequence([1]);
        break;
      case 'short_2': // 2 apitos curtos (guinada para bombordo)
        this.playSequence([1, 1]);
        break;
      case 'short_3': // 3 apitos curtos (dando atrás)
        this.playSequence([1, 1, 1]);
        break;
      case 'danger_5': // 5 curtos rápidos (dúvida / perigo)
        this.playSequence([0.3, 0.3, 0.3, 0.3, 0.3]);
        break;
      case 'long_1': // 1 longo (curva em rio / canal)
        this.playSequence([4]);
        break;
      case 'fog_motor': // Cerração com seguimento
        this.playSequence([4]);
        break;
      case 'fog_stopped': // Cerração sem seguimento
        this.playSequence([4, 4]);
        break;
      default:
        this.playSequence([1]);
        break;
    }
  }
}

export const soundSignals = new SoundSignalPlayer();
