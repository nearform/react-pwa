import React from 'react'
import { ShowStories } from '../containers/ShowStories'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function ShowPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>show</h1>
      <ShowStories />
    </div>
  )
}
