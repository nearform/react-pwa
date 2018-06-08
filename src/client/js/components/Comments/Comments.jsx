import React from 'react'
import TimeAgo from 'react-timeago'
import { classes, stylesheet } from 'typestyle'
import { loadingAnimation, placeholder } from '../../styles/common'

const getTitle = title => {
  return (title || '')
    .split('in "')
    .pop()
    .replace(/"/g, '')
}

const styles = stylesheet({
  commentsList: {
    listStyle: 'none',
    margin: 0,
    padding: '1em',
    overflowX: 'hidden'
  },
  commentsListItem: {
    lineHeight: '10pt'
  },
  commentsListTitle: {
    display: 'block',
    margin: '0 0 1em'
  },
  commentsListContent: {
    color: 'black',
    display: 'block',
    margin: '1em 0 1em 1em',
    $nest: {
      p: {
        margin: `.5em 0`
      }
    }
  },
  noComments: {
    padding: '1em',
    textAlign: 'center'
  }
})

export function Comments({ data: comments }) {
  if (comments) {
    if (comments.length === 0) {
      return (
        <div className={styles.noComments}>No further comments to display.</div>
      )
    }

    return (
      <ul className={styles.commentsList}>
        {comments.map((comment, index) => (
          <li className={styles.commentsListItem} key={`${comment.isoDate}-${index}`}>
            <span className={styles.commentsListTitle}>
              <TimeAgo date={comment.isoDate} /> by {comment.creator} on {getTitle(comment.title)}
            </span>
            <span className={styles.commentsListContent} dangerouslySetInnerHTML={{ __html: comment.content }} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={styles.commentsList}>
      {Array(10).fill({}).map((_, index) => (
        <li className={classes(styles.commentsListItem, loadingAnimation)} key={`placeholder-${index}`}>
          <span className={classes(styles.commentsListTitle, placeholder)}>
            time ago by placeholder
          </span>

          <span className={classes(styles.commentsListContent, placeholder)}>
            placeholder comments
          </span>

          <span className={classes(styles.commentsListContent, placeholder)}>
            placeholder comments
          </span>

          <span className={classes(styles.commentsListContent, placeholder)}>
            placeholder comments
          </span>
        </li>
      ))}
    </ul>
  )
}
