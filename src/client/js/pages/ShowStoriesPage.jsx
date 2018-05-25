import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function ShowStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <Stories {...props} />
    </div>
  )
}

ShowStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('show', page)
}
