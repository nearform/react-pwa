const React = require('react')
const { connect } = require('react-redux')

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
