#!/usr/bin/env node

/**
 * wisdom social media publisher
 * 
 * Direct Code API publisher for YouTube Shorts & Instagram Reels
 * 
 * Usage:
 *   npx wisdom publish --youtube
 *   npx wisdom publish --instagram
 *   npx wisdom publish --all
 *   npx wisdom publish --status
 *   npx wisdom publish --auth-youtube
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── 1. Load .env without external dependencies ─────────────────────────────
function loadEnv() {
  const candidatePaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '..', '.env'),
    path.join(__dirname, '..', '.env'),
  ];
  for (const envPath of candidatePaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      } catch (_) {}
    }
  }
}
loadEnv();

// ─── 2. CLI Argument Parsing ───────────────────────────────────────────────
const rawArgs = process.argv.slice(2);

let publishYouTube = false;
let publishInstagram = false;
let checkStatus = false;
let dryRun = false;
let authYouTube = false;
let targetId = null;
let limitCount = Infinity;
let scheduleIntervalHours = 24; // Default: 1 post per day
let initialScheduleDate = null;
let outputDir = path.join(process.cwd(), 'out-videos');

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--youtube' || arg === '-yt') {
    publishYouTube = true;
  } else if (arg === '--instagram' || arg === '-ig') {
    publishInstagram = true;
  } else if (arg === '--all') {
    publishYouTube = true;
    publishInstagram = true;
  } else if (arg === '--status' || arg === '--check') {
    checkStatus = true;
  } else if (arg === '--dry-run') {
    dryRun = true;
  } else if (arg === '--auth-youtube') {
    authYouTube = true;
  } else if (arg === '--id' && rawArgs[i + 1]) {
    targetId = rawArgs[i + 1];
    i++;
  } else if (arg === '--limit' && rawArgs[i + 1]) {
    limitCount = parseInt(rawArgs[i + 1], 10) || Infinity;
    i++;
  } else if (arg === '--schedule-interval' && rawArgs[i + 1]) {
    scheduleIntervalHours = parseFloat(rawArgs[i + 1]) || 24;
    i++;
  } else if (arg === '--schedule' && rawArgs[i + 1]) {
    initialScheduleDate = new Date(rawArgs[i + 1]);
    i++;
  } else if (arg === '--out' && rawArgs[i + 1]) {
    outputDir = path.join(process.cwd(), rawArgs[i + 1]);
    i++;
  } else if (arg === '--help' || arg === '-h') {
    printHelp();
    process.exit(0);
  }
}

function printHelp() {
  console.log(`
🚀 Wisdom Direct Code API Publisher
==================================================
Publish or schedule vertical reels directly to YouTube Shorts and Instagram Reels.

Usage:
  npx wisdom publish [platforms] [options]
  node wisdom/bin/publish.js [platforms] [options]

Platforms:
  --youtube, -yt           Publish to YouTube Shorts
  --instagram, -ig         Publish to Instagram Reels (via Cloudinary + Meta Graph API)
  --all                    Publish to both YouTube Shorts and Instagram Reels

Options:
  --status, --check        Check publishing status queue (what is published vs pending)
  --id <quoteId>           Publish a specific quote only (e.g. --id q001)
  --limit <number>         Publish up to N pending quotes
  --schedule <ISO_DATE>    Set initial schedule date/time (e.g. "2026-10-21T08:00:00Z")
  --schedule-interval <H>  Hours between scheduled posts (default: 24 = 1 post/day)
  --dry-run                Validate credentials, files, and captions without uploading
  --auth-youtube           Launch 1-click browser authorization to obtain YouTube Refresh Token
  --out <dir>              Directory where videos and metadata live (default: ./out-videos)
  -h, --help               Show this manual

Required Environment Variables (.env):
  YouTube Shorts:
    YOUTUBE_CLIENT_ID
    YOUTUBE_CLIENT_SECRET
    YOUTUBE_REFRESH_TOKEN (obtained via: npx wisdom publish --auth-youtube)

  Instagram Reels:
    CLOUDINARY_CLOUD_NAME
    CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET
    INSTAGRAM_ACCOUNT_ID
    INSTAGRAM_ACCESS_TOKEN
`);
}

// ─── 3. YouTube 1-Click OAuth2 Authorizer ──────────────────────────────────
async function handleYouTubeAuth() {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error(`\n❌ Missing YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET in .env`);
    console.error(`1. Go to Google Cloud Console (https://console.cloud.google.com)`);
    console.error(`2. Enable "YouTube Data API v3"`);
    console.error(`3. Create an OAuth 2.0 Client ID (Web Application or Desktop App)`);
    console.error(`4. Add redirect URI: http://localhost:8989/oauth2callback`);
    console.error(`5. Add YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET to your .env file.\n`);
    process.exit(1);
  }

  const port = 8989;
  const redirectUri = `http://localhost:${port}/oauth2callback`;
  const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube');
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  console.log(`\n==================================================`);
  console.log(`🔐 YouTube Shorts 1-Click Authorization`);
  console.log(`==================================================`);
  console.log(`1. Open this authorization URL in your browser:\n`);
  console.log(`   \x1b[36m${authUrl}\x1b[0m\n`);
  console.log(`2. Waiting for your authorization on ${redirectUri}...`);

  const server = http.createServer(async (req, res) => {
    const reqUrl = new URL(req.url, `http://localhost:${port}`);
    if (reqUrl.pathname === '/oauth2callback') {
      const code = reqUrl.searchParams.get('code');
      const err = reqUrl.searchParams.get('error');

      if (err) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end(`<h1>❌ Authorization Failed</h1><p>${err}</p>`);
        console.error(`❌ Authorization failed: ${err}`);
        server.close();
        process.exit(1);
      }

      if (code) {
        try {
          const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              code,
              client_id: clientId,
              client_secret: clientSecret,
              redirect_uri: redirectUri,
              grant_type: 'authorization_code',
            }),
          });

          const tokenData = await tokenRes.json();
          if (tokenData.refresh_token) {
            // Append or update .env
            const envPath = path.join(process.cwd(), '.env');
            let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
            if (envContent.includes('YOUTUBE_REFRESH_TOKEN=')) {
              envContent = envContent.replace(/YOUTUBE_REFRESH_TOKEN=.*/, `YOUTUBE_REFRESH_TOKEN=${tokenData.refresh_token}`);
            } else {
              envContent += `\nYOUTUBE_REFRESH_TOKEN=${tokenData.refresh_token}\n`;
            }
            fs.writeFileSync(envPath, envContent, 'utf-8');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>✅ Success!</h1><p>YouTube authorization complete. You can close this tab and return to the terminal.</p>`);
            console.log(`\n🎉 Successfully obtained YouTube Refresh Token!`);
            console.log(`💾 Saved to ${envPath}\n`);
          } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`<h1>⚠️ No Refresh Token Received</h1><p>Google did not return a refresh token. Try removing app permissions in your Google account and re-authorizing with prompt=consent.</p>`);
            console.error(`⚠️ No refresh token returned. Response:`, tokenData);
          }
        } catch (exchangeErr) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`<h1>❌ Exchange Error</h1><p>${exchangeErr.message}</p>`);
          console.error(`❌ Token exchange error:`, exchangeErr.message);
        }
        server.close();
      }
    }
  });

  server.listen(port);
}

// ─── 4. YouTube API Uploader (Zero External Dependency) ─────────────────────
async function getYouTubeAccessToken() {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing YouTube credentials. Run `npx wisdom publish --auth-youtube` to authorize.');
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`YouTube OAuth token refresh failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function uploadToYouTubeShorts({ videoPath, coverPath, quote, caption, scheduleDate, dryRun }) {
  const title = `"${quote.quote || quote.content}" — ${quote.author} #Shorts`;
  const truncatedTitle = title.length > 95 ? title.slice(0, 92) + '...' : title;

  const tags = ['Shorts', 'Wisdom', quote.author, quote.category, ...(quote.tags || [])]
    .filter(Boolean)
    .map(t => String(t).replace(/[#\s]/g, ''))
    .slice(0, 15);

  const statusConfig = scheduleDate
    ? { privacyStatus: 'private', publishAt: scheduleDate.toISOString() }
    : { privacyStatus: 'public' };

  if (dryRun) {
    console.log(`   [DRY-RUN YouTube] Would upload ${videoPath}`);
    console.log(`      Title:        ${truncatedTitle}`);
    console.log(`      Tags:         ${tags.join(', ')}`);
    console.log(`      Privacy:      ${statusConfig.privacyStatus} ${statusConfig.publishAt ? `(Scheduled: ${statusConfig.publishAt})` : '(Immediate)'}`);
    return { id: 'dry-run-yt-id', url: 'https://youtube.com/shorts/dry-run' };
  }

  const accessToken = await getYouTubeAccessToken();
  const fileStat = fs.statSync(videoPath);
  const fileStream = fs.createReadStream(videoPath);

  // 1. Initial resumable upload initiation
  const metadata = {
    snippet: {
      title: truncatedTitle,
      description: caption + '\n\n#Shorts #Wisdom #Quotes',
      tags,
      categoryId: '27', // Education / Philosophy
    },
    status: statusConfig,
  };

  const initRes = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Upload-Content-Length': fileStat.size.toString(),
      'X-Upload-Content-Type': 'video/mp4',
    },
    body: JSON.stringify(metadata),
  });

  if (!initRes.ok) {
    const errText = await initRes.text();
    throw new Error(`YouTube upload initiation failed (${initRes.status}): ${errText}`);
  }

  const uploadUrl = initRes.headers.get('location');
  if (!uploadUrl) {
    throw new Error('YouTube did not return a resumable upload URL.');
  }

  // 2. Stream video buffer
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': fileStat.size.toString(),
      'Content-Type': 'video/mp4',
    },
    body: fileStream,
    duplex: 'half',
  });

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    throw new Error(`YouTube video transfer failed (${uploadRes.status}): ${errText}`);
  }

  const videoData = await uploadRes.json();
  const videoId = videoData.id;
  const shortsUrl = `https://youtube.com/shorts/${videoId}`;

  // 3. Set custom thumbnail if available
  if (coverPath && fs.existsSync(coverPath)) {
    try {
      const coverStat = fs.statSync(coverPath);
      const coverStream = fs.createReadStream(coverPath);
      await fetch(`https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId=${videoId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Length': coverStat.size.toString(),
          'Content-Type': 'image/png',
        },
        body: coverStream,
        duplex: 'half',
      });
    } catch (_) {}
  }

  return { id: videoId, url: shortsUrl, publishAt: statusConfig.publishAt || null };
}

// ─── 5. Cloudinary Temporary Hosting Uploader ──────────────────────────────
async function uploadToCloudinary(filePath, resourceType = 'video') {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary credentials in .env (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).');
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'wisdom_social_reels';
  const paramString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(paramString).digest('hex');

  const formData = new FormData();
  formData.append('file', new Blob([fs.readFileSync(filePath)]), path.basename(filePath));
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.secure_url) {
    throw new Error(`Cloudinary ${resourceType} upload failed: ${JSON.stringify(data)}`);
  }
  return { secureUrl: data.secure_url, publicId: data.public_id };
}

async function deleteFromCloudinary(publicId, resourceType = 'video') {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const timestamp = Math.round(Date.now() / 1000);
    const paramString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(paramString).digest('hex');

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
      method: 'POST',
      body: formData,
    });
  } catch (_) {}
}

// ─── 6. Meta / Instagram Graph API Reels Publisher ─────────────────────────
async function uploadToInstagramReels({ videoPath, coverPath, caption, scheduleDate, dryRun }) {
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accountId || !accessToken) {
    throw new Error('Missing Instagram credentials in .env (INSTAGRAM_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN).');
  }

  if (dryRun) {
    console.log(`   [DRY-RUN Instagram] Would host on Cloudinary and post to Instagram Reels`);
    console.log(`      Account ID:   ${accountId}`);
    console.log(`      Cover File:   ${coverPath}`);
    console.log(`      Schedule:     ${scheduleDate ? scheduleDate.toISOString() : 'Immediate'}`);
    return { id: 'dry-run-ig-id', url: 'https://instagram.com/reel/dry-run' };
  }

  // 1. Upload video to Cloudinary
  console.log(`      ☁️ Uploading video to Cloudinary...`);
  const uploadedVideo = await uploadToCloudinary(videoPath, 'video');

  let uploadedCover = null;
  if (coverPath && fs.existsSync(coverPath)) {
    try {
      console.log(`      ☁️ Uploading cover thumbnail to Cloudinary...`);
      uploadedCover = await uploadToCloudinary(coverPath, 'image');
    } catch (_) {}
  }

  try {
    // 2. Create Instagram Reels Container
    console.log(`      📸 Initiating Instagram Reel container...`);
    const containerParams = new URLSearchParams({
      media_type: 'REELS',
      video_url: uploadedVideo.secureUrl,
      caption,
      share_to_feed: 'true',
      access_token: accessToken,
    });

    if (uploadedCover?.secureUrl) {
      containerParams.append('cover_url', uploadedCover.secureUrl);
    }

    if (scheduleDate) {
      const scheduledEpoch = Math.floor(scheduleDate.getTime() / 1000);
      containerParams.append('scheduled_publish_time', scheduledEpoch.toString());
    }

    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${accountId}/media`, {
      method: 'POST',
      body: containerParams,
    });

    const containerData = await containerRes.json();
    if (!containerRes.ok || !containerData.id) {
      throw new Error(`Instagram container creation failed: ${JSON.stringify(containerData)}`);
    }

    const creationId = containerData.id;

    // 3. Wait for Meta servers to download & encode video
    console.log(`      ⏳ Waiting for Meta video processing...`);
    let isReady = false;
    let attempts = 0;
    while (!isReady && attempts < 30) {
      await new Promise(r => setTimeout(r, 4000));
      attempts++;
      const statusRes = await fetch(`https://graph.facebook.com/v19.0/${creationId}?fields=status_code&access_token=${accessToken}`);
      const statusData = await statusRes.json();

      if (statusData.status_code === 'FINISHED') {
        isReady = true;
      } else if (statusData.status_code === 'ERROR') {
        throw new Error(`Meta video processing failed: ${JSON.stringify(statusData)}`);
      }
    }

    if (!isReady) {
      throw new Error('Meta video processing timed out after 2 minutes.');
    }

    // 4. Publish Container (only if not scheduled in advance)
    let mediaId = creationId;
    if (!scheduleDate) {
      console.log(`      🚀 Publishing Reel to feed...`);
      const publishRes = await fetch(`https://graph.facebook.com/v19.0/${accountId}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          creation_id: creationId,
          access_token: accessToken,
        }),
      });
      const publishData = await publishRes.json();
      if (!publishRes.ok || !publishData.id) {
        throw new Error(`Instagram publishing failed: ${JSON.stringify(publishData)}`);
      }
      mediaId = publishData.id;
    }

    return {
      id: mediaId,
      url: `https://www.instagram.com/reel/${mediaId}/`,
      scheduled: !!scheduleDate,
      publishAt: scheduleDate ? scheduleDate.toISOString() : null,
    };

  } finally {
    // 5. Cleanup temporary Cloudinary assets to preserve free tier storage
    await deleteFromCloudinary(uploadedVideo.publicId, 'video');
    if (uploadedCover?.publicId) {
      await deleteFromCloudinary(uploadedCover.publicId, 'image');
    }
  }
}

// ─── 7. Main Publishing Loop ────────────────────────────────────────────────
async function run() {
  if (authYouTube) {
    await handleYouTubeAuth();
    return;
  }

  const socialJsonPath = path.join(outputDir, 'social-posts.json');
  if (!fs.existsSync(socialJsonPath)) {
    console.error(`❌ No social-posts.json found in ${outputDir}.`);
    console.error(`Run video/caption generation first:\n  npm run generate:videos\n`);
    process.exit(1);
  }

  const logPath = path.join(outputDir, 'publishing-log.json');
  let publishLog = {};
  if (fs.existsSync(logPath)) {
    try {
      publishLog = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
    } catch (_) {}
  }

  const posts = JSON.parse(fs.readFileSync(socialJsonPath, 'utf-8'));

  // Status check only
  if (checkStatus) {
    console.log(`\n📊 Social Media Publishing Status:`);
    console.log(`==================================================`);
    console.log(`Total Posts in Queue: ${posts.length}`);
    let ytCount = 0;
    let igCount = 0;
    posts.forEach(p => {
      const entry = publishLog[p.id] || {};
      if (entry.youtube) ytCount++;
      if (entry.instagram) igCount++;
    });
    console.log(`🔴 YouTube Shorts Published:   ${ytCount} / ${posts.length}`);
    console.log(`🟣 Instagram Reels Published:  ${igCount} / ${posts.length}`);
    console.log(`📁 Asset Folder:               ${outputDir}`);
    console.log(`==================================================\n`);

    posts.slice(0, 10).forEach((p, idx) => {
      const entry = publishLog[p.id] || {};
      const ytStatus = entry.youtube ? `✅ YouTube (${entry.youtube.id})` : '⏳ Pending YouTube';
      const igStatus = entry.instagram ? `✅ IG (${entry.instagram.id})` : '⏳ Pending IG';
      console.log(` ${idx + 1}. [${p.id}] ${p.author}: ${ytStatus} | ${igStatus}`);
    });
    if (posts.length > 10) {
      console.log(` ... and ${posts.length - 10} more in ${socialJsonPath}`);
    }
    console.log(``);
    return;
  }

  if (!publishYouTube && !publishInstagram) {
    console.log(`\n⚠️ Please specify at least one platform to publish to:`);
    console.log(`  --youtube    (Publish to YouTube Shorts)`);
    console.log(`  --instagram  (Publish to Instagram Reels)`);
    console.log(`  --all        (Publish to both)`);
    console.log(`\nRun \`npx wisdom publish --help\` for details.\n`);
    return;
  }

  // Filter posts
  let queue = posts.filter(p => {
    if (targetId && p.id !== targetId) return false;
    const entry = publishLog[p.id] || {};
    const needsYt = publishYouTube && !entry.youtube;
    const needsIg = publishInstagram && !entry.instagram;
    return needsYt || needsIg;
  });

  if (queue.length === 0) {
    console.log(`\n🎉 All requested posts have already been published!`);
    console.log(`Check status with: npx wisdom publish --status\n`);
    return;
  }

  const toProcess = queue.slice(0, limitCount);
  console.log(`\n🚀 Starting Publishing Queue: ${toProcess.length} post(s)...`);
  if (dryRun) console.log(`🔍 Mode: DRY RUN (No actual uploads will occur)\n`);

  let scheduleDateCursor = initialScheduleDate ? new Date(initialScheduleDate) : null;

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i];
    const logEntry = publishLog[post.id] || { id: post.id, lastUpdated: new Date().toISOString() };

    const videoPath = path.join(outputDir, post.videoFile || `wisdom-${post.id}-video.mp4`);
    const coverPath = path.join(outputDir, post.coverFile || `wisdom-${post.id}-cover.png`);
    const captionPath = path.join(outputDir, post.captionFile || `wisdom-${post.id}-caption.txt`);

    let caption = post.caption;
    if (!caption && fs.existsSync(captionPath)) {
      caption = fs.readFileSync(captionPath, 'utf-8');
    }

    console.log(`[${i + 1}/${toProcess.length}] 📤 Publishing ${post.id} (${post.author})...`);

    // Calculate staggered schedule date if enabled
    let itemScheduleDate = null;
    if (scheduleDateCursor) {
      itemScheduleDate = new Date(scheduleDateCursor);
      scheduleDateCursor = new Date(scheduleDateCursor.getTime() + scheduleIntervalHours * 3600 * 1000);
    }

    // 1. YouTube Shorts
    if (publishYouTube && !logEntry.youtube) {
      try {
        console.log(`   🎬 Uploading to YouTube Shorts...`);
        const ytRes = await uploadToYouTubeShorts({
          videoPath,
          coverPath,
          quote: post,
          caption,
          scheduleDate: itemScheduleDate,
          dryRun,
        });
        logEntry.youtube = ytRes;
        console.log(`   ✅ YouTube Shorts: ${ytRes.url}`);
      } catch (err) {
        console.error(`   ❌ YouTube Failed: ${err.message}`);
      }
    }

    // 2. Instagram Reels
    if (publishInstagram && !logEntry.instagram) {
      try {
        console.log(`   📸 Uploading to Instagram Reels...`);
        const igRes = await uploadToInstagramReels({
          videoPath,
          coverPath,
          caption,
          scheduleDate: itemScheduleDate,
          dryRun,
        });
        logEntry.instagram = igRes;
        console.log(`   ✅ Instagram Reels: ${igRes.url}`);
      } catch (err) {
        console.error(`   ❌ Instagram Failed: ${err.message}`);
      }
    }

    logEntry.lastUpdated = new Date().toISOString();
    publishLog[post.id] = logEntry;
    fs.writeFileSync(logPath, JSON.stringify(publishLog, null, 2), 'utf-8');
    console.log(``);
  }

  console.log(`🏁 Publishing batch complete. Log saved to: ${logPath}\n`);
}

run().catch(console.error);
