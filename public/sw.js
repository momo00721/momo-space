// 自动推断 base path（适配 Cloudflare 根路径 / 与 GitHub Pages 子路径 /momo-space/）
const CACHE = 'kakimo-v5';
const SW_PATH = self.location.pathname; // 例如 '/sw.js' 或 '/momo-space/sw.js'
const BASE = SW_PATH.replace(/sw\.js$/, '');
const CRITICAL = [
  BASE,
  BASE + 'works/',
  BASE + 'info/',
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

// Fetch routing
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Cache-first for images
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/)) {
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
  if (e.request.destination === 'document' || url.pathname.endsWith('/')) {
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
  if (url.pathname.match(/\.(css|js|woff2?)$/)) {
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
