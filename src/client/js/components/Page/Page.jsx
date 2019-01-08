import React, { useState, useEffect } from 'react'
import { More } from '../More'
import { Stories } from '../Stories'
import { Comments } from '../Comments'
import { fetchData } from '../../data/fetching'
import { ErrorPage } from '../../pages/ErrorPage'
import { OfflinePage } from '../../pages/OfflinePage'

const initialState = {
  data: null,
  error: null,
}

function pageFactory(type) {
  function Page({ match: { url, params }, ssrPreloading, ...props }) {
    const getPreloadedState = ({ success, payload }, state) =>
      success ? { ...state, data: payload } : { ...state, error: payload }

    const [state, setState] = useState(
      ssrPreloading.payload ? getPreloadedState(ssrPreloading, initialState) : initialState
    )

    const loadData = async () => {
      try {
        const data = await Page.fetchData(params)
        return setState({ ...state, data })
      } catch (error) {
        return setState({ ...state, error })
      }
    }

    useEffect(
      () => {
        setState({ data: null, error: null })

        if (ssrPreloading.payload) {
          const preloadedState = getPreloadedState(ssrPreloading, state)
          delete ssrPreloading.payload
          return setState(preloadedState)
        }

        loadData()
      },
      [url]
    )

    return state.error ? (
      <React.Fragment>
        {window.navigator.onLine && <ErrorPage {...props} error={state.error} />}
        {!window.navigator.onLine && <OfflinePage {...props} error={state.error} />}
      </React.Fragment>
    ) : (
      <main>
        <More {...props} data={state.data} />
        {type === 'comments' ? <Comments {...props} data={state.data} /> : <Stories {...props} data={state.data} />}
      </main>
    )
  }

  Page.fetchData = async function({ page }) {
    return fetchData(type, page)
  }

  return Page
}

export default pageFactory
