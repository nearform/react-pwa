import React from 'react'
import { connect } from 'react-redux'

const updateBodyClass = isFetching => {
  if (typeof document === 'undefined') return
  if (isFetching) {
    document.body.classList.add('is-loading')
  } else {
    document.body.classList.remove('is-loading')
  }
}

const LoadingIndicator = props => {
  updateBodyClass(props.isFetching)
  if (!props.isFetching) return null
  return (
    <div className='loading-indicator'>Loading</div>
  )
}

const mstp = (state) => {
  return { isFetching: state.pageLoader.isFetching }
}

export default connect(mstp)(LoadingIndicator)
