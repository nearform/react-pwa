import { px } from 'csx'
import React from 'react'
import { withRouter } from 'react-router'
import TimeAgo from 'react-timeago'
import { style } from 'typestyle'
import { More } from '../containers/More'
import { debugClassName } from '../styles/common'

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

export function CommentsListComponent (props) {
  const { comments } = props
  return (
    <React.Fragment>
      <ul className={commentsListClassName}>
        {comments.map((comment, index) => (
          <li className={commentsListItemClassName} key={`${comment.isoDate}-${index}`}>
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

export const CommentsList = withRouter(CommentsListComponent)
