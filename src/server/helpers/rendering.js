const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { px, percent } = require('csx')
const { createTypeStyle, getStyles, media } = require('typestyle')
const serialize = require('serialize-javascript')

const AppShell = require('../../app/AppShell')

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
  media({minWidth: px(600)}, {
    margin: `${px(8)} auto`,
    width: percent(85)
  })
)

globalStyles.cssRule(
  'a',
  {
    color: '#000000',
    textDecoration: 'none',
    $nest: {
      '&:visited': {
        color: '#828282'
      }
    }
  }
)

function renderAppShell ({ store, history }) {
  const initialState = store.getState()
  const html = ReactDOMServer.renderToString(
    <AppShell store={store} history={history} />
  )

  return (`
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#ff6600">
        <style>${globalStyles.getStyles()}</style>
        <style>${getStyles()}</style>
        <link rel="preload" href="/js/app-shell.js" as="script">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/images/favicon.ico">
      </head>
      <body>
        <div id="app-root">${html}</div>
        <script>window.__INITIAL_STATE__= ${serialize(initialState)}</script>
        <script defer src="/js/app-shell.js"></script>
      </body>
    </html>
  `)
}

module.exports = {
  renderAppShell
}
