const React = require('react')
const { connect } = require('react-redux')

const updateBodyClass = isFetching => {
  if (typeof document === 'undefined') return
  if (isFetching) {
    document.body.classList.add('js-loading')
  } else {
    document.body.classList.remove('js-loading')
    document.body.classList.add('js-finished-loading')
  }
  setTimeout(() => {
    document.body.classList.remove('js-finished-loading')
  }, 200)
}

const LoadingIndicator = props => {
  updateBodyClass(props.isFetching)
  if (!props.isFetching) return null
  return (
    <div className="loading-indicator">Loading</div>
  )
}

const mstp = (state) => {
  return { isFetching: state.pageLoader.isFetching }
}

export default connect(mstp)(LoadingIndicator)
