/**
 * download-samples.mjs
 * Downloads royalty-free sample MP4 and MP3 files from SampleLib
 * and populates public/media/ and dist/media/ directories.
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const VIDEOS_DIR = path.join(rootDir, 'public/media/videos');
const AUDIO_DIR = path.join(rootDir, 'public/media/audio');
const DIST_VIDEOS_DIR = path.join(rootDir, 'dist/media/videos');
const DIST_AUDIO_DIR = path.join(rootDir, 'dist/media/audio');

[VIDEOS_DIR, AUDIO_DIR, DIST_VIDEOS_DIR, DIST_AUDIO_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${targetUrl}, status code: ${res.statusCode}`));
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
    get(url);
  });
}

async function main() {
  console.log('📦 Downloading sample media files...\n');

  // 1. Download sample MP4
  const tempMp4 = path.join(rootDir, 'temp-sample.mp4');
  console.log('⬇️  Downloading sample MP4 (5s loop)...');
  await downloadFile('https://samplelib.com/mp4/sample-5s.mp4', tempMp4);
  console.log('✓  Downloaded sample MP4 successfully');

  // Copy to all mood video targets
  const videoNames = [
    'reflective-01.mp4', 'reflective-02.mp4',
    'motivational-01.mp4', 'motivational-02.mp4',
    'serene-01.mp4', 'serene-02.mp4',
    'bold-01.mp4', 'bold-02.mp4',
    'melancholic-01.mp4', 'melancholic-02.mp4',
    'joyful-01.mp4', 'joyful-02.mp4',
    'philosophical-01.mp4', 'philosophical-02.mp4',
    'romantic-01.mp4', 'romantic-02.mp4',
  ];

  for (const name of videoNames) {
    fs.copyFileSync(tempMp4, path.join(VIDEOS_DIR, name));
    fs.copyFileSync(tempMp4, path.join(DIST_VIDEOS_DIR, name));
    console.log(`  ✓ Created public/media/videos/${name}`);
  }
  fs.unlinkSync(tempMp4);

  // 2. Download sample MP3 files
  console.log('\n⬇️  Downloading sample ambient MP3 audio tracks...');

  const audioMap = [
    { url: 'https://samplelib.com/mp3/sample-9s.mp3', name: 'ambient-calm.mp3' },
    { url: 'https://samplelib.com/mp3/sample-12s.mp3', name: 'ambient-uplifting.mp3' },
    { url: 'https://samplelib.com/mp3/sample-6s.mp3', name: 'ambient-nature.mp3' },
    { url: 'https://samplelib.com/mp3/sample-9s.mp3', name: 'ambient-rain.mp3' },
    { url: 'https://samplelib.com/mp3/sample-3s.mp3', name: 'ambient-piano.mp3' },
  ];

  for (const item of audioMap) {
    const publicDest = path.join(AUDIO_DIR, item.name);
    const distDest = path.join(DIST_AUDIO_DIR, item.name);
    console.log(`  ⬇️  Downloading ${item.name}...`);
    await downloadFile(item.url, publicDest);
    fs.copyFileSync(publicDest, distDest);
    console.log(`  ✓ Created public/media/audio/${item.name}`);
  }

  console.log('\n🎉 All sample audio and video files downloaded and deployed successfully!');
}

main().catch(err => {
  console.error('Error downloading samples:', err);
  process.exit(1);
});
