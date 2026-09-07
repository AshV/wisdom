# Wisdom — Timeless Quotes, Reimagined

An immersive, TikTok/Reels-style vertical quote feed built with [Astro](https://astro.build/) and TailwindCSS. Designed as a fully static web application hosted on GitHub Pages.

---

## ⚙️ Configuration: Quote Randomization & Non-Repeating Window

To ensure a fresh experience on every visit and prevent repetitive content, quotes are randomized on load, and **recently viewed quotes are remembered so they are not shown again until older quotes have cycled through**.

### Where is the Non-Repeating Limit Configured?

The non-repeating limit is configured in [`src/layouts/BaseLayout.astro`](file:///a:/GitHub/wisdom/src/layouts/BaseLayout.astro) inside `window.recentQuotes`:

```javascript
// ── Recent Viewed Quotes Store (FIFO Queue) ──
window.recentQuotes = {
  _key: 'wisdom_recent_quotes',
  _max: 50, // <-- Configure the non-repeating window size here (e.g. 50, 75, 100)
  getAll() {
    ...
  },
  ...
};
```

### How It Works:
1. **Single Source of Truth**: Changing `_max` (e.g., from `50` to `100`) automatically adjusts the number of quotes retained in `localStorage` (`wisdom_recent_quotes`).
2. **Dynamic Exclusion in Feeds**: [`src/components/ReelFeed.astro`](file:///a:/GitHub/wisdom/src/components/ReelFeed.astro) reads `window.recentQuotes.getAll()`:
   - **Initial Page Load**: Quotes not in the user's recent history are randomized using Fisher-Yates and served first. Quotes currently in the recent history are moved to the end (sorted by least-recently-seen).
   - **Continuous Scroll (`appendNextBatch`)**: When scrolling near the bottom, new quotes are dynamically pulled from the in-memory catalog (`window.__wisdomQuoteMap`), strictly excluding any quote present in the user's recent history.
   - **Filtered Feeds (Author / Category / Mood / Tag)**: Always prioritizes unseen quotes matching the topic first.

---

## 🛡️ Anti-Thin-Content Architecture (Google Helpful Content & SEO Safeguards)

To eliminate the risk of Google's **Helpful Content System** and **Search Essentials "Thin Content" penalties** that affect generic quote scrapers:

1. **Sitemap Pruning (97% Reduction in Index Bloat)**:
   - `sitemap-0.xml` strictly curates **~145 high-density Hub pages**: Homepage, Roadmap (`/todo/`), Author Hubs (`/author/[slug]/`), Category Hubs (`/category/[slug]/`), and Mood Hubs (`/mood/[slug]/`).
   - Single quote pages (`/quote/*`) and tag taxonomy pages (`/tag/*`) are strictly excluded from the sitemap.
2. **Robots Meta Directives (`noindex, follow`)**:
   - Single quote pages output `<meta name="robots" content="noindex, follow" />`.
   - **Full Social Sharing Preserved**: OpenGraph and Twitter card meta tags remain 100% active, ensuring beautiful preview cards on WhatsApp, Twitter/X, LinkedIn, and Facebook.
   - Crawlers follow links directly into author and category hubs without indexing single-sentence landing pages.
3. **Scholarly Author & Category Pillar Pages (E-E-A-T)**:
   - Author hubs feature rich biographical context, philosophical tradition badges, primary sourced works bibliographies, core philosophical tenets, and Schema.org `Person` / `CollectionPage` structured data.
   - Category hubs feature philosophical essays and thematic taxonomies.

---

## 🧞 Commands

All commands are run from the root of the project:

| Command         | Action                                            |
| :-------------- | :------------------------------------------------ |
| `npm install`   | Installs dependencies                             |
| `npm run dev`   | Starts local dev server at `http://localhost:4321/wisdom/` |
| `npm run build` | Builds the production static site to `./dist/`    |
| `npm run preview` | Previews the build output locally               |

---

## 📜 Author Expansion Roadmap & ToDo

Wisdom prioritizes **timeless thinkers across human history** (ancient philosophers, mystics, classic literature, pioneering scientists) over transient pop-culture celebrity noise.

- Product & Technical Roadmap: [`ROADMAP.md`](file:///a:/GitHub/wisdom/ROADMAP.md)
- Detailed Author Expansion Roadmap: [`TODO.md`](file:///a:/GitHub/wisdom/TODO.md)
- Web Page: [`/wisdom/todo/`](https://www.ashishvishwakarma.com/wisdom/todo/)
- Current 100+ Batches: **Aristotle** (107), **Socrates** (107), **Plato** (106), **Marcus Aurelius** (114), **Seneca** (114), **Epictetus** (112), **Lao Tzu** (112), **Friedrich Nietzsche** (110), **Alan Watts** (107), **Carl Jung** (104), **Rumi** (115), **Osho** (100).
- Next Immediate Priorities: **Epicurus**, **Heraclitus**, **Cicero** (Tier 2 Classical Philosophy).

---

## 🚀 Project Structure

```text
/
├── public/
│   ├── media/          # Ambient background videos and audio chimes
│   └── og-image.jpg    # Social share card preview
├── src/
│   ├── components/
│   │   ├── ReelFeed.astro         # Main scroll-snap reel feed & infinite stream
│   │   ├── ReelSlide.astro        # Individual quote typography slide
│   │   ├── RightActionRail.astro  # Like, chime, share, explore drawer buttons
│   │   ├── ExploreDrawer.astro    # Discovery sheet (Liked, Moods, Categories, Authors, Tags)
│   │   ├── GlobalBackground.astro # Video and gradient backdrop player
│   │   └── ShareModal.astro       # Share drawer with 4:5 image generator
│   ├── data/
│   │   ├── mediaRegistry.ts       # Video, audio, and mood metadata mappings
│   │   └── quotes/                # 1,700 curated quote JSON files (q001.json - q1700.json)
│   ├── layouts/
│   │   └── BaseLayout.astro       # Base layout, audio engine, and recentQuotes store
│   └── pages/
│       ├── index.astro            # Master feed
│       ├── todo.astro             # Author expansion roadmap & ToDo page
│       ├── quote/[slug].astro     # Individual quote canonical pages
│       ├── author/[slug].astro    # Author feeds
│       ├── category/[slug].astro  # Category feeds
│       ├── mood/[slug].astro      # Mood feeds
│       └── tag/[slug].astro       # Tag feeds
├── TODO.md                        # Author roadmap & contribution guidelines
└── astro.config.mjs
```

