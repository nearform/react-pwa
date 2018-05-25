import React from 'react'
import { Comments } from '../components/Comments'
import { fetchData } from '../data/fetching'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function NewCommentsPage(props) {
  return (
    <div className={pageContentClassName}>
      <Comments {...props} />
    </div>
  )
}

NewCommentsPage.dataFetcher = async function({ page }) {
  return fetchData('comments', page)
}
