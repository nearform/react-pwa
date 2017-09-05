importScripts('/public/js/workbox-sw.js');

const workboxSW = new self.WorkboxSW();

workboxSW.precache([
  '/app-shell'
]);

workboxSW.router.registerNavigationRoute('/app-shell');

workboxSW.router.registerRoute(
  '/public/*',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  '/api/initial-states/:contentType/:slug?',
  workboxSW.strategies.cacheFirst()
);
