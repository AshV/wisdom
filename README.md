# wisdom (wiz-theme)

> High-performance immersive quote reel theme for **Astro** featuring dynamic shaders, ambient zen soundscapes, editorial modals, and full single-language script support (Hindi, Devanagari, Spanish, English, and custom scripts).

🔗 **Theme Showcase & Docs:** [https://www.ashishvishwakarma.com/wisdom/](https://www.ashishvishwakarma.com/wisdom/)  
🇪🇸 **Live Demo (Elemento — Spanish):** [https://www.ashishvishwakarma.com/elemento/](https://www.ashishvishwakarma.com/elemento/)  
🇬🇧 **Live Demo (Element — English):** [https://www.ashishvishwakarma.com/element/](https://www.ashishvishwakarma.com/element/)  
🇮🇳 **Live Demo (Tatva — Hindi/Devanagari):** [https://www.ashishvishwakarma.com/tatva/](https://www.ashishvishwakarma.com/tatva/)

---

## Features

- 📱 **Full-Screen Vertical Reels**: Smooth scroll-snap interaction, swipe gestures, double-tap to like, and full keyboard navigation.
- 🌐 **Single-Language Localization**: Dedicated built-in support for Spanish (`es`), Hindi (`hi`), and English (`en`), plus extensible translation dictionaries for any script or language (Tamil, Bengali, Arabic, etc.).
- ✍️ **Curated Typography Presets**:
  - **Hindi (Devanagari)**: *Rozha One* (headline display), *Noto Serif Devanagari* (editorial), and *Mukta* (modern UI sans).
  - **English (Latin)**: *Playfair Display*, *Cormorant Garamond*, and *Inter*.
  - Automatic Google Fonts stylesheet injection, zero-FOUT font preloading, and custom font override support.
- 🏷️ **Custom Site Name & Subtitle**: White-label the site title, subtitle, tagline, branding watermark, and SEO metadata via props or global config.
- 🎨 **High-Resolution Quote Card Generator**: Generates 9:16 Ultra-HD (2160×3840) social keepsake images via 2D Canvas with crisp ligatures and font metrics.
- 🔍 **Universal Explore Drawer**: Instant multi-domain discovery across Authors, Moods, Categories, Tags, and Saved/Liked quotes.
- 📖 **Deep Philosophical Delve & Author Dossiers**: Actionable daily insights, reflection questions, thinker biographies, pillars, and sourced works.
- 📊 **Firebase Telemetry & Quality Audit**: Multi-site engagement telemetry (views, likes, shares, dossier reads, and feedback) isolated per consumer identifier with live audit dashboard.
- ⚡ **Offline-Ready PWA**: Fully functional offline contemplation with `localStorage` favorites.
- 🛠️ **Companion Studio Workspace**: Decoupled sibling workspace (`wisdom-studio`) for content curation, batch video rendering, and multi-channel social media publishing.

---

## Installation

```bash
npm install wiz-theme
```

In your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { wizTheme } from 'wiz-theme';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    wizTheme({
      siteName: 'तत्व',
      subtitle: 'जीवन का सार',
      siteDescription: 'संत कबीर, स्वामी विवेकानंद और गौतम बुद्ध के अनमोल विचार — जीवन का सार',
      brandingText: 'तत्व',
      language: 'hi',
    }),
  ],
});
```

---

## Customizing Site Name, Subtitle & Branding

Theme consumers can customize the **site name**, **subtitle**, **tagline**, and **branding watermark** using any of the following approaches:

### 1. Via `BaseLayout` Props (Recommended for Pages)

Pass `siteName` (or `siteTitle`) and `subtitle` (or `tagline`) directly to `<BaseLayout>`:

```astro
---
import { BaseLayout, ReelFeed } from 'wiz-theme';

const quotes = [/* your quotes */];
---

<BaseLayout
  siteName="तत्व"
  subtitle="जीवन का सार"
  description="संत कबीर, स्वामी विवेकानंद और गौतम बुद्ध के अनमोल विचार — जीवन का सार"
  lang="hi"
>
  <ReelFeed
    quotes={quotes}
    feedTitle="तत्व"
    feedSubtitle="जीवन का सार"
  />
</BaseLayout>
```

When specified:
- `<title>` automatically formats as: `तत्व — जीवन का सार`
- Social OpenGraph (`og:site_name`, `og:title`) and Twitter card tags update automatically.
- Schema.org JSON-LD structured data adopts the site name and description.
- The top header bar displays both the site title and subtitle.
- Quote share cards embed your branding text as a crisp watermark.

### 2. Globally in `astro.config.mjs` (Recommended for the Entire Site)

Define the site configuration once in `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { wizTheme } from 'wiz-theme';

export default defineConfig({
  integrations: [
    wizTheme({
      siteName: 'अमृत विचार',
      subtitle: 'हर दिन नई प्रेरणा',
      siteDescription: 'संत कबीर, रहीम और विवेकानंद के अनमोल विचार',
      brandingText: 'अमृत विचार',
      language: 'hi',
    }),
  ],
});
```

All layouts and components inherit these settings automatically without having to pass props on every page.

### 3. In the Feed Header via `ReelFeed` Props

The reel feed header supports both a title and subtitle:

```astro
<ReelFeed
  quotes={quotes}
  feedTitle="तत्व"
  feedSubtitle="जीवन का सार"
/>
```

### 4. Via Translation Overrides

To customize site text within the translation dictionary:

```astro
<BaseLayout
  lang="hi"
  translations={{
    site: {
      title: 'तत्व',
      tagline: 'जीवन का सार',
      description: 'महान विचारकों के अनमोल विचार और जीवन का सार।',
    },
  }}
>
```

---

## Configuration Reference

You can pass configuration options either to `wizTheme({...})` in `astro.config.mjs` or as props to `<BaseLayout>`:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `siteName` / `siteTitle` | `string` | `'Wisdom'` / `'तत्व'` | Brand or site name. Appears in `<title>`, OpenGraph tags, header, and structured data. |
| `subtitle` / `tagline` | `string` | `''` | Secondary site subtitle or motto. Automatically concatenated into `<title>` (`Site — Subtitle`). |
| `brandingText` | `string` | *(falls back to `siteName`)* | Watermark branding text printed at the bottom of generated 9:16 quote card images. |
| `consumerId` / `siteId` | `string` | *(derived slug)* | Top-level namespace identifier in Firebase RTDB isolating telemetry when sharing a database instance. |
| `description` | `string` | *Localized default* | Meta description tag, OpenGraph summary, and Schema.org description. |
| `lang` | `string` | `'en'` | Primary BCP-47 language tag (e.g., `'hi'`, `'en'`, `'es'`). Automatically selects built-in dictionary & typography. |
| `locale` | `string` | `'en_US'` / `'hi_IN'` | OpenGraph locale (e.g. `hi_IN`, `en_US`, `es_ES`). |
| `dir` | `'ltr' \| 'rtl'` | `'ltr'` | Reading direction. Automatically set to `'rtl'` for Arabic (`ar`), Urdu (`ur`), Persian (`fa`), Hebrew (`he`). |
| `base` | `string` | `''` | Subpath base URL if deploying to a subfolder (e.g., `'/quotes'`). Defaults to domain root. |
| `siteUrl` | `string` | `Astro.site` | Fully qualified production URL used for canonical URLs and absolute social share links. |
| `author` | `string` | `'Wisdom'` | Author or curator attribution used in Schema.org structured data. |
| `typography` | `Partial<TypographyConfig>` | *Language preset* | Font family overrides and Google Fonts stylesheet URL. |
| `translations` | `DeepPartial<Translations>` | *Language dictionary* | Custom string and label overrides for any component or modal. |

### ReelFeed Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `quotes` | `QuoteData[]` | *(required)* | Array of quote objects to render in the vertical snap reel feed. |
| `feedTitle` | `string` | *(inherits `siteName`)* | Title displayed in the top fixed navigation bar. |
| `feedSubtitle` / `subtitle` | `string` | *(inherits `subtitle`)* | Subtitle displayed directly beneath the feed title in the top bar. |
| `lang` | `string` | *(inherits `lang`)* | Language code for localized buttons, tooltips, and drawer controls. |
| `translations` | `DeepPartial<Translations>` | `undefined` | Optional localized string overrides for the feed and child modals. |

---

## Creating a Dedicated Hindi Site

To build a website dedicated to Hindi, simply set `lang="hi"` on `<BaseLayout>`:

```astro
---
// src/pages/index.astro
import { BaseLayout, ReelFeed } from 'wiz-theme';

const hindiQuotes = [
  {
    id: "q-hi-001",
    content: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम का, पढ़े सो पंडित होय॥",
    author: "कबीर दास",
    authorSlug: "kabir",
    category: "प्रेम व ज्ञान",
    categorySlug: "love-wisdom",
    mood: "philosophical",
    tags: ["प्रेम", "ज्ञान", "भक्ति", "सत्य"],
    duration: 8,
    sourceWork: "कबीर ग्रंथावली",
    explanation: "कबीर बाहरी पाखंड और कोरी किताबी शिक्षा पर गहरी चोट करते हैं।",
    practicalInsight: "सहानुभूति और प्रेम से दूसरों को समझें।"
  }
];
---

<BaseLayout
  siteName="तत्व"
  subtitle="जीवन का सार"
  description="संत कबीर, स्वामी विवेकानंद और गौतम बुद्ध के अनमोल विचार — जीवन का सार"
  lang="hi"
>
  <ReelFeed
    quotes={hindiQuotes}
    feedTitle="तत्व"
    feedSubtitle="जीवन का सार"
    lang="hi"
  />
</BaseLayout>
```

The theme automatically:
1. Applies **modern, natural Hindi labels** across all buttons, tooltips, dialogs, drawers, and notifications (`शेयर करें`, `लाइक करें`, `विस्तार से जानें`, `काम की बात (सीख)`, `आज का सवाल`, `मूड`, `कैटेगरी`, `लेखक`, etc.).
2. Loads optimized **Devanagari Google Fonts** (*Rozha One*, *Noto Serif Devanagari*, *Mukta*).
3. Preserves **Unicode Devanagari slugs** (e.g. `/#पोथी-पढि-पढि-जग-मुआ`) without stripping characters.
4. Generates **2D Canvas Quote Cards** with Devanagari font rendering and ligatures.

---

## Creating a Dedicated Spanish Site

To build a website dedicated to Spanish, simply set `lang="es"` on `<BaseLayout>`:

```astro
---
// src/pages/index.astro
import { BaseLayout, ReelFeed } from 'wiz-theme';

const spanishQuotes = [
  {
    id: "q-es-001",
    content: "No nos atrevemos a muchas cosas porque son difíciles; son difíciles porque no nos atrevemos.",
    author: "Séneca",
    authorSlug: "seneca",
    category: "Coraje y Sabiduría",
    categorySlug: "courage-wisdom",
    mood: "motivational",
    tags: ["coraje", "estoicismo", "superación"],
    duration: 8,
    sourceWork: "Cartas a Lucilio",
    explanation: "Séneca advierte que el miedo y la vacilación magnifican los obstáculos.",
    practicalInsight: "Afronta hoy con determinación aquello que has estado postergando."
  }
];
---

<BaseLayout
  siteName="Sabiduría"
  subtitle="Citas eternas, reinventadas"
  description="Pensamientos inmortales de Séneca, Marco Aurelio y Cervantes."
  lang="es"
>
  <ReelFeed
    quotes={spanishQuotes}
    feedTitle="Sabiduría"
    feedSubtitle="Citas eternas"
    lang="es"
  />
</BaseLayout>
```

The theme automatically:
1. Applies **natural Spanish translations** across all buttons, tooltips, dialogs, drawers, and notifications (`Profundizar`, `Compartir esta cita`, `Favoritos`, `Lección práctica`, `Contemplación diaria`, etc.).
2. Resolves the OpenGraph locale to `es_ES`.
3. Renders accents and special characters seamlessly in typography and 2D Canvas Quote Cards.

---

## Creating Sites for Other Languages

To create a site dedicated to another language (e.g., Sanskrit, Arabic, Japanese):

```astro
---
import { BaseLayout, ReelFeed } from 'wiz-theme';
---

<BaseLayout
  lang="ar"
  dir="rtl"
  siteName="حكمة"
  subtitle="تأملات يومية"
  typography={{
    sansFont: "'Amiri', system-ui, sans-serif",
    quoteFont: "'Amiri', serif",
    displayFont: "'Amiri', serif",
    editorialFont: "'Amiri', serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap",
    quoteCanvasFont: '"Amiri", serif',
    authorCanvasFont: '500 42px "Amiri", serif',
    sansCanvasFont: '"Amiri", sans-serif',
    fontsToPreload: ['400 78px "Amiri"'],
  }}
  translations={{
    header: { back: 'رجوع' },
    slide: { delve: 'تعمق', moreAhead: 'المزيد من الحكم' },
    rail: { share: 'مشاركة', like: 'إعجاب' },
    explore: { title: 'استكشاف', tabs: { authors: 'المؤلفون', moods: 'الحالات' } },
  }}
>
  <ReelFeed quotes={arabicQuotes} />
</BaseLayout>
```

---

## Quote Data Schema

Each quote object adheres to the following structure:

```typescript
interface QuoteData {
  id: string;                    // e.g. "q-001"
  content: string;               // The quote text
  author: string;                // Author display name
  authorSlug: string;            // URL-safe author identifier
  category: string;              // Category display name
  categorySlug: string;          // Category identifier
  mood:                          // One of 8 core emotional moods:
    | 'reflective'
    | 'motivational'
    | 'serene'
    | 'bold'
    | 'melancholic'
    | 'joyful'
    | 'philosophical'
    | 'romantic';
  tags: string[];                // Topic tags, e.g. ["सत्य", "ज्ञान"]
  duration?: number;             // Auto-scroll duration in seconds (default: 8)
  sourceWork?: string;           // Book or treatise citation
  explanation?: string;          // In-depth philosophical meaning
  practicalInsight?: string;     // Daily actionable takeaway
  reflectionPrompt?: string;     // Thought-provoking daily question
}
```

---

## 🎬 Content Studio, Video Production & Social Publishing

All local content management and automation tools have been organized into the dedicated sibling workspace [**`wisdom-studio`**](file:///Users/teerantula/GitHub/Wisdom-Collection/wisdom-studio):

- **🛠️ Content Curation Studio (`admin`)**: Local web dashboard running on `http://localhost:4242` to search, edit, create, and audit quotes and author dossiers across any site in the collection.
- **🎬 Bulk Video Generator (`video` / `generate`)**: Automated batch export of animated 1080×1920 (9:16) vertical reels using headless Chromium, with progress tracking (`progress.json`), companion thumbnails, and captions.
- **🚀 Direct API Social Media Publisher (`publish`)**: Zero-dependency automated publisher for **YouTube Shorts** (YouTube Data API v3) and **Instagram Reels** (Meta Graph API) with scheduling and duplicate prevention.

To run these tools for any site (e.g. `tatva` or `element`), navigate to `wisdom-studio` or use the unified runner:

```bash
cd wisdom-studio

# 1. Launch Quote & Author curation web UI
npm run admin -- --site tatva

# 2. Check video queue and render reels
npm run status:videos -- --site tatva
npm run generate -- --site tatva --limit 5

# 3. Publish / schedule to YouTube Shorts & Instagram Reels
npm run publish -- --site tatva --all --limit 5
```

See the [**`wisdom-studio/README.md`**](file:///Users/teerantula/GitHub/Wisdom-Collection/wisdom-studio/README.md) for full setup instructions, CLI flags, and API configurations.

---

## Firebase Telemetry & Quality Audit

`wiz-theme` includes optional, privacy-respecting client telemetry using **Firebase Realtime Database (RTDB)** to track audience engagement and identify content quality issues.

### Multi-Site Isolation via Top-Level Consumer Identifier

When multiple websites or theme consumers share the **same Firebase instance**, telemetry data is automatically partitioned under a **top-level consumer identifier**:

```text
Firebase RTDB Root
└── {consumerId}/
    ├── quotes/
    │   └── {quoteId}/
    │       ├── views: 1420
    │       ├── likes: 184
    │       ├── dislikes: 3
    │       ├── shares: 29
    │       ├── share_types/
    │       │   ├── image: 18
    │       │   └── link: 11
    │       └── dislike_reasons/
    │           ├── typo: 2
    │           └── wrong_author: 1
    ├── authors/
    │   └── {authorSlug}/
    │       ├── dossierViews: 310
    │       ├── name: "Marcus Aurelius"
    │       └── updatedAt: 1728219400000
    └── dislike_feedback/
        └── {quoteId}/
            └── -Oabc123: { reason: "typo", note: "spelling on line 2", timestamp: 1728219400000 }
```

This guarantees that different websites using the same Firebase database do not collide or overwrite quote views, votes, or user feedback.

### Configuring the Consumer Identifier

You can configure your site's unique consumer identifier in any of the following ways:

#### Option 1: In `astro.config.mjs` (Recommended)

```javascript
import { defineConfig } from 'astro/config';
import { wizTheme } from 'wiz-theme';

export default defineConfig({
  integrations: [
    wizTheme({
      consumerId: 'stoic_hub', // Unique top-level identifier in Firebase RTDB
      siteName: 'Stoic Hub',
    }),
  ],
});
```

#### Option 2: Via Environment Variable (`.env`)

```env
PUBLIC_FIREBASE_CONSUMER_ID=stoic_hub
```

#### Option 3: Via `BaseLayout` Prop

```astro
<BaseLayout consumerId="stoic_hub">
```

> **Fallback Hierarchy**:
> If no identifier is explicitly specified, the theme automatically derives a sanitized slug from `siteName` / `siteTitle` (e.g. `"Philosophy Daily"` → `"philosophy_daily"`), with a final fallback of `"wisdom"`.

### Firebase Environment Variables

To enable Firebase telemetry, add your Firebase credentials to `.env`:

```env
PUBLIC_FIREBASE_DATABASE_URL=https://YOUR_PROJECT-default-rtdb.REGION.firebasedatabase.app
PUBLIC_FIREBASE_API_KEY=AIzaSy...
PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT
PUBLIC_FIREBASE_APP_ID=1:...
PUBLIC_FIREBASE_CONSUMER_ID=my_website_id
```

### Recommended Firebase RTDB Security Rules

To allow public view/like logging and feedback submission while isolating by consumer namespace:

```json
{
  "rules": {
    "$consumerId": {
      "quotes": {
        ".read": true,
        "$quoteId": {
          ".write": true
        }
      },
      "authors": {
        ".read": true,
        "$authorSlug": {
          ".write": true
        }
      },
      "dislike_feedback": {
        ".read": true,
        "$quoteId": {
          ".write": true
        }
      }
    }
  }
}
```

### Auditing Telemetry in the Admin UI

Inside the Local Admin UI (`npx wiz-theme admin`):

1. Click the **`📊 Audit & Analytics`** tab in the top navigation.
2. The dashboard connects to Firebase RTDB and renders:
   - **Total Impressions**, **Total Likes**, **Total Dislikes**, **Total Shares**, **Author Dossiers**, and **Quality Score** (approval rating percentage).
   - **Sub-Tabs**:
     - 🚩 **Flagged & Disliked**: Quotes with negative votes, reason breakdown badges (`typo`, `wrong_author`, `offensive`, `inaccurate`), and reader feedback notes.
     - ❤️ **Most Liked**: Top crowd favorites.
     - 🌟 **Top Shared**: Quotes generating viral image, video, and link shares.
     - 👁️ **Most Viewed**: Highest-traffic reels.
     - 👤 **Author Dossiers**: Profile view leaderboard.
     - 💬 **User Feedback**: Reader corrections and notes.
3. **In-Place Fixes**: Every quote card in the audit tab features an **`✏️ Edit Quote`** button that opens the local quote editor modal, allowing you to instantly fix typos or reassign authors on your local disk.
4. **Consumer Identifier Switcher**: Click the `consumer: [id]` tag in the audit toolbar or click **`⚙️ Settings`** to inspect or switch to any site namespace in real time.

---

## License

MIT © [Ashish Vishwakarma](https://www.ashishvishwakarma.com)
