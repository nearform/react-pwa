import React from 'react'
import { pageContentClassName, pageTitleClassName } from '../styles/common'

export function ErrorPage(props) {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Woops, something went wrong</h1>
      <h4>Error: {props.error.message}</h4>
      <h6>Requested page: {props.location.pathname}</h6>
    </div>
  )
}
