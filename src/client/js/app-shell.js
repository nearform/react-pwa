require('babel-polyfill')
const React = require('react')
const { hydrate } = require('react-dom')
const { createBrowserHistory } = require('history')
const { routerMiddleware } = require('react-router-redux')

const { configureStore } = require('../../app/store')
const AppShell = require('../../app/AppShell')

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
