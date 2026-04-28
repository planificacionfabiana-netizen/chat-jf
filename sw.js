self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Esto es lo que despierta al celular en segundo plano
self.addEventListener('push', (event) => {
    let data = { title: 'Nuevo mensaje', body: 'Tienes un mensaje nuevo' };
    
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch (e) {
        console.log("Error parseando JSON de push, usando texto plano");
        data.body = event.data.text();
    }

    const options = {
        body: data.body,
        // Al quitar icon y badge, Android pone la CAMPANITA que te gustó
        color: '#00a884',
        vibrate: [200, 100, 200],
        tag: 'chat-jf', // Evita que se amontonen
        renotify: true,
        data: { url: './' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Si la app ya está abierta, solo le pone el foco
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Si está cerrada, la abre
            if (clients.openWindow) {
                return clients.openWindow('./');
            }
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
