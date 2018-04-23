const React = require('react')

const AskStories = require('../containers/AskStories')
const { pageTitleClassName, pageContentClassName } = require('../styles/common')

module.exports = function AskPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Ask</h1>
      <AskStories />
    </div>
  )
}
