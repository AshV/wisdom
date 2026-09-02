import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 44100;
const DURATION = 4.5; // seconds
const NUM_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

// Mood tuning: fundamental frequencies for singing bowl strikes
const MOOD_TUNINGS = {
  reflective: 432.0,      // Solfeggio / A4 meditative
  motivational: 528.0,    // Miracle / Transformation frequency
  serene: 396.0,          // Grounding / Peace frequency
  bold: 216.0,            // Deep bronze temple gong
  melancholic: 349.23,    // F4 tender acoustic chime
  joyful: 587.33,         // D5 crystalline bell
  philosophical: 288.0,   // D4 ancient resonance
  romantic: 480.0,        // Warm rose singing bowl
};

// Partials of bronze Tibetan singing bowl
const PARTIALS = [
  { ratio: 1.00,  gain: 0.85, decay: 4.5 },
  { ratio: 1.003, gain: 0.65, decay: 4.2 }, // acoustic beat (shimmering warmth)
  { ratio: 2.756, gain: 0.40, decay: 3.0 },
  { ratio: 2.762, gain: 0.30, decay: 2.8 },
  { ratio: 5.404, gain: 0.18, decay: 1.8 },
  { ratio: 8.930, gain: 0.08, decay: 1.0 },
];

function generateWav(frequency) {
  const buffer = Buffer.alloc(44 + NUM_SAMPLES * 2);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + NUM_SAMPLES * 2, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 = Mono)
  buffer.writeUInt32LE(SAMPLE_RATE, 24); // SampleRate
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(NUM_SAMPLES * 2, 40);

  // Synthesize sample points
  let offset = 44;
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;

    // Strike mallet envelope (soft 10ms attack, exponential body decay)
    const attack = Math.min(1.0, t / 0.012);

    let sample = 0;
    for (const p of PARTIALS) {
      const freq = frequency * p.ratio;
      const decayEnvelope = Math.exp(-t * (4.5 / p.decay));
      sample += Math.sin(2 * Math.PI * freq * t) * p.gain * decayEnvelope;
    }

    // Soft mallet initial transient tap
    if (t < 0.05) {
      const transient = (1 - t / 0.05) * Math.sin(2 * Math.PI * (frequency * 1.8) * t) * 0.2;
      sample += transient;
    }

    // Overall envelope & scale
    sample *= attack * 0.75;

    // Clamp to 16-bit range
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

const audioDir = path.resolve(__dirname, '../public/media/audio');
fs.mkdirSync(audioDir, { recursive: true });

console.log('Generating pristine Tibetan singing bowl and Zen chime audio...');

for (const [mood, freq] of Object.entries(MOOD_TUNINGS)) {
  const wavBuffer = generateWav(freq);
  const outPath = path.join(audioDir, `chime-${mood}.wav`);
  fs.writeFileSync(outPath, wavBuffer);
  console.log(`✓ Created ${path.basename(outPath)} (${freq} Hz, ${DURATION}s)`);
}

// Also create default chime
const defaultWav = generateWav(432.0);
fs.writeFileSync(path.join(audioDir, 'zen-chime.wav'), defaultWav);
console.log('✓ Created zen-chime.wav');
