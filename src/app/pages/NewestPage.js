import React from 'react'
import { NewStories } from '../containers/NewStories'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function NewestPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>newest</h1>
      <NewStories />
    </div>
  )
}
