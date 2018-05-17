import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function JobsStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>jobs</h1>
      <Stories {...props} />
    </div>
  )
}

JobsStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('jobs', page)
}
