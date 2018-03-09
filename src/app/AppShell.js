const React = require('react')
const { ConnectedRouter } = require('react-router-redux')
const { Provider: ReduxProvider } = require('react-redux')
// const { renderRoutes } = require('react-router-config')

// app-shell things
const routes = require('./routes')
const Navigation = require('./components/Navigation')
const PageLoader = require('./containers/PageLoader')

// old way: {renderRoutes(routes)}

function AppShell ({ store, history }) {
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

module.exports = AppShell
