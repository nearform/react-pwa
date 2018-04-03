import React from 'react'
import { connect } from 'react-redux'

const LoadingIndicator = (props) => {
  if (!props.isFetching) return null
  return (
    <div>Loading</div>
  )
}

const mstp = (state) => {
  return { isFetching: state.pageLoader.isFetching }
}

export default connect(mstp)(LoadingIndicator)