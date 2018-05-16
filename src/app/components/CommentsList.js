import React from 'react'
import { withRouter } from 'react-router'
import More from '../containers/More'
import TimeAgo from 'react-timeago'

const getTitle = (title) => {
  if (!title) return
  return title.split('in "')[1].replace(/"/g, '')
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
            <span className='comments-list-component__content' dangerouslySetInnerHTML={{__html: comment.content}} />
          </li>
        ))}
      </ul>
      <More />
    </React.Fragment>
  )
}
export default withRouter(CommentsList)
