const CACHE_NAME = "sum-cache-v1";
const ASSETS = [
  "/",
  "/manifest.json",
  "/styles/global.css",
  "/build/_assets/entry-client-*.js", // adjust to match your built JS
  "/data/messages.json", // so messages load offline
  // add any other static assets: fonts, icons, etc.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWidth(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
