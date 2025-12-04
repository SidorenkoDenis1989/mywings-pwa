const CACHE_NAME = "mywings-pwa-cache-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([OFFLINE_URL]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    return event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
