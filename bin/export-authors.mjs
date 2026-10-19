#!/usr/bin/env node
/**
 * export-authors.mjs — v2
 *
 * One-time migration: reads authorProfiles.ts via text extraction with full
 * nested object support (keyWorks, pillars arrays). Works without tsx/ts-node
 * by stripping TS-only syntax and evaluating the data block directly.
 *
 * Run from consumer project root (tatva/ or element/):
 *   node ../wisdom/bin/export-authors.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const CWD = process.cwd();
const PROFILES_FILE = path.resolve(CWD, 'src/data/authorProfiles.ts');
const OUT_DIR = path.resolve(CWD, 'src/data/authors');

if (!fs.existsSync(PROFILES_FILE)) {
  console.error(`❌ Not found: ${PROFILES_FILE}`);
  console.error('   Run this from the consumer project root (tatva/ or element/).');
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const src = fs.readFileSync(PROFILES_FILE, 'utf8');

// ─── Extract the authorProfiles object literal as a raw string ───────────────
// Find: export const authorProfiles: Record<...> = {
const declPattern = /export\s+const\s+authorProfiles\s*:[^=]+=\s*\{/;
const declMatch = declPattern.exec(src);
if (!declMatch) {
  console.error('❌ Could not locate `export const authorProfiles` in the file.');
  process.exit(1);
}

// Walk from the opening { of the object to find the matching closing }
let depth = 0;
let start = declMatch.index + declMatch[0].lastIndexOf('{');
let end = start;
for (let i = start; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') {
    depth--;
    if (depth === 0) { end = i; break; }
  }
}

const objectLiteral = src.slice(start, end + 1);

// ─── Strip TypeScript syntax so the object can be eval()'d as JS ─────────────
let jsStr = objectLiteral
  // Remove: getAuthorPhotoUrl(...) calls → replace with the string they produce
  // We can't evaluate calls so replace with empty string; photo will regenerate
  .replace(/getAuthorPhotoUrl\([^)]*\)/g, '""')
  // Remove: getBaseUrl() calls
  .replace(/getBaseUrl\(\)/g, '""')
  // Remove: getThemeAuthorProfile(...) calls
  .replace(/getThemeAuthorProfile\([^)]*\)/g, 'null')
  // Remove trailing commas before } or ] (not valid in strict JSON but fine for eval)
  // TS template literals with ${} — leave as-is, eval handles them
  // Fix: single-quote strings are fine for eval

// Wrap so eval returns the object
jsStr = `(${jsStr})`;

let authorProfiles;
try {
  // eslint-disable-next-line no-eval
  authorProfiles = eval(jsStr);
  console.log(`✅ Parsed ${Object.keys(authorProfiles).length} author profiles via eval`);
} catch (e) {
  console.error('❌ Failed to evaluate object literal:', e.message);
  console.error('   Hint: The file may use unsupported expressions.');
  process.exit(1);
}

// ─── Write one JSON per author ────────────────────────────────────────────────
let written = 0;
let skipped = 0;

for (const [slug, profile] of Object.entries(authorProfiles)) {
  if (!profile || typeof profile !== 'object') continue;

  const outPath = path.join(OUT_DIR, `${slug}.json`);
  if (fs.existsSync(outPath)) {
    skipped++;
    continue;
  }

  // Clean up: ensure slug is set, remove undefined/null fields
  const data = { ...profile, slug };
  for (const key of Object.keys(data)) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      delete data[key];
    }
  }
  // Ensure required arrays exist
  if (!data.keyWorks) data.keyWorks = [];
  if (!data.pillars) data.pillars = [];

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');
  written++;
}

console.log(`\n✅ Done!`);
console.log(`   Written : ${written} → ${OUT_DIR}`);
console.log(`   Skipped : ${skipped} (already existed)`);
console.log(`\nNext steps:`);
console.log(`  1. Spot-check a few files in src/data/authors/`);
console.log(`  2. Run: node ../wisdom/bin/export-authors.mjs (from element/ too)`);
console.log(`  3. Delete src/data/authorProfiles.ts`);
