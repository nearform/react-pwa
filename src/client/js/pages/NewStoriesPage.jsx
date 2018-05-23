import React from 'react'
import { Stories } from '../components/Stories'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function NewStoriesPage(props) {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>newest</h1>
      <Stories {...props} />
    </div>
  )
}

NewStoriesPage.dataFetcher = async function({ page }) {
  return fetchData('new', page)
}
