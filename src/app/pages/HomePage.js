const React = require('react')

const TopStories = require('../containers/TopStories')
const { pageContentClassName } = require('../styles/common')

module.exports = function HomePage () {
  return (
    <div className={pageContentClassName}>
      <TopStories />
    </div>
  )
}
