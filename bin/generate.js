#!/usr/bin/env node

/**
 * wisdom bulk video generator
 * 
 * Usage:
 * npx wisdom generate-videos --url http://localhost:4321
 * 
 * This script uses Puppeteer to navigate to your Astro site, automatically discover
 * all quotes, and trigger the native 10-second video rendering sequence for each.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const rawArgs = process.argv.slice(2);
  if (rawArgs[0] === 'admin') {
    process.argv.splice(2, 1);
    await import('./admin.js');
    return;
  }

  if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
    console.log(`
🎬 Wiz Theme Bulk Video Generator & Progress Tracker
=================================================
Usage:
  npx wisdom generate-videos [options]
  node wisdom/bin/generate.js [options]

Options:
  --status, --check  Check progress and list remaining quotes without rendering
  --url <url>        Target Astro site URL (default: http://localhost:4321)
  --out <dir>        Directory where videos and progress.json are stored (default: ./out-videos)
  --limit <number>   Render only the next N quotes in the queue
  --force            Force re-render all videos, even if files already exist on disk
  -h, --help         Show this help guide

Automatic Progress Tracking:
  • Automatically skips quotes that already have a non-empty video file in out-videos/
  • Creates and continuously updates out-videos/progress.json
  • Shows real-time progress bar, item index, and dynamic ETA
`);
    return;
  }

  const args = process.argv.slice(2);
  let targetUrl = 'http://localhost:4321';
  let outputDir = path.join(process.cwd(), 'out-videos');
  let forceRerender = false;
  let statusOnly = false;
  let limitCount = Infinity;

  // Parse CLI args early
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      targetUrl = args[i + 1];
      i++;
    } else if (args[i] === '--out' && args[i + 1]) {
      outputDir = path.join(process.cwd(), args[i + 1]);
      i++;
    } else if (args[i] === '--force') {
      forceRerender = true;
    } else if (args[i] === '--status' || args[i] === '--check') {
      statusOnly = true;
    } else if (args[i] === '--limit' && args[i + 1]) {
      limitCount = parseInt(args[i + 1], 10) || Infinity;
      i++;
    }
  }

  let puppeteer;
  try {
    puppeteer = (await import('puppeteer')).default;
  } catch (err) {
    const manifestPath = path.join(outputDir, 'progress.json');
    if (statusOnly && fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        const pct = manifest.totalQuotes > 0 ? Math.round((manifest.completedCount / manifest.totalQuotes) * 100) : 0;
        console.log(`\n📊 Existing Progress Tracker (Manifest on disk):`);
        console.log(`-------------------------------------------------`);
        console.log(`Total Quotes:           ${manifest.totalQuotes}`);
        console.log(`✅ Already Generated:   ${manifest.completedCount} (${pct}%)`);
        console.log(`⏳ Remaining to Render: ${manifest.remainingCount}`);
        console.log(`🕒 Last Updated:        ${manifest.lastUpdated}`);
        console.log(`📝 Tracking Manifest:   ${manifestPath}`);
        console.log(`-------------------------------------------------\n`);
        if (manifest.remainingCount > 0) {
          console.log(`📋 Next Quotes Left to Generate:`);
          manifest.remaining.slice(0, 15).forEach((id, idx) => {
            console.log(`   ${idx + 1}. ${id}`);
          });
          if (manifest.remainingCount > 15) {
            console.log(`   ... and ${manifest.remainingCount - 15} more (see ${manifestPath})`);
          }
        } else {
          console.log(`🎉 All ${manifest.totalQuotes} quotes have been successfully generated!`);
        }
        return;
      } catch (_) {}
    }

    console.error('\n❌ Puppeteer is not installed.');
    console.error('To use the bulk video generator, please install it in your project:');
    console.error('\n  npm install -D puppeteer\n');
    process.exit(1);
  }

  // Normalize target URL (remove trailing slashes for clean hash routing)
  targetUrl = targetUrl.replace(/\/+$/, '');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n=================================================`);
  console.log(`🎬 Wiz Theme Bulk Video Generator & Tracker`);
  console.log(`=================================================`);
  console.log(`🎯 Target URL:  ${targetUrl}`);
  console.log(`📁 Output Dir:  ${outputDir}`);
  if (forceRerender) console.log(`⚡ Mode:        Force Re-render (--force enabled)`);
  if (limitCount < Infinity) console.log(`🔢 Limit:       Next ${limitCount} quote(s)`);
  console.log(``);

  // Helper: Check if video already exists on disk
  function isQuoteAlreadyGenerated(id) {
    const candidates = [
      `wisdom-${id}-video.mp4`,
      `wisdom-${id}-video.webm`,
      `${id}.mp4`,
      `${id}.webm`
    ];
    for (const filename of candidates) {
      const filePath = path.join(outputDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          const stat = fs.statSync(filePath);
          // Ensure file is non-empty (at least 20KB for a valid video file)
          if (stat.size > 20000) {
            return { exists: true, filename, size: stat.size };
          }
        } catch (_) {}
      }
    }
    return { exists: false };
  }

  // Helper: Format milliseconds into clean m:ss
  function formatDuration(ms) {
    const totalSecs = Math.round(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1080, height: 1920 }, // 9:16 aspect ratio
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu-vsync', '--force-device-scale-factor=1']
  });

  const page = await browser.newPage();
  
  // Intercept downloads to save to our output directory
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: outputDir
  });

  console.log(`⏳ Discovering quotes from ${targetUrl}...`);
  try {
    await page.goto(`${targetUrl}/`, { waitUntil: 'networkidle0', timeout: 35000 });
  } catch (e) {
    const manifestPath = path.join(outputDir, 'progress.json');
    if (statusOnly && fs.existsSync(manifestPath)) {
      console.log(`\nℹ️ Could not connect to ${targetUrl}. Reading status from existing manifest:`);
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        const pct = manifest.totalQuotes > 0 ? Math.round((manifest.completedCount / manifest.totalQuotes) * 100) : 0;
        console.log(`\n📊 Cached Progress Tracker:`);
        console.log(`-------------------------------------------------`);
        console.log(`Total Quotes:           ${manifest.totalQuotes}`);
        console.log(`✅ Already Generated:   ${manifest.completedCount} (${pct}%)`);
        console.log(`⏳ Remaining to Render: ${manifest.remainingCount}`);
        console.log(`🕒 Last Updated:        ${manifest.lastUpdated}`);
        console.log(`📝 Tracking Manifest:   ${manifestPath}`);
        console.log(`-------------------------------------------------\n`);
        if (manifest.remainingCount > 0) {
          console.log(`📋 Next Quotes Left to Generate:`);
          manifest.remaining.slice(0, 15).forEach((id, idx) => {
            console.log(`   ${idx + 1}. ${id}`);
          });
          if (manifest.remainingCount > 15) {
            console.log(`   ... and ${manifest.remainingCount - 15} more (see ${manifestPath})`);
          }
        } else {
          console.log(`🎉 All ${manifest.totalQuotes} quotes have been successfully generated!`);
        }
        await browser.close();
        return;
      } catch (_) {}
    }
    console.error(`❌ Failed to load ${targetUrl}. Is your dev server running?`);
    await browser.close();
    process.exit(1);
  }

  // Discover all quote IDs on the page (supports .reel-slide, .quote-slide, and [data-quote-id])
  const quoteIds = await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-quote-id]');
    const ids = [];
    elements.forEach(el => {
      const id = el.getAttribute('data-quote-id');
      if (id && !ids.includes(id)) ids.push(id);
    });
    return ids;
  });

  if (quoteIds.length === 0) {
    console.error(`❌ No quotes found on the page. Ensure the URL points to a master feed.`);
    await browser.close();
    process.exit(1);
  }

  // Scan output directory and classify quotes
  const alreadyGenerated = [];
  const remainingToRender = [];

  for (const id of quoteIds) {
    const check = isQuoteAlreadyGenerated(id);
    if (check.exists && !forceRerender) {
      alreadyGenerated.push({ id, filename: check.filename, size: check.size });
    } else {
      remainingToRender.push(id);
    }
  }

  // Save/Update progress manifest (progress.json)
  const manifestPath = path.join(outputDir, 'progress.json');
  const manifest = {
    totalQuotes: quoteIds.length,
    completedCount: alreadyGenerated.length,
    remainingCount: remainingToRender.length,
    completed: alreadyGenerated.map(item => item.id),
    remaining: remainingToRender,
    lastUpdated: new Date().toISOString()
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  // Print Summary Table
  const pct = Math.round((alreadyGenerated.length / quoteIds.length) * 100);
  console.log(`\n📊 Progress Tracker:`);
  console.log(`-------------------------------------------------`);
  console.log(`Total Quotes:           ${quoteIds.length}`);
  console.log(`✅ Already Generated:   ${alreadyGenerated.length} (${pct}%)`);
  console.log(`⏳ Remaining to Render: ${remainingToRender.length}`);
  console.log(`📝 Tracking Manifest:   ${manifestPath}`);
  console.log(`-------------------------------------------------\n`);

  if (statusOnly) {
    if (remainingToRender.length > 0) {
      console.log(`📋 Next Quotes Left to Generate:`);
      remainingToRender.slice(0, 15).forEach((id, idx) => {
        console.log(`   ${idx + 1}. ${id}`);
      });
      if (remainingToRender.length > 15) {
        console.log(`   ... and ${remainingToRender.length - 15} more (see ${manifestPath})`);
      }
    } else {
      console.log(`🎉 All ${quoteIds.length} quotes have been successfully generated!`);
    }
    await browser.close();
    return;
  }

  if (remainingToRender.length === 0) {
    console.log(`🎉 All ${quoteIds.length} videos already exist in ${outputDir}!`);
    console.log(`Tip: Pass --force to re-render all videos.\n`);
    await browser.close();
    return;
  }

  // Apply limit if specified
  const queueToProcess = remainingToRender.slice(0, limitCount);
  console.log(`🚀 Starting rendering queue: ${queueToProcess.length} video(s)...`);

  const startTime = Date.now();
  let completedInThisRun = 0;
  let failedInThisRun = 0;

  for (let i = 0; i < queueToProcess.length; i++) {
    const id = queueToProcess[i];
    const overallIndex = alreadyGenerated.length + i + 1;
    const remainingInQueue = queueToProcess.length - i;
    
    // Estimate ETA based on average render time (~14s per video)
    const elapsedRun = Date.now() - startTime;
    const avgPerItem = completedInThisRun > 0 ? (elapsedRun / completedInThisRun) : 14000;
    const estTimeLeft = avgPerItem * remainingInQueue;
    const etaStr = formatDuration(estTimeLeft);

    console.log(`[${overallIndex}/${quoteIds.length}] 🎬 Rendering ${id}... (Remaining: ${remainingInQueue} | ETA: ~${etaStr})`);

    try {
      // 1. Navigate to the specific quote hash to trigger the background update
      await page.goto(`${targetUrl}/#${id}`);
      await new Promise(r => setTimeout(r, 1200)); // Wait for slide to settle and background to paint

      // 2. Open the Share Modal for this quote
      const opened = await page.evaluate((quoteId) => {
        const btn = document.querySelector(`.action-btn-share[data-quote-id="${quoteId}"]`)
          || document.querySelector(`[data-quote-id="${quoteId}"] .on-screen-share-btn`)
          || document.querySelector(`.on-screen-share-btn[data-quote-id="${quoteId}"]`)
          || document.querySelector(`[data-quote-id="${quoteId}"] button`);
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      }, id);

      if (!opened) {
        console.warn(`   ⚠️ Could not find share button for ${id}. Skipping.`);
        failedInThisRun++;
        continue;
      }

      await new Promise(r => setTimeout(r, 800)); // Wait for modal animation

      // 3. Click the Share Video button to start the 10-second rendering process
      await page.evaluate(() => {
        const videoBtn = document.getElementById('share-video-btn');
        if (videoBtn) videoBtn.click();
      });

      console.log(`   ⏳ Recording & encoding 10s video...`);

      // 4. Wait for the download to complete (10s render + 2s buffer)
      await new Promise(r => setTimeout(r, 12000));

      // 5. Close the modal so we can proceed to the next quote
      await page.evaluate(() => {
        const closeBtn = document.getElementById('share-close-btn');
        if (closeBtn) closeBtn.click();
      });
      await new Promise(r => setTimeout(r, 400)); 

      completedInThisRun++;
      console.log(`   ✅ Finished ${id}`);

      // Update progress manifest on the fly after every quote
      manifest.completed.push(id);
      manifest.completedCount = manifest.completed.length;
      manifest.remaining = manifest.remaining.filter(remId => remId !== id);
      manifest.remainingCount = manifest.remaining.length;
      manifest.lastUpdated = new Date().toISOString();
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

    } catch (err) {
      failedInThisRun++;
      console.error(`   ❌ Error rendering ${id}:`, err.message);
    }
  }

  const totalElapsed = formatDuration(Date.now() - startTime);
  console.log(`\n=================================================`);
  console.log(`🏁 Video Generation Batch Finished!`);
  console.log(`=================================================`);
  console.log(`⏱️ Total Time:  ${totalElapsed}`);
  console.log(`✅ Rendered:    ${completedInThisRun}`);
  if (failedInThisRun > 0) console.log(`⚠️ Failed:      ${failedInThisRun}`);
  console.log(`📁 Saved in:    ${outputDir}`);
  console.log(`📝 Manifest:    ${manifestPath}\n`);

  await browser.close();
}

run().catch(console.error);
