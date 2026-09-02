/**
 * Media Registry — Mood-to-media mappings with deterministic hash selection.
 *
 * Background videos and ambient audio are mapped per mood. The selection
 * is deterministic: a quote's string ID is hashed (djb2) and modulo'd
 * against the mood's media pool, so a quote always gets the same visual.
 */

export type Mood =
  | 'reflective'
  | 'motivational'
  | 'serene'
  | 'bold'
  | 'melancholic'
  | 'joyful'
  | 'philosophical'
  | 'romantic';

export interface MediaEntry {
  video: string;
  gradient: string;
}

const BASE = '/wisdom';

/**
 * Mood → media pool. Each mood has multiple visual options.
 * Videos reference files in public/media/videos/ (720x1280 MP4 loops).
 * Gradients are CSS class names for fallback when video is absent.
 */
export const moodMedia: Record<Mood, MediaEntry[]> = {
  reflective: [
    { video: `${BASE}/media/videos/reflective-01.mp4`, gradient: 'gradient-reflective' },
    { video: `${BASE}/media/videos/reflective-02.mp4`, gradient: 'gradient-reflective' },
  ],
  motivational: [
    { video: `${BASE}/media/videos/motivational-01.mp4`, gradient: 'gradient-motivational' },
    { video: `${BASE}/media/videos/motivational-02.mp4`, gradient: 'gradient-motivational' },
  ],
  serene: [
    { video: `${BASE}/media/videos/serene-01.mp4`, gradient: 'gradient-serene' },
    { video: `${BASE}/media/videos/serene-02.mp4`, gradient: 'gradient-serene' },
  ],
  bold: [
    { video: `${BASE}/media/videos/bold-01.mp4`, gradient: 'gradient-bold' },
    { video: `${BASE}/media/videos/bold-02.mp4`, gradient: 'gradient-bold' },
  ],
  melancholic: [
    { video: `${BASE}/media/videos/melancholic-01.mp4`, gradient: 'gradient-melancholic' },
    { video: `${BASE}/media/videos/melancholic-02.mp4`, gradient: 'gradient-melancholic' },
  ],
  joyful: [
    { video: `${BASE}/media/videos/joyful-01.mp4`, gradient: 'gradient-joyful' },
    { video: `${BASE}/media/videos/joyful-02.mp4`, gradient: 'gradient-joyful' },
  ],
  philosophical: [
    { video: `${BASE}/media/videos/philosophical-01.mp4`, gradient: 'gradient-philosophical' },
    { video: `${BASE}/media/videos/philosophical-02.mp4`, gradient: 'gradient-philosophical' },
  ],
  romantic: [
    { video: `${BASE}/media/videos/romantic-01.mp4`, gradient: 'gradient-romantic' },
    { video: `${BASE}/media/videos/romantic-02.mp4`, gradient: 'gradient-romantic' },
  ],
};

/**
 * Mood → ambient audio track.
 * Looping MP3 files in public/media/audio/.
 */
export const moodAudio: Record<Mood, string> = {
  reflective: `${BASE}/media/audio/ambient-calm.mp3`,
  motivational: `${BASE}/media/audio/ambient-uplifting.mp3`,
  serene: `${BASE}/media/audio/ambient-nature.mp3`,
  bold: `${BASE}/media/audio/ambient-uplifting.mp3`,
  melancholic: `${BASE}/media/audio/ambient-rain.mp3`,
  joyful: `${BASE}/media/audio/ambient-uplifting.mp3`,
  philosophical: `${BASE}/media/audio/ambient-calm.mp3`,
  romantic: `${BASE}/media/audio/ambient-piano.mp3`,
};

/**
 * djb2 hash — fast, deterministic string hash.
 */
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Get the deterministic media entry for a given quote.
 * Same ID + mood = same background, always.
 */
export function getMediaForQuote(id: string, mood: Mood): MediaEntry {
  const pool = moodMedia[mood];
  const index = djb2Hash(id) % pool.length;
  return pool[index];
}

/**
 * Get the ambient audio track for a given mood.
 */
export function getAudioForMood(mood: Mood): string {
  return moodAudio[mood];
}

/**
 * All mood values for iteration.
 */
export const allMoods: Mood[] = [
  'reflective',
  'motivational',
  'serene',
  'bold',
  'melancholic',
  'joyful',
  'philosophical',
  'romantic',
];

/**
 * Mood display names and emojis.
 */
export const moodMeta: Record<Mood, { label: string; emoji: string }> = {
  reflective: { label: 'Reflective', emoji: '🌙' },
  motivational: { label: 'Motivational', emoji: '🔥' },
  serene: { label: 'Serene', emoji: '🌊' },
  bold: { label: 'Bold', emoji: '⚡' },
  melancholic: { label: 'Melancholic', emoji: '🌧️' },
  joyful: { label: 'Joyful', emoji: '✨' },
  philosophical: { label: 'Philosophical', emoji: '🤔' },
  romantic: { label: 'Romantic', emoji: '💜' },
};
