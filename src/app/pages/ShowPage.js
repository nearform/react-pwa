const React = require('react')

const ShowStories = require('../containers/ShowStories')
const { pageTitleClassName, pageContentClassName } = require('../styles/common')

module.exports = function ShowPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>show</h1>
      <ShowStories />
    </div>
  )
}
