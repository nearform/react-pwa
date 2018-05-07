import React from 'react'
import { TopStories } from '../containers/TopStories'
import { pageContentClassName } from '../styles/common'

export function HomePage () {
  return (
    <div className={pageContentClassName}>
      <TopStories />
    </div>
  )
}
