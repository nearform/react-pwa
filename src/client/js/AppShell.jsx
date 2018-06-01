import React, { Fragment } from 'react'
import { Router as ServerRouter, Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from '../routes'
import Header from './components/Header'
import { RouteWithData } from './components/RouteWithData'

export function AppShell({ history, ssrPreloading }) {
  const routesConfig = Object.entries(routes).reduce((accu, [path, component]) => {
    return accu.concat({ path: path || '/', component, ssrPreloading, exact: true }, { path: `${path}/page/:page`, component, ssrPreloading, exact: true })
  }, [])

  const Contents = ({location}) => {
    return (
      <Fragment>
        <Header location={location} />
        <Switch location={location}>
          {routesConfig.map((routeProps, i) => <RouteWithData key={i} {...routeProps} />)}
        </Switch>
      </Fragment>
    )
  }

  if (typeof window === 'undefined') {
    return (
      <ServerRouter history={history}>
        <Route render={({location}) => (
          <Contents location={location} />
        )} />
      </ServerRouter>
    )
  }

  return (
    <BrowserRouter>
      <Route render={({ location }) => (
        <Contents location={location} />
      )} />
    </BrowserRouter>
  )
}
