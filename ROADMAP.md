# 🗺️ Wisdom — Product & Technical Roadmap

This roadmap tracks technical architecture, progressive web app (PWA) capabilities, user experience enhancements, and quality verification for the Wisdom platform.

For the catalog expansion roadmap of timeless thinkers, see [`TODO.md`](file:///a:/GitHub/wisdom/TODO.md).

---

## 📌 Active & Upcoming Milestones

### 1. 🏛️ Author Expansion: Aristotle & Classical Thinkers (Milestone 1,700 Quotes Achieved)
- [x] **Aristotle (384 – 322 BC)**: Added 100 verified quotes (`q1601` – `q1700`) from *Nicomachean Ethics*, *Politics*, *Poetics*, *Metaphysics*, and *Rhetoric*. Aristotle expanded to **107 quotes**; **1,700 catalog quotes milestone** reached.
- [x] Added Aristotle scholarly profile, key works, and philosophical pillars to [`src/data/authorProfiles.ts`](file:///a:/GitHub/wisdom/src/data/authorProfiles.ts).
- [x] Marked Aristotle as completed on [`src/pages/todo.astro`](file:///a:/GitHub/wisdom/src/pages/todo.astro) and [`TODO.md`](file:///a:/GitHub/wisdom/TODO.md).
- [ ] Next Tier 2 thinkers queued: **Epicurus** (341 – 270 BC), **Heraclitus** (c. 535 – c. 475 BC), **Cicero** (106 – 43 BC).

---

### 2. 🎨 Visual Verification & UX Polish (Queued)
- [ ] **Desktop & Mobile Testing**: Use browser automation / visual testing on `/wisdom/author/socrates/` and `/wisdom/category/philosophy/`.
- [ ] **Context Drawers**: Verify the "About [Author]" and "About [Category]" glassmorphic modal panels:
  - Check backdrop blur, entry/exit transitions, and scrollbar behavior on mobile viewports.
  - Verify accessibility (Escape key, background click dismissal, aria labels).
  - Ensure title and bio hierarchy look sharp across all screen densities.
- [ ] **Top Bar Balance**: Ensure the author context button, back button, and reel counter do not collide on narrow 320px–375px mobile screens.

---

### 3. 📱 Progressive Web App (PWA) & Offline Sanctuary (COMPLETED)
- [x] **Creative AI App Logo**: Generated sacred illuminated golden "W" emblem with celestial scroll and sacred geometry; derived pixel-perfect icons via `sharp`.
- [x] **Web App Manifest (`manifest.webmanifest` & `site.webmanifest`)**:
  - App Name: `Wisdom — Timeless Quotes`
  - Short Name: `Wisdom`
  - Display mode: `standalone` (fullscreen, no browser URL bar)
  - Theme color: `#0a0a0f`, background: `#0a0a0f`
  - High-resolution app icons (192x192, 512x512, maskable 192/512, apple-touch-icon 180x180, favicon.png)
  - App shortcuts: `Daily Reflection` and `Explore Thinkers`
- [x] **Service Worker & Offline Caching Engine (`sw.js`)**:
  - Pre-caches core app shell, fonts, styles, scripts, and audio chimes.
  - Stale-while-revalidate for visited quote reels and author hubs.
  - Full offline fallback to root sanctuary when disconnected.
- [x] **Offline Sanctuary Indicator**:
  - Ambient glowing indicator (`🌿 Offline Sanctuary Active`) automatically revealed when disconnected.
- [x] **Mindful Engagement-Gated Install Prompt**:
  - Respectful UX: Prompts after 45s of meditation or 4+ quote views.
  - 14-day snooze on dismissal.
  - On-demand "Install App" button in Explore Drawer.
- [x] **Legacy Asset Removal**:
  - Removed all 16 unused `.mp4` video files (~45MB dead weight eliminated). Wisdom runs 100% on HTML5 Canvas line art and CSS gradient mesh.

---

### 4. 🧘 Daily Contemplation Rituals & Local Notifications (Phase 1 COMPLETED)
- [x] **Zero-Server Private Daily Rituals Engine**:
  - Deterministic 366-day quote resolver (`src/utils/dailyQuote.ts` & `public/daily-quotes.json`) drawing from the 12 master thinkers.
  - Zero-cloud, zero-tracking: 100% private, runs directly on client device / service worker.
- [x] **Sacred Lock Screen Notifications**:
  - **🌅 Morning Reflection**: User-chosen time (default 08:00). Full quote + author formatted cleanly for lock screens and smartwatches.
  - **🌌 Evening Stillness**: User-chosen time (default 21:00) for night winding down.
  - **Anti-Spam Permission UX**: Notification permissions are never prompted on page load; requested strictly upon engaging ritual switches.
- [x] **🔔 In-App Zen Contemplation Bell**:
  - Periodic mindfulness interval (every 5, 10, 15, or 20 minutes) playing a soothing Tibetan singing bowl chime (`zen-chime.wav`).
  - Subtle breathing moment indicator (`#zen-breath-pill`: *"✦ A moment of stillness... pause and breathe"*) to ground reading.
- [x] **Explore Drawer Rituals Hub**:
  - Added dedicated "🧘 Rituals" tab with live time selectors, toggle switches, interval configuration, and "Preview Daily Reflection Now" test runner.
- [ ] **Phase 2 (Future / Backlog)**:
  - Dedicated `/wisdom/today/` permalink page with high-res daily contemplation card generator.
  - Periodic Background Sync optimization for chromium browsers when supported.

---

## 🛡️ Completed Foundations
- [x] **Deduplication Engine**: 50-quote rolling exclusion window in `localStorage` (`window.recentQuotes`).
- [x] **Anti-Thin-Content SEO Architecture**:
  - Sitemap pruned to **145 high-density collection hubs** (97% index bloat eliminated).
  - Single-quote pages and tag pages set to `noindex, follow` (preserving rich OpenGraph social share previews).
  - Author and category pages enriched with 200+ word scholarly biographies, primary source bibliographies, philosophical tenets, and Schema.org `Person` / `CollectionPage` JSON-LD.
- [x] **12 Authors with 100+ Verified Quotes**: Aristotle (107), Socrates (107), Plato (106), Marcus Aurelius (114), Seneca (114), Epictetus (112), Lao Tzu (112), Friedrich Nietzsche (110), Alan Watts (107), Carl Jung (104), Rumi (115), Osho (100). Total: **1,700 quotes**.
