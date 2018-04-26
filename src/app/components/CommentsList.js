const React = require('react')
const { withRouter } = require('react-router')
const { px } = require('csx')
const { style } = require('typestyle')
const { debugClassName } = require('../styles/common')

const More = require('../containers/More')
const TimeAgo = require('react-timeago').default

const getTitle = (title) => {
  if (!title) return
  return title.split('in "')[1].replace(/"/g, '')
}

const commentsListClassName = style(
  debugClassName('comments-list'),
  {
    listStyle: 'none',
    margin: `0 0 0 ${px(6)}`,
    padding: `0 0 0 ${px(2)}`
  }
)

const commentsListItemClassName = style(
  debugClassName('comments-list-item'),
  {
    lineHeight: '10pt',
    margin: `${px(6)} 0`
  }
)

const commentsListTitleClassName = style(
  debugClassName('comments-list-title'),
  {
    display: 'block',
    fontSize: '8pt',
    padding: `0 0 ${px(6)}`
  }
)

const commentsListContentClassName = style(
  debugClassName('comments-list-content'),
  {
    color: '#000',
    display: 'block',
    fontSize: '9pt',
    lineHeight: '12pt',
    padding: `0 0 ${px(6)}`,
    $nest: {
      p: {
        margin: `${px(4)} 0`
      }
    }
  }
)

const CommentsList = props => {
  const { comments } = props
  return (
    <React.Fragment>
      <ul className={commentsListClassName}>
        {comments.map(comment => (
          <li className={commentsListItemClassName} key={comment.isoDate}>
            <span className={commentsListTitleClassName}>
              {comment.creator}
              {' '} <TimeAgo date={comment.isoDate} />
              {' | '} on: {getTitle(comment.title)}</span>
            <span className={commentsListContentClassName} dangerouslySetInnerHTML={{__html: comment.content}} />
          </li>
        ))}
      </ul>
      <More />
    </React.Fragment>
  )
}
module.exports = withRouter(CommentsList)
