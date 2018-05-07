import { px, rgb } from 'csx'
import React from 'react'
import { PageLoader } from 'react-page-loader-redux'
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { style } from 'typestyle'
import { LoadingIndicator } from './containers/LoadingIndicator'
import { Navigation } from './containers/Navigation'
import { ErrorPage } from './pages/ErrorPage'
import { OfflinePage } from './pages/OfflinePage'
// app-shell things
import { routes } from './routes'
import { debugClassName } from './styles/common'

const appShellClassName = style(
  debugClassName('app'),
  {
    background: rgb(246, 246, 239).toString(),
    borderBottom: `${px(2)} solid #fe6501`
  }
)

export class AppShell extends React.Component {
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
