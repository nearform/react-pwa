const React = require('react')
const { withRouter } = require('react-router')
const More = require('../containers/More')
const TimeAgo = require('react-timeago').default
const sanitizeHtml = require('sanitize-html')

const getTitle = (title) => {
  return title.split('in')[1].split('"')[1]
}

const cleanHTML = (content) => {
  return {
    '__html': sanitizeHtml(content)
  }
}

const CommentsList = props => {
  const { comments } = props
  return (
    <React.Fragment>
      <ul className='comments-list-component'>
        {comments.map(comment => (
          <li className='comments-list-component__item' key={comment.isoDate}>
            <span className='comments-list-component__title'>
              {comment.creator}
              {' '} <TimeAgo date={comment.isoDate} />
              {' | '} on: {getTitle(comment.title)}</span>
            <span className='comments-list-component__content' dangerouslySetInnerHTML={cleanHTML(comment.content)} />
          </li>
        ))}
      </ul>
      <More />
    </React.Fragment>
  )
}
module.exports = withRouter(CommentsList)
