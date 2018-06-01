import React from 'react'
import { messageText } from '../styles/common'

export function ErrorPage(props) {
  return (
    <div className={messageText}>
      <h2>Woops, something went wrong</h2>
      <h4>Error: {props.error.message}</h4>
      <h6>Requested page: {props.location.pathname}</h6>
    </div>
  )
}
