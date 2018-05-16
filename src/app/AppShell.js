import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Provider as ReduxProvider } from 'react-redux'
import { PageLoader } from 'react-page-loader-redux'
import LoadingIndicator from './containers/LoadingIndicator'

// app-shell things
import routes from './routes'
import Navigation from './containers/Navigation'
import ErrorPage from './pages/ErrorPage'
import OfflinePage from './pages/OfflinePage'

export default class AppShell extends React.Component {
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
          <div className='app-shell-component'>
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
