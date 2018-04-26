const React = require('react')
const { ConnectedRouter } = require('react-router-redux')
const { Provider: ReduxProvider } = require('react-redux')
const { PageLoader } = require('react-page-loader-redux')
const LoadingIndicator = require('./containers/LoadingIndicator').default
const { px, rgb } = require('csx')
const { style } = require('typestyle')
const { debugClassName } = require('./styles/common')

// app-shell things
const routes = require('./routes')
const Navigation = require('./containers/Navigation')
const ErrorPage = require('./pages/ErrorPage')
const OfflinePage = require('./pages/OfflinePage')

const appShellClassName = style(
  debugClassName('app'),
  {
    background: rgb(246, 246, 239).toString(),
    borderBottom: `${px(2)} solid #fe6501`
  }
)

class AppShell extends React.Component {
  componentDidMount () {
    if (!navigator || !navigator.serviceWorker) {
      // service worker not supported
      return
    }

    const ric = window.requestIdleCallback || setTimeout

    ric(() => {
      navigator.serviceWorker.register('/sw.js')
        .catch(function (err) {
          console.log('ServiceWorker registration failed: ', err)
        })
    })
  }

  render () {
    const { store, history } = this.props

    return (
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <div className={appShellClassName}>
            <Navigation />
            <LoadingIndicator />
            <PageLoader
              routes={routes}
              ErrorPage={ErrorPage}
              OfflinePage={OfflinePage}
            />
          </div>
        </ConnectedRouter>
      </ReduxProvider>
    )
  }
}

module.exports = AppShell
