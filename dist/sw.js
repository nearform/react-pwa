importScripts("precache-manifest.8c27c0905c70a2a4775cea64ca472483.js", "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/* global workbox, self */

workbox.setConfig({ debug: true })
workbox.skipWaiting()
workbox.clientsClaim()
workbox.core.setCacheNameDetails({ prefix: 'hn-pwa', suffix: 'v2', precache: 'precache', runtime: 'runtime' })

// // Application
workbox.routing.registerRoute('/images/*', workbox.strategies.cacheFirst())
workbox.routing.registerRoute('/manifest.json', workbox.strategies.staleWhileRevalidate())
// workbox.routing.registerRoute(/\/manifest.json/, workbox.strategies.networkOnly())
// workbox.routing.registerNavigationRoute('/index.html')

// Precaching
workbox.precaching.precache(['/'])
workbox.precaching.precacheAndRoute(self.__precacheManifest)

// importScripts('/public/js/workbox-sw.js')

// workbox.setConfig({ debug: true })

// const workboxSW = new self.WorkboxSW()

// workboxSW.router.registerRoute('/images/*', workboxSW.strategies.cacheFirst())

