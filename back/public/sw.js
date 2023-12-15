importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js")

// Utilisez les stratégies de Workbox pour les routes spécifiques
workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
)

workbox.routing.registerRoute(
  ({ request }) => request.destination === "script",
  new workbox.strategies.NetworkFirst()
)

// Mettez en cache les images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

// Retirer le préchargement des ressources statiques spécifiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("precache-v1").then((cache) => {
      return cache.addAll([
        "/", // Cachez uniquement la racine; les autres ressources seront gérées dynamiquement
      ])
    })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== "precache-v1")
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
})
