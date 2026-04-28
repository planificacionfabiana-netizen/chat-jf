self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Este bloque es OBLIGATORIO para que aparezca el botón de instalar
  e.respondWith(fetch(e.request));
});
