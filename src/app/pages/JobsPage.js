const React = require('react')

const JobStories = require('../containers/JobStories')
const { pageTitleClassName, pageContentClassName } = require('../styles/common')

module.exports = function JobsPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>jobs</h1>
      <JobStories />
    </div>
  )
}
