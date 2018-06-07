import React from 'react'
import { Stories } from './js/components/Stories'
import { Comments } from './js/components/Comments'
import { fetchData } from './js/data/fetching'

function pageFactory(type) {
  function Page(props) {
    return (
      <main>
        {type === 'comments' ? <Comments {...props} /> : <Stories {...props} />}
      </main>
    )
  }

  Page.dataFetcher = async function({ page }) {
    return fetchData(type, page)
  }

  return Page
}

export const routes = {
  '': pageFactory('top'),
  '/newest': pageFactory('new'),
  '/newcomments': pageFactory('comments'),
  '/show': pageFactory('show'),
  '/ask': pageFactory('ask'),
  '/jobs': pageFactory('jobs')
}
