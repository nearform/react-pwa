import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function TopStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <Stories {...props} />
    </div>
  )
}

TopStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('top', page)
}
