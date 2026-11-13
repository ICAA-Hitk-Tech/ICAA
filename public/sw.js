// Service Worker for ICAA Scanner PWA (scoped to /vol-k7x2q9/)
const CACHE_VERSION = "icaa-vol-v1";
const OFFLINE_URL = "/vol-k7x2q9/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll([OFFLINE_URL]);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_VERSION) {
            return caches.delete(k);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. NEVER cache any /api/* requests
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // 2. Cache-first with stale-while-revalidate for static Next.js assets
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/pwa/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((networkRes) => {
          if (networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, resClone));
          }
          return networkRes;
        }).catch(() => cached);
        return cached || fetchPromise;
      }),
    );
    return;
  }

  // 3. Network-first with cache/offline fallback for /vol-k7x2q9/ navigations
  if (url.pathname.startsWith("/vol-k7x2q9")) {
    if (event.request.mode === "navigate") {
      event.respondWith(
        fetch(event.request)
          .then((networkRes) => {
            const resClone = networkRes.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, resClone));
            return networkRes;
          })
          .catch(async () => {
            const cached = await caches.match(event.request);
            if (cached) return cached;
            const offlinePage = await caches.match(OFFLINE_URL);
            return offlinePage || new Response("Offline", { status: 503, statusText: "Offline" });
          }),
      );
      return;
    }
  }
});
