const React = require('react')

const TopStories = require('../containers/TopStories')

module.exports = function HomePage () {
  return (
    <div className='page-content'>
      <TopStories />
    </div>
  )
}
