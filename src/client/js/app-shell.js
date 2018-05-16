import React from 'react'
import { hydrate } from 'react-dom'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import configureStore from '../../app/store'
import AppShell from '../../app/AppShell'

const history = createBrowserHistory()
const store = configureStore({
  initialState: window.__INITIAL_STATE__,
  middleware: [
    routerMiddleware(history)
  ]
})

const container = document.getElementById('app-root')

hydrate(<AppShell history={history} store={store} />, container)
// delete initialState
