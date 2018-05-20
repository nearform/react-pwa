import { em, px } from 'csx'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createTypeStyle, getStyles } from 'typestyle'
import { AppShell } from './js/AppShell'

const globalStyles = createTypeStyle() // Instantiate a different typestyle sheet since global styles won't be regenerated from the client

globalStyles.cssRule('*', { lineHeight: 1.4 })

// This sets the value of 1rem
globalStyles.cssRule('html, body', { fontSize: px(16), padding: 0, margin: 0 })

globalStyles.cssRule('body', {
  color: '#828282',
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '12pt',
  width: '100%'
})

globalStyles.cssRule('a', {
  color: '#000000',
  textDecoration: 'none',
  $nest: {
    '&:hover, &:visited': {
      color: '#828282',
      transition: 'color .1s ease-out'
    }
  }
})

globalStyles.cssRule('.background-enter', {
  transform: 'translate(100%)'
})

globalStyles.cssRule('.background-enter.background-enter-active', {
  transform: 'translate(0%)',
  transition: 'transform 1000ms ease-in-out'
})

globalStyles.cssRule('.background-exit', {
  transform: 'translate(0%)'
})

globalStyles.cssRule('.background-exit.background-exit-active', {
  transform: 'translate(-100%)',
  transition: 'transform 1000ms ease-in-out'
})

globalStyles.cssRule('h4', { fontSize: em(1.1) })

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
  const app = renderToStaticMarkup(<AppShell history={history} ssrPreloading={ssrPreloading} />)

  // Return the rendered page
  reply.type('text/html')

  return renderToStaticMarkup(
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
        <meta name="theme-color" content="#ff6600" />

        <link rel="icon" href="/images/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="images/favicon.ico" sizes="196x196" />
        <link rel="manifest" href="/manifest.json" />

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
