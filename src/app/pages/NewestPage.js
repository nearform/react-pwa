const React = require('react')

const NewStories = require('../containers/NewStories')
const { pageTitleClassName, pageContentClassName } = require('../styles/common')

module.exports = function NewestPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>newest</h1>
      <NewStories />
    </div>
  )
}
