const CACHE_NAME = "sum-cache-v1";
const ASSETS = [
  "/",
  "/manifest.json",
  "/build/client/assets/root-CLEBrOkX.css",
  "/build/client/assets/config-C1Pkttth.js",
  "/build/client/assets/animations-DcAhDQ_x.js",
  "/build/client/assets/AudioContext-B0GR_K4C.js",
  "/build/client/assets/settings-Bu67Qa4q.js",
  "/build/client/assets/_index-BaDUIVsh.js",
  "/build/client/assets/entry.client-C-nAjFD-.js",
  "/build/client/assets/index-7zqVQZSl.js",
  "/build/client/assets/messages-BIilk9x0.js",
  "/build/client/assets/proxy-CwAfaBRr.js",
  "/build/client/assets/components-CIIfDeaW.js",
  "/app/data/messages.json",
  "/app/data/messages.en.json",
  "/app/data/messages.hu.json",
  "/icons/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (
    url.origin === self.location.origin &&
    (url.pathname === "/" ||
      url.pathname === "/manifest.json" ||
      url.pathname.startsWith("/build/") ||
      url.pathname.startsWith("/icons/") ||
      url.pathname.endsWith(".json"))
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          // cache dynamically
          const copy = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
          return response;
        });
      })
    );
  }
});
