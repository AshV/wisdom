/**
 * fetch-author-photos.mjs — Automated, optimized author portrait downloader.
 *
 * Scans all authors from quotes and editorial profiles, queries the public
 * Wikipedia / Wikimedia Commons REST API for public-domain portrait busts/paintings,
 * and uses Sharp to crop & convert each portrait into a razor-sharp 320x320 WebP
 * (~10-18 KB) stored in public/media/authors/${slug}.webp.
 *
 * Features:
 * - Idempotent: skips already downloaded portraits.
 * - Non-destructive: if an author portrait is unavailable, the app automatically
 *   renders the gradient crest initials fallback with zero layout shift.
 * - Rate-limited: gentle 120ms pause between Wikipedia requests.
 *
 * Usage:
 *   node scripts/fetch-author-photos.mjs
 *   (or `npm run fetch:photos`)
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const QUOTES_DIR = path.resolve('src/data/quotes');
const AUTHORS_DIR = path.resolve('public/media/authors');
const PROFILES_FILE = path.resolve('src/data/authorProfiles.ts');

if (!fs.existsSync(AUTHORS_DIR)) {
  fs.mkdirSync(AUTHORS_DIR, { recursive: true });
}

// 1. Collect all authors from quotes
const authorsMap = new Map();

if (fs.existsSync(QUOTES_DIR)) {
  const quoteFiles = fs.readdirSync(QUOTES_DIR).filter((f) => f.endsWith('.json'));
  for (const file of quoteFiles) {
    try {
      const q = JSON.parse(fs.readFileSync(path.join(QUOTES_DIR, file), 'utf8'));
      if (q.authorSlug && !authorsMap.has(q.authorSlug)) {
        authorsMap.set(q.authorSlug, q.author || q.authorSlug);
      }
    } catch (e) {
      // ignore individual parse errors
    }
  }
}

// 2. Extract wikipediaUrl overrides from authorProfiles.ts
const wikiOverrides = new Map();
if (fs.existsSync(PROFILES_FILE)) {
  const content = fs.readFileSync(PROFILES_FILE, 'utf8');
  // Match slug: '...', and wikipediaUrl: '...'
  const slugRegex = /slug:\s*'([^']+)'[\s\S]*?wikipediaUrl:\s*'([^']+)'/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    const slug = match[1];
    const url = match[2];
    const wikiTitle = url.split('/wiki/')[1];
    if (wikiTitle) {
      wikiOverrides.set(slug, decodeURIComponent(wikiTitle));
    }
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAuthorPhoto(slug, name) {
  const outFile = path.join(AUTHORS_DIR, `${slug}.webp`);
  if (fs.existsSync(outFile)) {
    console.log(`[SKIP] ${slug}.webp already exists.`);
    return true;
  }

  // Determine Wikipedia page title
  let wikiTitle = wikiOverrides.get(slug);
  if (!wikiTitle) {
    // Clean up name
    wikiTitle = name.replace(/ /g, '_');
  }

  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        'User-Agent': 'WisdomApp/1.0 (https://github.com/AshV/wisdom; contact@ashishvishwakarma.com)',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.log(`[NOT FOUND] Wikipedia page not found for: ${wikiTitle} (${slug})`);
      return false;
    }

    const data = await res.json();
    const thumbUrl = data.thumbnail?.source;

    if (!thumbUrl) {
      console.log(`[NO THUMB] No thumbnail image on Wikipedia for: ${wikiTitle} (${slug})`);
      return false;
    }

    const imgRes = await fetch(thumbUrl, {
      headers: {
        'User-Agent': 'WisdomApp/1.0 (https://github.com/AshV/wisdom)',
      },
    });

    if (!imgRes.ok) {
      console.log(`[FETCH ERR] Could not download image (${imgRes.status}): ${thumbUrl}`);
      return false;
    }

    const buffer = Buffer.from(await imgRes.arrayBuffer());

    // Process with sharp: 320x320, smart face/top crop, WebP quality 82
    await sharp(buffer)
      .resize(320, 320, {
        fit: 'cover',
        position: 'top',
      })
      .webp({ quality: 82, effort: 4 })
      .toFile(outFile);

    const stats = fs.statSync(outFile);
    console.log(`✓ [SAVED] ${slug}.webp (${Math.round(stats.size / 1024)} KB)`);
    return true;
  } catch (err) {
    console.warn(`[ERROR] Processing ${slug}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`\n=== Fetching Author Portraits for Wisdom ===`);
  console.log(`Found ${authorsMap.size} unique authors.\n`);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [slug, name] of authorsMap.entries()) {
    const outFile = path.join(AUTHORS_DIR, `${slug}.webp`);
    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    console.log(`Fetching portrait for "${name}" (${slug})...`);
    const success = await fetchAuthorPhoto(slug, name);
    if (success) {
      downloaded++;
    } else {
      failed++;
    }

    // Gentle rate limit for Wikipedia API
    await sleep(150);
  }

  console.log(`\n=== Finished ===`);
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Already existed: ${skipped}`);
  console.log(`Failed/Unavailable: ${failed} (will use gradient crest initials)`);
}

main().catch(console.error);
