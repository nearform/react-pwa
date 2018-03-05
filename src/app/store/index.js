const { applyMiddleware, combineReducers, createStore } = require('redux')

const reducers = require('./reducers')

function configureStore ({ initialState, middleware = [] }) {
  const reducer = combineReducers(reducers)

  return createStore(reducer, initialState, applyMiddleware(...middleware))
}

module.exports = {
  configureStore
}
