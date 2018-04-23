const React = require('react')

const { pageContentClassName } = require('../styles/common')

module.exports = function LoadingPage () {
  return (
    <div className={pageContentClassName}>
      <div>Loading...</div>
    </div>
  )
}
