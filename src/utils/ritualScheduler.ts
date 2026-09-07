import { fetchDailyQuote, type DailyReflectionQuote } from './dailyQuote';

export interface RitualSettings {
  morning: boolean;
  morningTime: string; // "08:00"
  evening: boolean;
  eveningTime: string; // "21:00"
  zenBell: boolean;
  zenIntervalMinutes: number; // 5, 10, 15
}

const STORAGE_KEY = 'wisdom_ritual_settings';
const LAST_DELIVERED_KEY = 'wisdom_last_delivered_rituals';

export const DEFAULT_RITUAL_SETTINGS: RitualSettings = {
  morning: false,
  morningTime: '08:00',
  evening: false,
  eveningTime: '21:00',
  zenBell: false,
  zenIntervalMinutes: 10,
};

export function getRitualSettings(): RitualSettings {
  if (typeof window === 'undefined') return DEFAULT_RITUAL_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RITUAL_SETTINGS;
    return { ...DEFAULT_RITUAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_RITUAL_SETTINGS;
  }
}

export function saveRitualSettings(settings: RitualSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('wisdom:ritual-settings-changed', { detail: settings }));
  } catch (err) {
    console.debug('Failed to save ritual settings:', err);
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

export async function sendReflectionNotification(
  type: 'Morning Reflection' | 'Evening Stillness' | 'Wisdom Reflection',
  quote: DailyReflectionQuote,
  baseUrl = '/wisdom'
): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  const title = `${type} — ${quote.author}`;
  const options: NotificationOptions = {
    body: `“${quote.content}”`,
    icon: `${baseUrl}/icons/icon-192.png`,
    badge: `${baseUrl}/icons/favicon-64.png`,
    tag: `wisdom-${type.toLowerCase().replace(/\s+/g, '-')}`,
    data: {
      url: `${baseUrl}/#${quote.slug}`,
      quoteId: quote.id,
      author: quote.author,
    },
  };

  try {
    // Prefer Service Worker showNotification for native lock screen handling
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && 'showNotification' in reg) {
        await reg.showNotification(title, options);
        return true;
      }
    }
    // Fallback to Window Notification API
    new Notification(title, options);
    return true;
  } catch (err) {
    console.debug('Notification dispatch failed:', err);
    return false;
  }
}

/**
 * Checks current time and delivers morning/evening reflections if enabled and due today.
 */
export async function checkAndTriggerScheduledRituals(baseUrl = '/wisdom'): Promise<void> {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const settings = getRitualSettings();
  if (!settings.morning && !settings.evening) return;

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeMinutes = currentHours * 60 + currentMinutes;

  let delivered: Record<string, string[]> = {};
  try {
    delivered = JSON.parse(localStorage.getItem(LAST_DELIVERED_KEY) || '{}');
  } catch {}

  const todayDelivered = delivered[todayStr] || [];

  const quote = await fetchDailyQuote(now, baseUrl);
  if (!quote) return;

  // Morning check
  if (settings.morning && !todayDelivered.includes('morning')) {
    const [mH, mM] = settings.morningTime.split(':').map(Number);
    const morningTarget = mH * 60 + mM;
    // Deliver if current time is within or past the scheduled morning hour
    if (currentTimeMinutes >= morningTarget && currentTimeMinutes < morningTarget + 180) {
      const sent = await sendReflectionNotification('Morning Reflection', quote, baseUrl);
      if (sent) {
        todayDelivered.push('morning');
        delivered[todayStr] = todayDelivered;
        localStorage.setItem(LAST_DELIVERED_KEY, JSON.stringify(delivered));
      }
    }
  }

  // Evening check
  if (settings.evening && !todayDelivered.includes('evening')) {
    const [eH, eM] = settings.eveningTime.split(':').map(Number);
    const eveningTarget = eH * 60 + eM;
    if (currentTimeMinutes >= eveningTarget && currentTimeMinutes < eveningTarget + 180) {
      const sent = await sendReflectionNotification('Evening Stillness', quote, baseUrl);
      if (sent) {
        todayDelivered.push('evening');
        delivered[todayStr] = todayDelivered;
        localStorage.setItem(LAST_DELIVERED_KEY, JSON.stringify(delivered));
      }
    }
  }
}

/**
 * Attempt to register Periodic Background Sync with Service Worker
 */
export async function registerPeriodicSync(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    if ('periodicSync' in reg) {
      const status = await (navigator as any).permissions.query({ name: 'periodic-background-sync' });
      if (status.state === 'granted') {
        await (reg as any).periodicSync.register('daily-reflection', {
          minInterval: 12 * 60 * 60 * 1000, // Every 12h
        });
        return true;
      }
    }
  } catch {}
  return false;
}
