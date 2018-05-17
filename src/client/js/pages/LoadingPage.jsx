import React from 'react'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function LoadingPage() {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Loading...</h1>
    </div>
  )
}
