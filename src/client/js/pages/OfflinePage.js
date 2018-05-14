import React from 'react'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function OfflinePage() {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Looks like you are offline!</h1>
    </div>
  )
}
