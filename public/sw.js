const CACHE_NAME = 'wisdom-v2';
const PRECACHE_ASSETS = [
  '/wisdom/',
  '/wisdom/manifest.webmanifest',
  '/wisdom/favicon.png',
  '/wisdom/daily-quotes.json',
  '/wisdom/icons/icon-192.png',
  '/wisdom/icons/icon-512.png',
  '/wisdom/icons/apple-touch-icon.png',
];

// Install: pre-cache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up old cache versions and claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // 1. Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Try cached version of requested URL
          const cached = await caches.match(request);
          if (cached) return cached;

          // Fallback to cached root sanctuary
          const rootFallback = await caches.match('/wisdom/');
          if (rootFallback) return rootFallback;

          return new Response('Offline — Wisdom Sanctuary available once online.', {
            headers: { 'Content-Type': 'text/plain' },
          });
        })
    );
    return;
  }

  // 2. Google Fonts & Static Assets (_astro bundles, icons, audio, daily quotes)
  const isStaticAsset =
    url.origin.includes('fonts.googleapis.com') ||
    url.origin.includes('fonts.gstatic.com') ||
    url.pathname.startsWith('/wisdom/_astro/') ||
    url.pathname.startsWith('/wisdom/icons/') ||
    url.pathname.startsWith('/wisdom/media/audio/') ||
    url.pathname.endsWith('daily-quotes.json');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Return cache, but revalidate in background
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// 4. Notification click: focus existing tab or open new window to the reflection quote
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = (event.notification.data && event.notification.data.url) || '/wisdom/';
  const absoluteUrl = new URL(rawUrl, self.location.origin).href;
  const quoteSlug = (event.notification.data && (event.notification.data.quoteSlug || event.notification.data.slug)) || '';
  const quoteId = (event.notification.data && event.notification.data.quoteId) || '';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Find an open Wisdom window
      for (const client of windowClients) {
        if (client.url.includes('/wisdom') && 'focus' in client) {
          client.postMessage({
            type: 'WISDOM_NAVIGATE_QUOTE',
            url: absoluteUrl,
            quoteSlug: quoteSlug,
            quoteId: quoteId
          });
          if ('navigate' in client) {
            client.navigate(absoluteUrl);
          }
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(absoluteUrl);
      }
    })
  );
});

// 5. Message listener: receive synced ritual settings from client
let storedRitualSettings = null;
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_RITUAL_SETTINGS') {
    storedRitualSettings = event.data.settings;
  }
});

// 6. Periodic Background Sync: background reflection checks
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'daily-reflection') {
    event.waitUntil(
      fetch('/wisdom/daily-quotes.json')
        .then((res) => res.json())
        .then((quotes) => {
          if (!Array.isArray(quotes) || quotes.length === 0) return;
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 0);
          const day = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          const quote = quotes.find((q) => q.day === day) || quotes[day % quotes.length] || quotes[0];
          if (!quote) return;

          const currentTotalMin = now.getHours() * 60 + now.getMinutes();
          let dueType = null;

          if (storedRitualSettings) {
            if (storedRitualSettings.morning) {
              const [mH, mM] = (storedRitualSettings.morningTime || '08:00').split(':').map(Number);
              const target = mH * 60 + mM;
              if (Math.abs(currentTotalMin - target) <= 15) {
                dueType = 'morning';
              }
            }
            if (!dueType && storedRitualSettings.evening) {
              const [eH, eM] = (storedRitualSettings.eveningTime || '21:00').split(':').map(Number);
              const target = eH * 60 + eM;
              if (Math.abs(currentTotalMin - target) <= 15) {
                dueType = 'evening';
              }
            }
          } else {
            const isEvening = now.getHours() >= 18;
            dueType = isEvening ? 'evening' : 'morning';
          }

          if (!dueType) return;

          const ritualTitle = dueType === 'evening' ? 'Evening Stillness' : 'Morning Reflection';

          return self.registration.showNotification(`${ritualTitle} — ${quote.author}`, {
            body: `“${quote.content}”`,
            icon: '/wisdom/icons/icon-192.png',
            badge: '/wisdom/icons/favicon-64.png',
            tag: `wisdom-${dueType}-reflection`,
            data: {
              url: `/wisdom/#${quote.slug}`,
              quoteSlug: quote.slug,
              quoteId: quote.id
            },
          });
        })
        .catch(() => {})
    );
  }
});
