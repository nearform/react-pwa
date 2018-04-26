const React = require('react')

const { pageTitleClassName } = require('../styles/common')

module.exports = function ErrorPage () {
  return (
    <h1 className={pageTitleClassName}>Woops, something went wrong</h1>
  )
}
