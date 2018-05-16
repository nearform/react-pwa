import { matchRoutes } from 'react-router-config'
import { createMemoryHistory } from 'history'
import { actions } from 'react-page-loader-redux'

import configureStore from '../app/store'
import appRoutes from '../app/routes'
import renderAppShell from './helpers/rendering'

const { fetchPageData, handleError } = actions
export default async function appShellHandler (req, res) {
  try {
    const store = configureStore()
    const { route, match } = matchRoutes(appRoutes, req.url)[0]
    const history = createMemoryHistory({
      initialEntries: [req.url]
    })
    // this modifies the store
    // so when referenced below it will be populated
    const html = await store.dispatch(fetchPageData({ route, match }))
      .catch(error => {
        error.statusCode = error.statusCode || 500
        console.log('appShellHandler::fetchPageData error:')
        console.error(error)
        // error could be a axios object, strip it back to plain error
        const errObj = {
          name: error.name,
          message: error.message,
          stack: error.stack,
          statusCode: error.statusCode
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
