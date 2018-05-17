import { percent, px } from 'csx'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createTypeStyle, getStyles, media } from 'typestyle'
import { AppShell } from './js/AppShell'

const globalStyles = createTypeStyle() // Instantiate a different typestyle sheet since global styles won't be regenerated from the client

globalStyles.cssRule(
  'body',
  {
    color: '#828282',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: '10pt',
    margin: 0,
    width: percent(100)
  },
  media(
    { minWidth: px(600) },
    {
      margin: `${px(8)} auto`,
      width: percent(85)
    }
  )
)

globalStyles.cssRule('a', {
  color: '#000000',
  textDecoration: 'none',
  $nest: {
    '&:visited': {
      color: '#828282'
    }
  }
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
