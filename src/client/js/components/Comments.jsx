import { rem } from 'csx'
import React from 'react'
import TimeAgo from 'react-timeago'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'
import { More, moreLinkClassName } from './More'

const getTitle = title => {
  return (title || '')
    .split('in "')
    .pop()
    .replace(/"/g, '')
}

const commentsListClassName = style(debugClassName('comments-list'), {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  $nest: {
    [`& + .${moreLinkClassName}`]: {
      paddingLeft: 0
    }
  }
})

const commentsListItemClassName = style(debugClassName('comments-list-item'), {
  lineHeight: '10pt',
  margin: `${rem(2)} 0`
})

const commentsListTitleClassName = style(debugClassName('comments-list-title'), {
  display: 'block',
  padding: `0 0 ${rem(1)}`
})

const commentsListContentClassName = style(debugClassName('comments-list-content'), {
  color: '#000',
  display: 'block',
  paddingBottom: rem(1),
  $nest: {
    p: {
      margin: `${rem(0.5)} 0`
    }
  }
})

export function Comments({ data: comments, location }) {
  return (
    <React.Fragment>
      <ul className={commentsListClassName}>
        {comments.map((comment, index) => (
          <li className={commentsListItemClassName} key={`${comment.isoDate}-${index}`}>
            <span className={commentsListTitleClassName}>
              {comment.creator} <TimeAgo date={comment.isoDate} />
              {' | '} on: {getTitle(comment.title)}
            </span>
            <span className={commentsListContentClassName} dangerouslySetInnerHTML={{ __html: comment.content }} />
          </li>
        ))}
      </ul>
      <More location={location} />
    </React.Fragment>
  )
}
