const CACHE_NAME = 'tasbih-cache-v5';

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'assets/style/style.css',
  'assets/scripts/script.js',
  'assets/images/background.jpg',
  'assets/images/icon.jpg',
  'assets/fonts/Amiri-Regular.ttf'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./').then((response) => response || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
