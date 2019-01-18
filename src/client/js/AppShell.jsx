import React, { useState, useCallback } from 'react'
import { Router as ServerRouter, Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import env from 'exenv'
import routes from '../routes'
import SkipLinks from './components/SkipLinks'
import Header from './components/Header'
import AddToHomescreen from './components/AddToHomescreen'

export function AppShell({ history, ssrPreloading }) {
  const [navigationVisible, setNavigationVisible] = useState(false)
  const toggleNavigation = useCallback(() => setNavigationVisible(oldNavigationVisible => !oldNavigationVisible), [])

  const routesConfig = routes.reduce((accu, { path, exact, component }) => {
    return accu.concat(
      { path, exact, component, ssrPreloading },
      { path: `${path === '/' ? '' : path}/page/:page`, exact: true, component, ssrPreloading }
    )
  }, [])

  const SelectedRouter = env.canUseDOM ? BrowserRouter : ServerRouter

  return (
    <SelectedRouter history={history}>
      <>
        <SkipLinks />
        <Header navigationVisible={navigationVisible} toggleNavigation={toggleNavigation} />
        <Switch>
          {routesConfig.map(({ component: Component, ssrPreloading, ...routeProps }, i) => (
            <Route
              key={i}
              {...routeProps}
              render={props => (
                <Component {...props} ssrPreloading={ssrPreloading} navigationVisible={navigationVisible} />
              )}
            />
          ))}
        </Switch>
        <AddToHomescreen />
      </>
    </SelectedRouter>
  )
}
