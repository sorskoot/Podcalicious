const CACHE = 'podcalicious-cache-only';

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
        return cache.addAll([
            './',
            './javascripts/index.js',
            './stylesheets/main.css'
        ]);
    })
}

function fromCache(request) {
    return caches.open(CACHE).then(cache => {
        return cache.match(request).then(matching => {
            return matching || Promise.reject('no-match');
        })
    })
}