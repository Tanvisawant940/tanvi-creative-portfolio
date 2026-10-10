// Web Audio API ambient 432 Hz soothing harmonic sound generator
let audioCtx = null;
let masterGain = null;
let oscillator = null;
let subOscillator = null;
let lfo = null;
let lfoGain = null;
let isAudioPlaying = false;

export const startAmbientSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master gain node with smooth attack
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.045, now + 2.5); // Soft, gentle volume

    // Lowpass filter to ensure silky warmth
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    // Primary 432 Hz pure sine tone
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(432, now);

    // Sub-harmonic warm overtone at 216 Hz (one octave down) for soothing body
    subOscillator = audioCtx.createOscillator();
    subOscillator.type = 'sine';
    subOscillator.frequency.setValueAtTime(216, now);

    const subGain = audioCtx.createGain();
    subGain.gain.setValueAtTime(0.3, now);
    subOscillator.connect(subGain);

    // Subtle gentle tremolo LFO (0.1 Hz breathing rate)
    lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, now); // Gentle organic breathing rhythm
    lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(0.015, now);

    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);

    // Connect graph
    oscillator.connect(filter);
    subGain.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    oscillator.start(now);
    subOscillator.start(now);
    lfo.start(now);

    isAudioPlaying = true;
    return true;
  } catch (err) {
    console.warn('Web Audio error:', err);
    return false;
  }
};

export const stopAmbientSound = () => {
  if (!audioCtx || !isAudioPlaying) return;

  try {
    const now = audioCtx.currentTime;
    if (masterGain) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.2);
    }

    setTimeout(() => {
      try {
        if (oscillator) {
          oscillator.stop();
          oscillator.disconnect();
          oscillator = null;
        }
        if (subOscillator) {
          subOscillator.stop();
          subOscillator.disconnect();
          subOscillator = null;
        }
        if (lfo) {
          lfo.stop();
          lfo.disconnect();
          lfo = null;
        }
        if (masterGain) {
          masterGain.disconnect();
          masterGain = null;
        }
        isAudioPlaying = false;
      } catch (e) {
        // cleanup safety
      }
    }, 1300);
  } catch (err) {
    console.warn('Error stopping audio:', err);
    isAudioPlaying = false;
  }
};

export const getAudioState = () => isAudioPlaying;
