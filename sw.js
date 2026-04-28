self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Esto detecta la notificación y la muestra en el sistema
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : { title: 'Nuevo mensaje', body: 'Tienes un mensaje nuevo' };
    const options = {
        body: data.body,
        icon: 'https://i.ibb.co/CfX4NRr/JF.png',
        badge: 'https://i.ibb.co/CfX4NRr/JF.png',
        vibrate: [200, 100, 200],
        data: { url: './' }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Al tocar la notificación, abre la app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
