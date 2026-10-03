import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 44100;
const DURATION = 4.2; // seconds
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

/**
 * 6 Diverse Acoustic Timbre Models:
 * 1. silver_chime: High crystalline wind chime & celesta
 * 2. tibetan_bowl: Warm resonant singing bowl with gentle acoustic beating
 * 3. crystal_bowl: Pure quartz singing bowl with ethereal harmonic aura
 * 4. tingsha: Crisp Tibetan prayer cymbals with long shimmering sustain
 * 5. bamboo: Earthy warm Kyoto bamboo wind chime
 * 6. dual_celestial: Harmonically coupled starlight chime bars
 */
const TIMBRES = {
  silver_chime: {
    partials: [
      { ratio: 1.000, gain: 0.72, decay: 4.0 },
      { ratio: 1.002, gain: 0.35, decay: 3.8 },
      { ratio: 2.003, gain: 0.28, decay: 3.0 },
      { ratio: 2.998, gain: 0.16, decay: 2.2 },
      { ratio: 4.005, gain: 0.08, decay: 1.6 },
      { ratio: 5.210, gain: 0.03, decay: 1.0 },
    ],
    shimmerFreq: 3.5,
    shimmerDepth: 0.06,
    attackTime: 0.018,
    overallGain: 0.65,
  },
  tibetan_bowl: {
    partials: [
      { ratio: 1.000, gain: 0.78, decay: 4.2 },
      { ratio: 1.003, gain: 0.45, decay: 4.0 },
      { ratio: 2.760, gain: 0.32, decay: 3.2 },
      { ratio: 5.400, gain: 0.18, decay: 2.5 },
      { ratio: 8.920, gain: 0.08, decay: 1.8 },
    ],
    shimmerFreq: 2.2,
    shimmerDepth: 0.08,
    attackTime: 0.035,
    overallGain: 0.70,
  },
  crystal_bowl: {
    partials: [
      { ratio: 1.000, gain: 0.85, decay: 4.2 },
      { ratio: 2.000, gain: 0.22, decay: 3.5 },
      { ratio: 3.000, gain: 0.12, decay: 2.8 },
      { ratio: 4.002, gain: 0.05, decay: 2.0 },
    ],
    shimmerFreq: 1.8,
    shimmerDepth: 0.05,
    attackTime: 0.040,
    overallGain: 0.68,
  },
  tingsha: {
    partials: [
      { ratio: 1.000, gain: 0.68, decay: 4.2 },
      { ratio: 1.482, gain: 0.40, decay: 3.6 },
      { ratio: 2.083, gain: 0.32, decay: 3.0 },
      { ratio: 3.125, gain: 0.22, decay: 2.2 },
      { ratio: 4.280, gain: 0.12, decay: 1.6 },
      { ratio: 6.150, gain: 0.06, decay: 1.0 },
    ],
    shimmerFreq: 4.2,
    shimmerDepth: 0.09,
    attackTime: 0.012,
    overallGain: 0.62,
  },
  bamboo: {
    partials: [
      { ratio: 1.000, gain: 0.80, decay: 3.6 },
      { ratio: 1.980, gain: 0.30, decay: 2.8 },
      { ratio: 2.950, gain: 0.15, decay: 2.0 },
      { ratio: 4.100, gain: 0.06, decay: 1.4 },
    ],
    shimmerFreq: 2.8,
    shimmerDepth: 0.04,
    attackTime: 0.015,
    overallGain: 0.68,
  },
  dual_celestial: {
    partials: [
      { ratio: 1.000, gain: 0.65, decay: 4.0 },
      { ratio: 1.498, gain: 0.45, decay: 3.8 },
      { ratio: 2.002, gain: 0.25, decay: 3.2 },
      { ratio: 3.001, gain: 0.15, decay: 2.4 },
      { ratio: 4.005, gain: 0.08, decay: 1.6 },
    ],
    shimmerFreq: 3.8,
    shimmerDepth: 0.07,
    attackTime: 0.020,
    overallGain: 0.63,
  },
};

/**
 * 22 Distinct Hand-Tuned Chime Definitions
 */
const CHIME_DEFINITIONS = [
  // 1. Classic Sweet Silver Chimes (Mood Primary Set)
  { id: 'chime-reflective', freq: 864.0, timbre: 'silver_chime' },
  { id: 'chime-motivational', freq: 1056.0, timbre: 'silver_chime' },
  { id: 'chime-serene', freq: 792.0, timbre: 'silver_chime' },
  { id: 'chime-bold', freq: 648.0, timbre: 'silver_chime' },
  { id: 'chime-melancholic', freq: 698.46, timbre: 'silver_chime' },
  { id: 'chime-joyful', freq: 1174.66, timbre: 'silver_chime' },
  { id: 'chime-philosophical', freq: 576.0, timbre: 'silver_chime' },
  { id: 'chime-romantic', freq: 960.0, timbre: 'silver_chime' },

  // 2. Warm Resonance & Healing Tones (Mood Alternate Set)
  { id: 'chime-reflective-alt', freq: 432.0, timbre: 'tibetan_bowl' },    // 432Hz Sacred tuning
  { id: 'chime-motivational-alt', freq: 528.0, timbre: 'crystal_bowl' },  // 528Hz Solfeggio miracle
  { id: 'chime-serene-alt', freq: 396.0, timbre: 'bamboo' },             // 396Hz Grounding peace
  { id: 'chime-bold-alt', freq: 324.0, timbre: 'tibetan_bowl' },         // 324Hz Resonant bronze
  { id: 'chime-melancholic-alt', freq: 349.23, timbre: 'crystal_bowl' }, // 349Hz Deep glass bell
  { id: 'chime-joyful-alt', freq: 587.33, timbre: 'dual_celestial' },    // 587Hz Sparkling celestial
  { id: 'chime-philosophical-alt', freq: 288.0, timbre: 'tibetan_bowl' },// 288Hz Deep contemplative
  { id: 'chime-romantic-alt', freq: 480.0, timbre: 'crystal_bowl' },     // 480Hz Warm rose quartz

  // 3. Ambient Sacred Instruments
  { id: 'zen-chime', freq: 432.0, timbre: 'tibetan_bowl' },              // Signature Zen Chime
  { id: 'chime-temple-bell', freq: 216.0, timbre: 'tibetan_bowl' },      // Deep 216Hz Temple Bell
  { id: 'chime-crystal-bowl', freq: 639.0, timbre: 'crystal_bowl' },     // 639Hz Heart harmony
  { id: 'chime-tingsha', freq: 1296.0, timbre: 'tingsha' },              // High Tibetan prayer cymbal
  { id: 'chime-celestial', freq: 720.0, timbre: 'dual_celestial' },      // Celestial harmonic breeze
  { id: 'chime-bamboo', freq: 540.0, timbre: 'bamboo' },                 // Japanese Kyoto bamboo chime
];

function generateSweetChime(frequency, timbreKey) {
  const timbre = TIMBRES[timbreKey] || TIMBRES.silver_chime;
  const buffer = Buffer.alloc(44 + NUM_SAMPLES * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + NUM_SAMPLES * 2, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32); // 16-bit mono
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(NUM_SAMPLES * 2, 40);

  let offset = 44;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;

    // Smooth rounded attack curve (zero harsh click)
    const attack = t < timbre.attackTime ? Math.sin((t / timbre.attackTime) * (Math.PI / 2)) : 1.0;

    let sample = 0;
    for (const p of timbre.partials) {
      const freq = frequency * p.ratio;
      const decay = Math.exp(-t * (4.2 / p.decay));
      sample += Math.sin(2 * Math.PI * freq * t) * p.gain * decay;
    }

    // Acoustic shimmer
    const shimmer = 1.0 + timbre.shimmerDepth * Math.sin(2 * Math.PI * timbre.shimmerFreq * t);
    sample *= attack * shimmer * timbre.overallGain;

    // Soft global fadeout in last 0.3s to guarantee zero click
    if (t > DURATION - 0.3) {
      const fade = (DURATION - t) / 0.3;
      sample *= fade * fade;
    }

    // Clamp to 16-bit PCM
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

const audioDir = path.resolve(__dirname, '../public/media/audio');
fs.mkdirSync(audioDir, { recursive: true });

console.log(`Generating ${CHIME_DEFINITIONS.length} pristine Zen chimes and sacred bells...`);

for (const chime of CHIME_DEFINITIONS) {
  const wavBuffer = generateSweetChime(chime.freq, chime.timbre);
  const outPath = path.join(audioDir, `${chime.id}.wav`);
  fs.writeFileSync(outPath, wavBuffer);
  console.log(`✓ Created: ${chime.id}.wav (${chime.timbre}, ${chime.freq} Hz, ${DURATION}s)`);
}

console.log('All chimes generated successfully.');
