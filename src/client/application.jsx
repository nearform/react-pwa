import React from 'react'
import { hydrate } from 'react-dom'
import { AppShell } from './js/AppShell'
import * as serviceWorker from './js/utils/serviceWorker'

// Require assets so that they are included in the bundle and in the precache
require.context('./images', true)

document.addEventListener('DOMContentLoaded', function() {
  // Rehydrate the application
  hydrate(<AppShell ssrPreloading={window.__ssrPreloading} />, document.getElementById('root'))

  // Install the service worker
  serviceWorker.register()
})
