const React = require('react')

const JobStories = require('../containers/JobStories')

module.exports = function JobsPage () {
  return (
    <div className='page-content'>
      <h1 className='page-title'>jobs</h1>
      <JobStories />
    </div>
  )
}
