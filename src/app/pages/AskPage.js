const React = require('react')

const AskStories = require('../containers/AskStories')

module.exports = function AskPage () {
  return (
    <div className='page-content'>
      <h1 className='page-title'>Ask</h1>
      <AskStories />
    </div>
  )
}
