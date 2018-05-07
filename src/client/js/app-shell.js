import { createBrowserHistory } from 'history'
import React from 'react'
import { hydrate } from 'react-dom'
import { routerMiddleware } from 'react-router-redux'
import { AppShell } from '../../app/AppShell'
import { configureStore } from '../../app/store'

window.process = {env: process.env} // This is to make sure process.env is available when loaded from SW

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
