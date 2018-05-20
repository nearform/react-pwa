import { percent, px, rem, rgb } from 'csx'
import React, { Fragment } from 'react'
import { Router as ServerRouter, Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { media, style } from 'typestyle'
import { routes } from '../routes'
import { Navigation } from './components/Navigation'
import { RouteWithData } from './components/RouteWithData'
import { debugClassName } from './styles/common'
import { LoadingPage } from './pages/LoadingPage'
import { OfflinePage } from './pages/OfflinePage'

export function AppShell({ history, ssrPreloading }) {
  const routesConfig = Object.entries(routes).reduce((accu, [path, component]) => {
    return accu.concat({ path: path || '/', component, ssrPreloading, exact: true }, { path: `${path}/page/:page`, component, ssrPreloading, exact: true })
  }, [])

  console.log(routesConfig)

  const Contents = ({location}) => {
    return (
    <>
      <Navigation />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="background"
          timeout={1000}
        >
          <Switch location={location}>
            <Route exact path="/" component={OfflinePage} />
            <Route exact path="/newest" component={LoadingPage} />
            <Route exact path="/newcomments" component={OfflinePage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )}

  if (typeof window === 'undefined') {
    return <ServerRouter history={history}><Route render={({location}) => (<Contents location={location} />)}/></ServerRouter>
  } else {
    return <BrowserRouter><Route render={({ location }) => (<Contents location={location} />)}/></BrowserRouter>
  }
}
