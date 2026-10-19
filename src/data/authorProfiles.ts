import { getTranslations } from '../i18n';
import fs from 'node:fs';
import path from 'node:path';

export interface AuthorWork {
  title: string;
  description: string;
}

export interface PhilosophicalPillar {
  concept: string;
  description: string;
}

export interface AuthorProfile {
  slug: string;
  name: string;
  shortName?: string;
  longName?: string;
  photo?: string;
  era: string;
  tradition: string;
  wikipediaUrl: string;
  summary: string;
  bio: string;
  keyWorks: AuthorWork[];
  pillars: PhilosophicalPillar[];
  whyTimeless: string;
}

export function getAuthorPhotoUrl(slug: string, customPhoto?: string, baseUrl: string = ''): string {
  if (customPhoto) return customPhoto;
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBase}/media/authors/${slug}.webp`;
}

/**
 * Loads all author profiles from src/data/authors/*.json in the consuming project.
 * Returns a slug-keyed map. Used where the full author map is needed (e.g. API routes).
 */
export function loadAuthorProfiles(dataDir?: string): Record<string, AuthorProfile> {
  const dir = dataDir ?? path.resolve(process.cwd(), 'src/data/authors');
  if (!fs.existsSync(dir)) return {};

  const profiles: Record<string, AuthorProfile> = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.json')) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as AuthorProfile;
      if (data.slug) profiles[data.slug] = data;
    } catch {
      // skip malformed files silently
    }
  }
  return profiles;
}

/**
 * Gets a single author profile by slug.
 * Reads from src/data/authors/<slug>.json at build time.
 * Falls back to a generated minimal profile if the file does not exist.
 */
export function getAuthorProfile(slug: string, fallbackName?: string, lang: string = 'en'): AuthorProfile {
  const filePath = path.resolve(process.cwd(), `src/data/authors/${slug}.json`);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) as AuthorProfile;
    } catch {
      // fall through to generated fallback
    }
  }

  // Fallback: generate a minimal profile from slug/name
  const name = fallbackName || slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const t = getTranslations(lang);
  const normLang = lang.toLowerCase().split(/[-_]/)[0];
  const isHi = normLang === 'hi';
  const isEs = normLang === 'es';
  const wikiLang = isHi ? 'hi' : isEs ? 'es' : 'en';

  let summary = `Curated philosophical reflections and timeless sayings from ${name}.`;
  let bio = `${name} is an influential thinker whose timeless reflections on life, purpose, and wisdom continue to inspire generations.`;
  let whyTimeless = `The insights of ${name} speak to enduring questions of human existence.`;

  if (isHi) {
    summary = `${name} के अनमोल विचार और लोकप्रिय कोट्स।`;
    bio = `${name} एक जाने-माने और प्रभावशाली लेखक हैं, जिनके विचार आज भी जीवन में प्रेरणा और सही दिशा देते हैं।`;
    whyTimeless = `${name} के विचार आज के समय में भी उतने ही जरूरी और प्रेरणादायी हैं।`;
  } else if (isEs) {
    summary = `Reflexiones filosóficas seleccionadas y frases célebres de ${name}.`;
    bio = `${name} es una figura influyente cuyas reflexiones atemporales sobre la vida, el propósito y la sabiduría continúan inspirando a generaciones.`;
    whyTimeless = `Las enseñanzas de ${name} abordan cuestiones esenciales e imperecederas de la existencia humana.`;
  }

  return {
    slug,
    name,
    era: t.author?.defaultEra || 'Historical Thinker',
    tradition: t.author?.defaultTradition || 'Wisdom & Philosophy',
    wikipediaUrl: `https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(name.replace(/ /g, '_'))}`,
    summary,
    bio,
    keyWorks: [],
    pillars: [],
    whyTimeless,
  };
}
