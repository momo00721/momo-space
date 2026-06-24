const CACHE = 'kakimo-v2';
const CRITICAL = [
  '/momo-space/',
  '/momo-space/works/',
  '/momo-space/info/',
];

// Install: precache critical pages
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CRITICAL))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for images, stale-while-revalidate for pages
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Cache-first for images
  if (
    url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)/) ||
    url.pathname.includes('/works/')
  ) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Stale-while-revalidate for HTML pages
  if (e.request.destination === 'document') {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Cache-first for CSS, JS, fonts
  if (
    url.pathname.match(/\.(css|js|woff2?)$/) ||
    url.pathname.includes('/assets/')
  ) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }
});
