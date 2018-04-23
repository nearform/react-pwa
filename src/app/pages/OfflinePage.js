const React = require('react')

const { pageTitleClassName } = require('../styles/common')

module.exports = function OfflinePage () {
  return (
    <h1 className={pageTitleClassName}>Looks like you are offline</h1>
  )
}
