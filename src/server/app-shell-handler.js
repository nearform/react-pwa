const { matchRoutes } = require('react-router-config')
const { createMemoryHistory } = require('history')
const {
  actions: { fetchPageData, handleError }
} = require('react-page-loader-redux')

const { configureStore } = require('../app/store')
const appRoutes = require('../app/routes')
const { renderAppShell } = require('./helpers/rendering')

module.exports = async function appShellHandler (req, res) {
  const store = configureStore()
  const { route, match } = matchRoutes(appRoutes, req.url)[0]
  const history = createMemoryHistory({
    initialEntries: [req.url]
  })

  try {
    // this modifies the store
    // so when referenced below it will be populated
    const html = await store.dispatch(fetchPageData({ route, match }))
      .catch(error => {
        console.log('appShellHandler::fetchPageData error:')
        console.error(error)
        // error could be a axios object, strip it back to plain error
        const errObj = {
          name: error.name,
          message: error.message,
          stack: error.stack,
          statusCode: error.statusCode || 500
        }
        res.status(errObj.statusCode)
        store.dispatch(handleError(errObj))
      })
      .then(() => renderAppShell({ store, history }))

    return res.send(html)
  } catch (error) {
    error.statusCode = error.statusCode || 500
    console.log('appShellHandler: catastrophic error')
    console.error(error)
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode
    })
  }
}
