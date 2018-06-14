import React from 'react'
import { hydrate } from 'react-dom'
import { AppShell } from './js/AppShell'

// Require assets so that they are included in the bundle and in the precache
require.context('./images', true)

document.addEventListener('DOMContentLoaded', function() {
  // Rehydrate the application
  hydrate(<AppShell ssrPreloading={window.__ssrPreloading} />, document.getElementById('root'))

  // Install the service worker, if supported
  if (!navigator || !navigator.serviceWorker) return

  navigator.serviceWorker.register('/sw.js').catch(function(err) {
    console.log(`ServiceWorker registration failed: ${err}`)
  })
})
