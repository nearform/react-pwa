const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { matchRoutes } = require('react-router-config')
const { createMemoryHistory } = require('history')

const AppShell = require('../app/AppShell')
const { configureStore } = require('../app/store')
const appRoutes = require('../app/routes')

module.exports = function renderAppShell (req, res) {
  const store = configureStore()
  const { route, match } = matchRoutes(appRoutes, req.url)[0]

  route.fetchData({ match, dispatch: store.dispatch }).then(initialState => {
    const history = createMemoryHistory({
      initialEntries: [req.url]
    })
    const html = ReactDOMServer.renderToString(
      <AppShell store={store} history={history} />
    )

    res.send(`
      <!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="/public/css/app-shell.css">
          <link rel="preload" href="/public/js/app-shell.js" as="script">
        </head>
        <body>
          <div id="app-root">${html}</div>
          <script>window.__INITIAL_STATE__= ${JSON.stringify(initialState)}</script>
          <script defer src="/public/js/app-shell.js"></script>
        </body>
      </html>
    `)
  }).catch(error => {
    console.error(error)
    res.json({
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  })
}
