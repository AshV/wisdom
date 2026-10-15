/**
 * Ambient Engine — Living Generative Backgrounds & Web Audio Zen Chimes
 *
 * Implements:
 * 1. Fluid radial gradient mesh canvas that breathes and shifts with active mood
 * 2. Elegant procedural line art engine (sacred geometry, Lissajous curves, wave ripples)
 * 3. Soft atmospheric floating particles
 * 4. Procedural Tibetan Singing Bowl & Crystal Bell Chime synthesizer via Web Audio API
 */

import { MOODS } from './data.js';

class AmbientEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particlesCanvas = null;
    this.pCtx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.animId = null;
    this.time = 0;
    this.currentMood = 'reflective';

    // Particle pool
    this.particles = [];
    this.numParticles = 36;

    // Audio synthesizer
    this.audioCtx = null;
    this.isAudioEnabled = false;

    // Smooth color interpolation targets
    this.colors = {
      primary: [99, 102, 241],
      secondary: [168, 85, 247],
      tertiary: [236, 72, 153],
      targetPrimary: [99, 102, 241],
      targetSecondary: [168, 85, 247],
      targetTertiary: [236, 72, 153],
    };
  }

  init(canvasId = 'ambient-canvas', particlesId = 'particles-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.particlesCanvas = document.getElementById(particlesId);

    if (this.canvas) this.ctx = this.canvas.getContext('2d');
    if (this.particlesCanvas) this.pCtx = this.particlesCanvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    this.initParticles();
    this.startLoop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (this.canvas && this.ctx) {
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);
    }

    if (this.particlesCanvas && this.pCtx) {
      this.particlesCanvas.width = this.width * this.dpr;
      this.particlesCanvas.height = this.height * this.dpr;
      this.pCtx.scale(this.dpr, this.dpr);
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.35 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.6 + 0.2,
        maxAlpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
  }

  setMood(moodId) {
    const mood = MOODS[moodId] || MOODS.reflective;
    this.currentMood = moodId;

    // Convert hex to rgb
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const mainColor = hexToRgb(mood.accent);

    if (moodId === 'reflective') {
      this.colors.targetPrimary = [99, 102, 241];
      this.colors.targetSecondary = [168, 85, 247];
      this.colors.targetTertiary = [79, 70, 229];
    } else if (moodId === 'motivational') {
      this.colors.targetPrimary = [245, 158, 11];
      this.colors.targetSecondary = [239, 68, 68];
      this.colors.targetTertiary = [251, 191, 36];
    } else if (moodId === 'serene') {
      this.colors.targetPrimary = [6, 182, 212];
      this.colors.targetSecondary = [59, 130, 246];
      this.colors.targetTertiary = [16, 185, 129];
    } else if (moodId === 'bold') {
      this.colors.targetPrimary = [239, 68, 68];
      this.colors.targetSecondary = [249, 115, 22];
      this.colors.targetTertiary = [225, 29, 72];
    } else if (moodId === 'melancholic') {
      this.colors.targetPrimary = [139, 92, 246];
      this.colors.targetSecondary = [236, 72, 153];
      this.colors.targetTertiary = [124, 58, 237];
    } else if (moodId === 'joyful') {
      this.colors.targetPrimary = [16, 185, 129];
      this.colors.targetSecondary = [6, 182, 212];
      this.colors.targetTertiary = [52, 211, 153];
    } else if (moodId === 'philosophical') {
      this.colors.targetPrimary = [167, 139, 250];
      this.colors.targetSecondary = [244, 114, 182];
      this.colors.targetTertiary = [99, 102, 241];
    } else if (moodId === 'romantic') {
      this.colors.targetPrimary = [236, 72, 153];
      this.colors.targetSecondary = [251, 113, 133];
      this.colors.targetTertiary = [168, 85, 247];
    } else {
      this.colors.targetPrimary = mainColor;
      this.colors.targetSecondary = [mainColor[0] * 0.7, mainColor[1] * 0.7, 200];
      this.colors.targetTertiary = [mainColor[0] * 0.5, 50, mainColor[2] * 0.9];
    }

    // Play chime if audio is enabled
    if (this.isAudioEnabled) {
      this.playChime(moodId);
    }
  }

  startLoop() {
    const render = () => {
      this.time += 0.008;
      this.updateColors();
      this.renderMesh();
      this.renderGeometry();
      this.renderParticles();
      this.animId = requestAnimationFrame(render);
    };
    render();
  }

  updateColors() {
    const lerp = (a, b, t) => a + (b - a) * t;
    const speed = 0.035;

    for (let i = 0; i < 3; i++) {
      this.colors.primary[i] = lerp(this.colors.primary[i], this.colors.targetPrimary[i], speed);
      this.colors.secondary[i] = lerp(this.colors.secondary[i], this.colors.targetSecondary[i], speed);
      this.colors.tertiary[i] = lerp(this.colors.tertiary[i], this.colors.targetTertiary[i], speed);
    }
  }

  renderMesh() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Dark luminous base
    ctx.fillStyle = '#0f1019';
    ctx.fillRect(0, 0, w, h);

    const [r1, g1, b1] = this.colors.primary.map(Math.round);
    const [r2, g2, b2] = this.colors.secondary.map(Math.round);
    const [r3, g3, b3] = this.colors.tertiary.map(Math.round);

    // Drifting center 1 (top-left)
    const x1 = w * (0.3 + 0.15 * Math.sin(this.time * 0.8));
    const y1 = h * (0.25 + 0.12 * Math.cos(this.time * 0.6));
    const grad1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, Math.max(w, h) * 0.65);
    grad1.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.28)`);
    grad1.addColorStop(0.5, `rgba(${r1}, ${g1}, ${b1}, 0.08)`);
    grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    // Drifting center 2 (bottom-right)
    const x2 = w * (0.7 + 0.15 * Math.cos(this.time * 0.7));
    const y2 = h * (0.7 + 0.12 * Math.sin(this.time * 0.9));
    const grad2 = ctx.createRadialGradient(x2, y2, 20, x2, y2, Math.max(w, h) * 0.7);
    grad2.addColorStop(0, `rgba(${r2}, ${g2}, ${b2}, 0.25)`);
    grad2.addColorStop(0.5, `rgba(${r2}, ${g2}, ${b2}, 0.06)`);
    grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // Subtle center atmospheric pulse
    const cx = w * 0.5;
    const cy = h * 0.5;
    const grad3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.45);
    grad3.addColorStop(0, `rgba(${r3}, ${g3}, ${b3}, 0.14)`);
    grad3.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, w, h);
  }

  renderGeometry() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const [r, g, b] = this.colors.primary.map(Math.round);

    ctx.save();
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.12)`;
    ctx.lineWidth = 1.2;

    // Harmonic Lissajous Curve
    ctx.beginPath();
    const a = 3;
    const bConst = 2;
    const delta = this.time * 0.4;
    const radius = Math.min(this.width, this.height) * 0.32;

    for (let theta = 0; theta <= Math.PI * 2; theta += 0.02) {
      const lx = cx + radius * Math.sin(a * theta + delta);
      const ly = cy + radius * Math.sin(bConst * theta);
      if (theta === 0) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }
    ctx.stroke();

    // Sacred Concentric Orbits
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      const rOrb = radius * (0.35 * i) + Math.sin(this.time + i) * 6;
      ctx.arc(cx, cy, rOrb, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.05 + i * 0.02})`;
      ctx.stroke();
    }

    ctx.restore();
  }

  renderParticles() {
    if (!this.pCtx) return;
    const ctx = this.pCtx;
    ctx.clearRect(0, 0, this.width, this.height);

    const [r, g, b] = this.colors.primary.map(Math.round);

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(this.time * p.pulseSpeed * 10) * 0.01;

      // Wrap around
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      const currentAlpha = Math.max(0.1, Math.min(p.maxAlpha, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
      ctx.fill();
    }
  }

  // ── Web Audio API Zen Chimes ──────────────────────────────────
  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleAudio(forceState) {
    this.ensureAudioContext();
    this.isAudioEnabled = forceState !== undefined ? forceState : !this.isAudioEnabled;
    if (this.isAudioEnabled) {
      this.playChime(this.currentMood);
    }
    return this.isAudioEnabled;
  }

  playChime(moodId) {
    if (!this.audioCtx) this.ensureAudioContext();
    if (!this.audioCtx) return;

    try {
      const mood = MOODS[moodId] || MOODS.reflective;
      const baseFreq = mood.freq || 432;
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Master gain for this strike
      const strikeGain = ctx.createGain();
      strikeGain.gain.setValueAtTime(0, now);
      strikeGain.gain.linearRampToValueAtTime(0.42, now + 0.04);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
      strikeGain.connect(ctx.destination);

      // Tibetan singing bowl harmonic overtones
      const partials = [
        { mult: 1.0, gain: 0.7, decay: 5.5 },
        { mult: 2.76, gain: 0.35, decay: 4.2 },
        { mult: 5.4, gain: 0.18, decay: 3.1 },
        { mult: 8.9, gain: 0.08, decay: 2.0 },
      ];

      partials.forEach(({ mult, gain, decay }) => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        // Sine wave for pure bell tone
        osc.type = 'sine';
        // Subtle micro-detune for singing bowl shimmer
        const detune = (Math.random() - 0.5) * 4;
        osc.frequency.setValueAtTime(baseFreq * mult, now);
        osc.detune.setValueAtTime(detune, now);

        pGain.gain.setValueAtTime(0, now);
        pGain.gain.linearRampToValueAtTime(gain, now + 0.03);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(pGain);
        pGain.connect(strikeGain);

        osc.start(now);
        osc.stop(now + decay + 0.2);
      });
    } catch (e) {
      console.warn('Zen chime synthesis audio notice:', e);
    }
  }
}

export const ambient = new AmbientEngine();
