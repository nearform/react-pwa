const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { createMemoryHistory } = require('history');

const AppShell = require('../app/AppShell');
const { configureStore } = require('../app/store');

module.exports = function renderAppShell(req, res) {
  console.log('\n\n\n req.url:', req.url);

  const initialState = {};
  const store = configureStore({ initialState });
  const history = createMemoryHistory({
    initialEntries: [req.url]
  });
  const html = ReactDOMServer.renderToString(
    <AppShell store={store} history={history} />
  );

  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="preload" href="/public/js/app-shell.js" as="script">
      </head>
      <body>
        <div id="app-root">${html}</div>
        <script>window.__INITIAL_STATE__= ${JSON.stringify(initialState)}</script>
        <script defer src="/public/js/app-shell.js"></script>
      </body>
    </html>
  `);
}
