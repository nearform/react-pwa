import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function ShowStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>show</h1>
      <Stories {...props} />
    </div>
  )
}

ShowStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('show', page)
}
