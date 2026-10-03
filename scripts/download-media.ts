/**
 * download-media.ts — Fetch royalty-free stock media from Pexels API.
 *
 * Usage:
 *   PEXELS_API_KEY=your_key npx tsx scripts/download-media.ts
 *
 * Downloads:
 *   - 8-12 nature/abstract looping videos (720p) → public/media/videos/
 *   - Placeholder ambient audio tracks → public/media/audio/
 *
 * Get a free API key at: https://www.pexels.com/api/
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as https from 'node:https';

const API_KEY = process.env.PEXELS_API_KEY;

if (!API_KEY) {
  console.error(`
╔══════════════════════════════════════════════════════════════╗
║  Pexels API key is required.                                ║
║                                                             ║
║  1. Get a free key at: https://www.pexels.com/api/          ║
║  2. Run:                                                    ║
║     PEXELS_API_KEY=your_key npx tsx scripts/download-media.ts ║
║                                                             ║
║  The app works without videos (CSS gradient fallbacks),     ║
║  but the full experience requires running this script once. ║
╚══════════════════════════════════════════════════════════════╝
  `);
  process.exit(1);
}

const VIDEOS_DIR = path.resolve('public/media/videos');
const AUDIO_DIR = path.resolve('public/media/audio');

// Ensure directories exist
fs.mkdirSync(VIDEOS_DIR, { recursive: true });
fs.mkdirSync(AUDIO_DIR, { recursive: true });

// Mood → search queries for finding appropriate videos
const moodSearches: Record<string, string[]> = {
  reflective: ['night sky stars', 'calm water reflection'],
  motivational: ['sunrise mountains', 'running ocean waves'],
  serene: ['forest rain', 'zen garden water'],
  bold: ['lightning storm', 'volcanic lava flow'],
  melancholic: ['rain window', 'foggy forest autumn'],
  joyful: ['golden sunlight flowers', 'birds flying sky'],
  philosophical: ['cosmos nebula', 'ancient library candles'],
  romantic: ['cherry blossom petals', 'candlelight bokeh'],
};

interface PexelsVideo {
  id: number;
  video_files: Array<{
    link: string;
    quality: string;
    width: number;
    height: number;
    file_type: string;
  }>;
}

async function searchVideos(query: string, perPage = 2): Promise<PexelsVideo[]> {
  return new Promise((resolve, reject) => {
    const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait&size=small`;
    const req = https.get(url, {
      headers: { Authorization: API_KEY! },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.videos || []);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const doRequest = (downloadUrl: string) => {
      https.get(downloadUrl, (res) => {
        // Follow redirects
        if (res.statusCode === 301 || res.statusCode === 302) {
          doRequest(res.headers.location!);
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    doRequest(url);
  });
}

async function main() {
  console.log('🎬 Downloading background videos from Pexels...\n');

  for (const [mood, queries] of Object.entries(moodSearches)) {
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const filename = `${mood}-0${i + 1}.mp4`;
      const dest = path.join(VIDEOS_DIR, filename);

      if (fs.existsSync(dest)) {
        console.log(`  ✓ ${filename} already exists, skipping`);
        continue;
      }

      console.log(`  ↓ Searching "${query}" for ${filename}...`);
      try {
        const videos = await searchVideos(query, 1);
        if (videos.length === 0) {
          console.log(`    ⚠ No results for "${query}"`);
          continue;
        }

        // Pick the best 720p or smaller video file
        const videoFiles = videos[0].video_files
          .filter(f => f.file_type === 'video/mp4' && f.width <= 1280)
          .sort((a, b) => b.width - a.width);

        const best = videoFiles[0] || videos[0].video_files[0];
        if (!best) {
          console.log(`    ⚠ No suitable video file found`);
          continue;
        }

        console.log(`    ↓ Downloading ${best.width}x${best.height} → ${filename}`);
        await downloadFile(best.link, dest);
        console.log(`    ✓ Saved ${filename}`);

        // Rate limit: 200 req/hr
        await new Promise(r => setTimeout(r, 1500));
      } catch (err) {
        console.error(`    ✗ Error: ${(err as Error).message}`);
      }
    }
  }

  // Create placeholder audio files (silent MP3 stubs)
  console.log('\n🎵 Creating placeholder audio tracks...');
  const audioTracks = [
    'ambient-calm.mp3',
    'ambient-uplifting.mp3',
    'ambient-nature.mp3',
    'ambient-rain.mp3',
    'ambient-piano.mp3',
  ];

  for (const track of audioTracks) {
    const dest = path.join(AUDIO_DIR, track);
    if (!fs.existsSync(dest)) {
      // Create a minimal valid MP3 file (silent, ~1 second)
      // This is a valid MP3 frame header for silence
      const silentMp3 = Buffer.from([
        0xFF, 0xFB, 0x90, 0x00, // MPEG1 Layer 3, 128kbps, 44100Hz, stereo
        ...new Array(417).fill(0x00), // Padding for one frame
      ]);
      fs.writeFileSync(dest, silentMp3);
      console.log(`  ✓ Created ${track} (silent placeholder)`);
    } else {
      console.log(`  ✓ ${track} already exists`);
    }
  }

  console.log('\n✅ Media download complete!');
  console.log('   Videos: public/media/videos/');
  console.log('   Audio:  public/media/audio/');
}

main().catch(console.error);
