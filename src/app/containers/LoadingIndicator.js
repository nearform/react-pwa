const React = require('react')
const { connect } = require('react-redux')
const { px, percent } = require('csx')
const { style, keyframes } = require('typestyle')

const { pageContentClassName, debugClassName } = require('../../app/styles/common')

const loadingIndicatorAnimation = keyframes({
  from: {opacity: 0},
  to: {opacity: 1}
})

const loadingIndicatorClassName = style(
  debugClassName('loading-indicator'),
  {
    animation: `${loadingIndicatorAnimation} .2s .2s ease-out forwards`,
    left: percent(50),
    opacity: 0,
    position: 'absolute',
    top: px(54),
    transform: `translateX(${percent(-50)})`
  }
)

const loadingBodyClassName = style(
  debugClassName('loading-body'),
  {
    $nest: {
      [`.${pageContentClassName}`]: {opacity: 0}
    }
  }
)

const updateBodyClass = isFetching => {
  if (typeof document === 'undefined') return
  if (isFetching) {
    document.body.classList.add(loadingBodyClassName)
  } else {
    document.body.classList.remove(loadingBodyClassName)
  }
}

const LoadingIndicator = props => {
  updateBodyClass(props.isFetching)
  if (!props.isFetching) return null
  return (
    <div className={loadingIndicatorClassName}>Loading</div>
  )
}

const mstp = (state) => {
  return { isFetching: state.pageLoader.isFetching }
}

export default connect(mstp)(LoadingIndicator)
