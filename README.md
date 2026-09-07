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

- Detailed Roadmap & Editorial Guidelines: [`TODO.md`](file:///a:/GitHub/wisdom/TODO.md)
- Web Page: [`/wisdom/todo/`](https://www.ashishvishwakarma.com/wisdom/todo/)
- Current 100+ Batches: **Plato** (106), **Marcus Aurelius** (114), **Seneca** (114), **Rumi** (115), **Osho** (100).
- Next Immediate Priorities: **Epictetus**, **Lao Tzu**, **Friedrich Nietzsche**, **Alan Watts**, **Carl Jung**.

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
│   │   └── quotes/                # 1,000 curated quote JSON files (q001.json - q1000.json)
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

