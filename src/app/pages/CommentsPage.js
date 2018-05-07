import React from 'react'
import { Comments } from '../containers/Comments'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function CommentsPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Comments</h1>
      <Comments />
    </div>
  )
}
