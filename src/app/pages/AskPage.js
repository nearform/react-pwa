import React from 'react'
import { AskStories } from '../containers/AskStories'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function AskPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Ask</h1>
      <AskStories />
    </div>
  )
}
