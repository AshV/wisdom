/**
 * Daily Reflection Quote Resolver
 * Deterministically maps the calendar day of the year (1..366) to a timeless quote.
 */

export interface DailyReflectionQuote {
  day: number;
  id: string;
  content: string;
  author: string;
  authorSlug: string;
  category: string;
  mood: string;
  slug: string;
}

/**
 * Returns 1-based day of year (1..366)
 */
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Fetches the daily reflection quote for the current day.
 */
export async function fetchDailyQuote(date: Date = new Date(), baseUrl?: string): Promise<DailyReflectionQuote | null> {
  try {
    const day = getDayOfYear(date);
    const resolvedBase = baseUrl !== undefined
      ? baseUrl.replace(/\/+$/, "")
      : (typeof window !== "undefined" && (window as any).__wisdomBaseUrl !== undefined
          ? (window as any).__wisdomBaseUrl.replace(/\/+$/, "")
          : (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL
              ? import.meta.env.BASE_URL.replace(/\/+$/, "")
              : ""));
    const url = resolvedBase ? `${resolvedBase}/daily-quotes.json` : "/daily-quotes.json";
    const res = await fetch(url);
    if (!res.ok) return null;
    const quotes: DailyReflectionQuote[] = await res.json();
    return quotes.find((q) => q.day === day) || quotes[day % quotes.length] || quotes[0] || null;
  } catch (err) {
    console.debug("Failed to fetch daily quote:", err);
    return null;
  }
}
