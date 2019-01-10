import React from 'react'
import { Router as ServerRouter, Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import routes from '../routes'
import Header from './components/Header'

export function AppShell({ history, ssrPreloading }) {
  const routesConfig = routes.reduce((accu, { path, exact, component }) => {
    return accu.concat(
      { path, exact, component, ssrPreloading },
      { path: `${path === '/' ? '' : path}/page/:page`, exact: true, component, ssrPreloading }
    )
  }, [])

  const SelectedRouter = typeof window === 'undefined' ? ServerRouter : BrowserRouter

  return (
    <SelectedRouter history={history}>
      <>
        <Header />
        <Switch>
          {routesConfig.map(({ component: Component, ssrPreloading, ...routeProps }, i) => (
            <Route key={i} {...routeProps} render={props => <Component {...props} ssrPreloading={ssrPreloading} />} />
          ))}
        </Switch>
      </>
    </SelectedRouter>
  )
}
