// this value will be replaced at build time
let version = 'VERSION'

workbox.setConfig({ debug: SW_DEBUG })
workbox.skipWaiting()
workbox.clientsClaim()

// for precache we dont want to set versioning since every new version will start with empty cache
// workbox already has a mechanism to update resources in precache based on their revision
// this way only the resources that changed since last build will be replaced in cache
workbox.core.setCacheNameDetails({ prefix: 'hn-pwa', precache: 'precache', runtime: `runtime-v2.${version}` })

// Application
workbox.routing.registerRoute(/^\/images\/.*/, workbox.strategies.cacheFirst())
workbox.routing.registerRoute(
  /\/api\/.*/,
  workbox.strategies.networkFirst({
    cacheName: `hn-pwa-api-v2.${version}`,
  })
)

// Precaching
workbox.precaching.precache([
  {
    url: '/',
    revision: version,
  },
])
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

// cleanup old caches except precache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheKeys => {
      const oldKeys = cacheKeys.filter(key => key.indexOf('hn-pwa-precache') === -1 && key.indexOf(version) === -1)
      const deletePromises = oldKeys.map(oldKey => caches.delete(oldKey))
      return Promise.all(deletePromises)
    })
  )
})
