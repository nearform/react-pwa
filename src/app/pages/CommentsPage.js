const React = require('react')
const Comments = require('../containers/Comments')
const { pageTitleClassName, pageContentClassName } = require('../styles/common')

module.exports = function CommentsPage () {
  return (
    <div className={pageContentClassName}>
      <h1 className={pageTitleClassName}>Comments</h1>
      <Comments />
    </div>
  )
}
