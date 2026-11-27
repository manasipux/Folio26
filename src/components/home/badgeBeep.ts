/**
 * The short beep of an office badge reader accepting a card.
 * Made with the Web Audio API (no sound file): a ~2.2 kHz square wave, softened
 * with a low-pass filter, about a tenth of a second long, at low volume.
 * Only ever called from a click, so browsers allow it to play.
 */
let ctx: AudioContext | null = null;

export function badgeBeep() {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();

    const start = ctx.currentTime + 0.01;
    const length = 0.11;

    const tone = ctx.createOscillator();
    tone.type = 'square';
    tone.frequency.setValueAtTime(2200, start);

    // Take the harsh edge off the square wave, like a small piezo speaker behind plastic
    const soften = ctx.createBiquadFilter();
    soften.type = 'lowpass';
    soften.frequency.setValueAtTime(3800, start);

    const volume = ctx.createGain();
    volume.gain.setValueAtTime(0.0001, start);
    volume.gain.exponentialRampToValueAtTime(0.05, start + 0.006);
    volume.gain.setValueAtTime(0.05, start + length - 0.02);
    volume.gain.exponentialRampToValueAtTime(0.0001, start + length);

    tone.connect(soften).connect(volume).connect(ctx.destination);
    tone.start(start);
    tone.stop(start + length + 0.02);
  } catch {
    // No sound is fine; the card still opens
  }
}
