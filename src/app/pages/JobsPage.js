import React from 'react'
import { JobStories } from '../containers/JobStories'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function JobsPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>jobs</h1>
      <JobStories />
    </div>
  )
}
