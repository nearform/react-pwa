const React = require('react');
const ReactDOMServer = require('react-dom/server');

const AppShell = require('../app/AppShell');

module.exports = function renderAppShell(req, res) {
  const initialState = {};
  const html = ReactDOMServer.renderToString(<AppShell />);

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
