const CACHE_NAME = 'chat-jf-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Esto es lo que engaña al navegador para que crea que es una app offline
    event.respondWith(fetch(event.request));
});
