import { createMemoryHistory } from 'history'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createTypeStyle, getStyles } from 'typestyle'
import { AppShell } from './js/AppShell'
import { colors } from './js/styles/common'

const globalStyles = createTypeStyle() // Instantiate a different typestyle sheet since global styles won't be regenerated from the client

globalStyles.cssRule('*', {
  lineHeight: 1.4
})

// This sets the value of 1rem
globalStyles.cssRule('html, body', {
  fontSize: '16px',
  padding: 0,
  margin: 0
})

globalStyles.cssRule('body', {
  color: colors.NEARFORM_BRAND_ACCENT_2,
  fontFamily: 'Verdana, Geneva, sans-serif'
})

globalStyles.cssRule('a', {
  textDecoration: 'none',
  $nest: {
    '&:hover, &:visited': {
      transition: 'color .1s ease-out'
    }
  }
})

globalStyles.cssRule('.active', {
  fontWeight: '600'
})

export async function renderPage(request, reply) {
  // Prepare the history
  const history = createMemoryHistory({ initialEntries: [request.req.url] })

  // Preload component data, if anything is defined
  let ssrPreloading = {}

  try {
    if (reply.context.config.component && typeof reply.context.config.component.dataFetcher === 'function') {
      ssrPreloading = { success: true, payload: await reply.context.config.component.dataFetcher(request.params) }
    }
  } catch (e) {
    ssrPreloading = { success: false, payload: e }
  }

  // Render the application separately in order to support typestyle
  const app = renderToString(<AppShell history={history} ssrPreloading={ssrPreloading} />)

  // Return the rendered page
  reply.type('text/html')

  return renderToString(
    <html lang="en">
      <head>
        <title>Hacker News</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf8" />
        <meta name="description" content="Hacker News PWA" />
        <meta name="keywords" content="hackernews, pwa" />
        <meta name="author" content="nearForm" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content={colors.NEARFORM_BRAND_MAIN} />

        <link rel="icon" href="/images/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="images/favicon.ico" sizes="196x196" />
        <link rel="apple-touch-icon" href="/images/icon-120.png" />
        <link rel="apple-touch-icon" href="/images/icon-152.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/images/icon-167.png" sizes="167x167" />
        <link rel="apple-touch-icon" href="/images/icon-180.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-startup-image"
          href="/images/splash_640x1136.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_750x1334.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_1125x2436.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_1242x2208.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_1536x2048.png"
          media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_1668x2224.png"
          media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash_2048x2732.png"
          media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />

        <style>{globalStyles.getStyles()}</style>
        <style>{getStyles()}</style>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />

        <script defer type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.__ssrPreloading = ${JSON.stringify(ssrPreloading)}` }} />
        <script defer type="text/javascript" src="/app.js" />
      </body>
    </html>
  )
}
