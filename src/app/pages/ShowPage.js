const React = require('react')

const ShowStories = require('../containers/ShowStories')

module.exports = function ShowPage () {
  return (
    <div className='page-content'>
      <h1 className='page-title'>show</h1>
      <ShowStories />
    </div>
  )
}
