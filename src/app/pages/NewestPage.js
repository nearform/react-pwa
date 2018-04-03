const React = require('react')

const NewStories = require('../containers/NewStories')

module.exports = function NewestPage () {
  return (
    <div className='page-content'>
      <h1 className='page-title'>newest</h1>
      <NewStories />
    </div>
  )
}
