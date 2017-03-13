const CACHE = 'podcalicious-cache-only';

let cacheditems = [
    '/',
    '/javascripts/index.js',
    '/stylesheets/main.css',
    '/images/header.jpg',
    'https://fonts.googleapis.com/css?family=Oswald:300,600',
    'https://fonts.googleapis.com/css?family=Roboto:100:300:500:100i:300i:500i'
    ]

self.addEventListener('install', (e) => {
    console.log('service worker is being installed');
    e.waitUntil(precache());
});

self.addEventListener('fetch', (e) => {
    console.log('service worker is serving from cache');
    e.respondWith(fromCache(e.request));
});

function precache() {
    return caches.open(CACHE).then(cache => {
        return cache.addAll(cacheditems);
    })
}

function fromCache(request) {
    return caches.match(request).then(
        response => response ? response : fetch(request)
    )
}