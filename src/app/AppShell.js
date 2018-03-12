const React = require('react')
const { ConnectedRouter } = require('react-router-redux')
const { Provider: ReduxProvider } = require('react-redux')
// const { renderRoutes } = require('react-router-config')

// app-shell things
const routes = require('./routes')
const Navigation = require('./components/Navigation')
const PageLoader = require('./containers/PageLoader')

class AppShell extends React.Component {
  componentDidMount () {
    if (!navigator || !navigator.serviceWorker) {
      // service worker not supported
      return
    }

    window.requestIdleCallback(() => {
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
          <div className='app-shell-component'>
            <Navigation />
            <PageLoader routes={routes} />
          </div>
        </ConnectedRouter>
      </ReduxProvider>
    )
  }
}

module.exports = AppShell
