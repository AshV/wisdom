#!/usr/bin/env node
/**
 * Quality Audit Script for Wisdom Quotes
 *
 * Connects to Firebase Realtime Database and reports:
 * 1. Quotes with the highest dislikes / lowest approval ratios
 * 2. Breakdown of reasons (wrong_author, typo, inaccurate, offensive)
 * 3. Recent user feedback notes and corrections
 *
 * Usage:
 *   node scripts/audit-quote-quality.mjs [FIREBASE_DATABASE_URL]
 *   Or configure PUBLIC_FIREBASE_DATABASE_URL in .env / .env.local
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to load .env or .env.local simple key-values without extra deps
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const envLocal = loadEnvFile(path.join(ROOT_DIR, '.env.local'));
const envDefault = loadEnvFile(path.join(ROOT_DIR, '.env'));

const dbUrl =
  process.argv[2] ||
  process.env.PUBLIC_FIREBASE_DATABASE_URL ||
  envLocal.PUBLIC_FIREBASE_DATABASE_URL ||
  envDefault.PUBLIC_FIREBASE_DATABASE_URL;

if (!dbUrl) {
  console.error('\x1b[31m[Error]\x1b[0m Firebase Database URL not found.');
  console.log(`
Please provide your Firebase Realtime Database URL:
  node scripts/audit-quote-quality.mjs https://YOUR_PROJECT-default-rtdb.firebaseio.com

Or set PUBLIC_FIREBASE_DATABASE_URL in .env.local
  `);
  process.exit(1);
}

// Clean trailing slash
const baseUrl = dbUrl.replace(/\/+$/, '');

function getLocalQuotePreview(id) {
  try {
    const quoteFile = path.join(ROOT_DIR, 'src', 'data', 'quotes', `${id}.json`);
    if (fs.existsSync(quoteFile)) {
      const data = JSON.parse(fs.readFileSync(quoteFile, 'utf-8'));
      return {
        author: data.author || 'Unknown',
        content: (data.content || '').slice(0, 60) + ((data.content || '').length > 60 ? '...' : ''),
      };
    }
  } catch {}
  return { author: 'Unknown', content: '' };
}

async function runAudit() {
  console.log(`\n\x1b[36m🔍 Auditing Quote Quality via Firebase RTDB...\x1b[0m`);
  console.log(`Database: \x1b[90m${baseUrl}\x1b[0m\n`);

  try {
    // 1. Fetch quotes aggregate data
    const quotesRes = await fetch(`${baseUrl}/quotes.json`);
    if (!quotesRes.ok) {
      throw new Error(`Failed to fetch /quotes.json (${quotesRes.status} ${quotesRes.statusText})`);
    }
    const quotesData = (await quotesRes.json()) || {};

    // 2. Fetch authors aggregate data
    let authorsData = {};
    try {
      const authorsRes = await fetch(`${baseUrl}/authors.json`);
      if (authorsRes.ok) {
        authorsData = (await authorsRes.json()) || {};
      }
    } catch {}

    // 3. Fetch feedback notes (if rules permit reading)
    let feedbackData = {};
    try {
      const feedbackRes = await fetch(`${baseUrl}/dislike_feedback.json`);
      if (feedbackRes.ok) {
        feedbackData = (await feedbackRes.json()) || {};
      }
    } catch {
      // Permission denied is normal if read rules restrict public access to notes
    }

    const quoteIds = Object.keys(quotesData);
    if (quoteIds.length === 0) {
      console.log('\x1b[33mNo quote stats recorded yet in Firebase.\x1b[0m');
      return;
    }

    // Top Shared Quotes
    const sharedQuotes = quoteIds
      .map((id) => {
        const item = quotesData[id] || {};
        return {
          id,
          shares: item.shares || 0,
          shareTypes: item.share_types || {},
          views: item.views || 0,
          likes: item.likes || 0,
          ...getLocalQuotePreview(id),
        };
      })
      .filter((q) => q.shares > 0)
      .sort((a, b) => b.shares - a.shares);

    // Top Viewed Authors
    const authorSlugs = Object.keys(authorsData);
    const viewedAuthors = authorSlugs
      .map((slug) => {
        const item = authorsData[slug] || {};
        return {
          slug,
          name: item.name || slug,
          views: item.dossierViews || 0,
        };
      })
      .filter((a) => a.views > 0)
      .sort((a, b) => b.views - a.views);

    // Filter and sort quotes with dislikes
    const dislikedQuotes = quoteIds
      .map((id) => {
        const item = quotesData[id] || {};
        const likes = item.likes || 0;
        const dislikes = item.dislikes || 0;
        const views = item.views || 0;
        const totalVotes = likes + dislikes;
        const dislikeRate = totalVotes > 0 ? (dislikes / totalVotes) * 100 : 0;
        return {
          id,
          views,
          likes,
          dislikes,
          dislikeRate,
          reasons: item.dislike_reasons || {},
          ...getLocalQuotePreview(id),
        };
      })
      .filter((q) => q.dislikes > 0)
      .sort((a, b) => b.dislikes - a.dislikes || b.dislikeRate - a.dislikeRate);

    console.log(`\x1b[35m📊 Overview:\x1b[0m`);
    console.log(`- Tracked Quotes: ${quoteIds.length}`);
    console.log(`- Total Shared Quotes: ${sharedQuotes.length}`);
    console.log(`- Tracked Authors: ${authorSlugs.length}`);
    console.log(`- Quotes with Dislikes: ${dislikedQuotes.length}\n`);

    // 1. Show Top Shared Quotes
    if (sharedQuotes.length > 0) {
      console.log(`\x1b[1m\x1b[32m🌟 Top Shared Quotes:\x1b[0m`);
      console.log('='.repeat(80));
      sharedQuotes.slice(0, 5).forEach((q, idx) => {
        const breakdown = Object.entries(q.shareTypes)
          .map(([t, count]) => `${t}: ${count}`)
          .join(', ');
        console.log(`\x1b[32m#${idx + 1} [${q.id}]\x1b[0m \x1b[1m${q.author}\x1b[0m — 🔗 \x1b[1m${q.shares} shares\x1b[0m ${breakdown ? `(${breakdown})` : ''}`);
        console.log(`   “${q.content}”\n`);
      });
    }

    // 2. Show Top Viewed Authors
    if (viewedAuthors.length > 0) {
      console.log(`\x1b[1m\x1b[34m👤 Top Viewed Author Dossiers:\x1b[0m`);
      console.log('='.repeat(80));
      viewedAuthors.slice(0, 5).forEach((a, idx) => {
        console.log(`\x1b[34m#${idx + 1}\x1b[0m \x1b[1m${a.name}\x1b[0m (${a.slug}) — 📖 \x1b[1m${a.views} dossier views\x1b[0m`);
      });
      console.log();
    }

    // 3. Show Quality Issues & Dislikes
    if (dislikedQuotes.length === 0) {
      console.log('\x1b[32m✨ Zero dislikes recorded! All quotes have clean positive ratings.\x1b[0m\n');
    } else {
      console.log('\x1b[1m\x1b[31m🚩 Flagged Quotes Needing Quality Review:\x1b[0m');
      console.log('='.repeat(80));

      dislikedQuotes.slice(0, 15).forEach((q, idx) => {
        console.log(`\x1b[33m#${idx + 1} [${q.id}]\x1b[0m \x1b[1m${q.author}\x1b[0m`);
        console.log(`   “${q.content}”`);
        console.log(`   👍 Likes: ${q.likes}  |  👎 Dislikes: \x1b[31m${q.dislikes}\x1b[0m (${q.dislikeRate.toFixed(1)}%)  |  👀 Views: ${q.views}`);

        const reasonKeys = Object.keys(q.reasons);
        if (reasonKeys.length > 0) {
          const reasonSummary = reasonKeys.map((r) => `${r}: ${q.reasons[r]}`).join(', ');
          console.log(`   🚩 Reasons: \x1b[36m${reasonSummary}\x1b[0m`);
        }

        // Display user feedback notes if any
        const feedbackEntries = feedbackData[q.id];
        if (feedbackEntries) {
          const notes = Object.values(feedbackEntries).filter((f) => f && f.note);
          if (notes.length > 0) {
            console.log(`   💬 User Notes:`);
            notes.slice(-3).forEach((n) => {
              console.log(`      - [${n.reason || 'note'}] "${n.note}"`);
            });
          }
        }
        console.log('-'.repeat(80));
      });
    }
  } catch (err) {
    console.error('\x1b[31mAudit Failed:\x1b[0m', err.message);
  }
}

runAudit();
