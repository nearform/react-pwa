const React = require('react')
const ReactDOMServer = require('react-dom/server')
const serialize = require('serialize-javascript')
let appInsights = ''
const insightskey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY
if (insightskey) {
  appInsights = `
        <script type="text/javascript">
          var appInsights=window.appInsights||function(a){
            function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c
            }({
                instrumentationKey:"${insightskey}"
            });

          window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView();
        </script>
  `
}

const AppShell = require('../../app/AppShell')

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
        <link rel="stylesheet" href="/css/app-shell.css">
        <link rel="preload" href="/js/app-shell.js" as="script">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/images/favicon.ico">
      </head>
      <body>
        <div id="app-root">${html}</div>
        <script>window.__INITIAL_STATE__= ${serialize(initialState)}</script>
        <script defer src="/js/app-shell.js"></script>
        ${appInsights}
      </body>
    </html>
  `)
}

module.exports = {
  renderAppShell
}
