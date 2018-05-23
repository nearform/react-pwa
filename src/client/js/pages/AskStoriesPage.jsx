import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function AskStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>ask</h1>
      <Stories {...props} />
    </div>
  )
}

AskStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('ask', page)
}
