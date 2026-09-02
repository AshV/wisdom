import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 44100;
const DURATION = 4.2; // seconds
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

/**
 * Sweet Silver Wind Chime & Crystal Bell Tunings.
 * High-register crystalline fundamentals (576 Hz – 1175 Hz).
 * Absolutely zero heavy gong rumble — pure sweet silver & glass chime resonance.
 */
const MOOD_TUNINGS = {
  reflective: 864.0,       // A5: Pure crystalline silver chime
  motivational: 1056.0,    // C6: Uplifting, sparkling celesta
  serene: 792.0,           // G5: Sweet, peaceful bamboo & silver wind chime
  bold: 648.0,             // E5: Clear, radiant orchestral chime bar
  melancholic: 698.46,     // F5: Tender, emotional glass bell
  joyful: 1174.66,         // D6: Sparkling, joyous fairy bell
  philosophical: 576.0,    // D5: Sweet, contemplative acoustic bar chime
  romantic: 960.0,         // B5: Warm, delicate rose glass chime
};

// Pure, sweet harmonic partials of tuned silver chime bars (celesta / orchestral chime)
const PARTIALS = [
  { ratio: 1.000, gain: 0.72, decay: 4.0 },   // Sweet fundamental tone
  { ratio: 1.002, gain: 0.35, decay: 3.8 },   // Micro-shimmer acoustic warmth (2Hz gentle chorus)
  { ratio: 2.003, gain: 0.28, decay: 3.0 },   // Pure sweet octave
  { ratio: 2.998, gain: 0.16, decay: 2.2 },   // Sweet perfect fifth harmonic
  { ratio: 4.005, gain: 0.08, decay: 1.6 },   // Double octave crystal sparkle
  { ratio: 5.210, gain: 0.03, decay: 1.0 },   // High ethereal air shimmer
];

function generateSweetChime(frequency) {
  const buffer = Buffer.alloc(44 + NUM_SAMPLES * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + NUM_SAMPLES * 2, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);  // PCM
  buffer.writeUInt16LE(1, 22);  // Mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);  // 16-bit mono
  buffer.writeUInt16LE(16, 34);

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(NUM_SAMPLES * 2, 40);

  let offset = 44;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;

    // Smooth soft-felt chime striker (gentle 18ms rounded attack, zero harsh clack)
    const attack = t < 0.018 ? (t / 0.018) * (t / 0.018) : 1.0;

    let sample = 0;
    for (const p of PARTIALS) {
      const freq = frequency * p.ratio;
      // Smooth exponential tail decay
      const decay = Math.exp(-t * (4.2 / p.decay));
      sample += Math.sin(2 * Math.PI * freq * t) * p.gain * decay;
    }

    // Gentle 3.5Hz acoustic vibrato / breeze shimmer
    const shimmer = 1.0 + 0.06 * Math.sin(2 * Math.PI * 3.5 * t);
    sample *= attack * shimmer * 0.65;

    // Soft global fadeout in last 0.3s to ensure zero click
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

console.log('Generating sweet silver wind chimes and crystal bells...');

for (const [mood, freq] of Object.entries(MOOD_TUNINGS)) {
  const wavBuffer = generateSweetChime(freq);
  const outPath = path.join(audioDir, `chime-${mood}.wav`);
  fs.writeFileSync(outPath, wavBuffer);
  console.log(`✓ Created sweet chime: chime-${mood}.wav (${freq} Hz, ${DURATION}s)`);
}
