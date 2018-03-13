// https://developers.google.com/web/tools/workbox/modules/workbox-cli

module.exports = {
  clientsClaim: true,
  swDest: 'build/public/js/sw.js',
  globDirectory: 'build/public/',
  globPatterns: [
    '**/*app-shell.{js,css}'
    // TODO precache app-shell images
  ],
  globIgnores: [],
  // the files already have a unique hash applied
  // used for cache busting
  dontCacheBustUrlsMatching: /\w{20}\./,
  templatedUrls: {
    // This assumes that your app-shell HTML is purely server-rendered and doesn't
    // get built as a local file. If it does get built locally, you can leave out
    // templatedUrls, and just list the app-shell.html in the previous globPatterns.
    // This will make sure that app-shell.html is both initially precached and
    // kept up to date; any time any of the dependency files/patterns
    // listed gets updated, the SW will automatically update the cache.
    '/app-shell/': [
      'js/*app-shell.js',
      'css/*app-shell.css'
    ]
  },
  navigateFallback: '/app-shell/',
  navigateFallbackWhitelist: [
    /^\/$/,
    /^\/newest/,
    /^\/newcomments/,
    /^\/show/,
    /^\/ask/,
    /^\/jobs/
  ],
  runtimeCaching: [
    // cache dynamic images - if applicable
    {
      urlPattern: /api/,
      handler: 'staleWhileRevalidate',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 1 day
        }
      }
    }
  ]
}
