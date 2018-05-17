import { percent, px, rem, rgb } from 'csx'
import React from 'react'
import { Router as ServerRouter, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { media, style } from 'typestyle'
import { routes } from '../routes'
import { Navigation } from './components/Navigation'
import { RouteWithData } from './components/RouteWithData'
import { debugClassName } from './styles/common'

const appShellClassName = style(
  debugClassName('app'),
  {
    background: rgb(246, 246, 239).toString(),
    borderBottom: `${px(2)} solid #fe6501`,
    width: percent(85),
    margin: `${rem(1)} auto`
  },
  media(
    { maxWidth: px(600) },
    {
      margin: `${rem(1)} ${rem(0.5)}`,
      width: `calc(${percent(100)} - 1rem)`
    }
  )
)

export function AppShell({ history, ssrPreloading }) {
  const routesConfig = Object.entries(routes).reduce((accu, [path, component]) => {
    return accu.concat({ path: path || '/', component, ssrPreloading, exact: true }, { path: `${path}/page/:page`, component, ssrPreloading, exact: true })
  }, [])

  const contents = (
    <div className={appShellClassName}>
      <Navigation />
      <Switch>{routesConfig.map((routeProps, i) => <RouteWithData key={i} {...routeProps} />)}</Switch>
    </div>
  )

  if (typeof window === 'undefined') {
    return <ServerRouter history={history}>{contents}</ServerRouter>
  } else {
    return <BrowserRouter>{contents}</BrowserRouter>
  }
}
