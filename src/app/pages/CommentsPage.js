const React = require('react')
const Comments = require('../containers/Comments')

module.exports = function CommentsPage () {
  return (
    <div className='page-content'>
      <h1 className='page-title'>Comments</h1>
      <Comments />
    </div>
  )
}
