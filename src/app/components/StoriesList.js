import { px } from 'csx'
import React from 'react'
import { withRouter } from 'react-router'
import { style } from 'typestyle'
import { More } from '../containers/More'
import { debugClassName } from '../styles/common'

const calculateStartingNumber = (pathname) => {
  let currentPage = parseInt(pathname.split('page/')[1])
  if (!Number.isInteger(currentPage)) return 1
  return ((currentPage - 1) * 30 + 1)
}

const storiesListClassName = style(
  debugClassName('stories-list'),
  {
    margin: `0 0 0 ${px(6)}`,
    padding: `0 0 0 ${px(24)}`
  }
)

const storiesListItemClassName = style(
  debugClassName('stories-list-item'),
  {
    lineHeight: '11pt',
    margin: `${px(6)} 0`
  }
)

const storiesListByLineClassName = style(
  debugClassName('stories-list-by-line'),
  {
    color: '#828282',
    fontSize: '7pt',
    $nest: {
      'a:hover': {
        textDecoration: 'underline'
      }
    }
  }
)

export function StoriesListComponent (props) {
  const { stories, location } = props
  return (
    <React.Fragment>
      <ol className={storiesListClassName} start={calculateStartingNumber(location.pathname)}>
        {stories.filter(Boolean).map(story => (
          <li className={storiesListItemClassName} key={story.id}>
            <span><a href={story.url}>{story.title}</a></span>
            <br />
            <span className={storiesListByLineClassName}>
              {story.score} points by {story.by.id}
            </span>
          </li>
        ))}
      </ol>
      <More />
    </React.Fragment>
  )
}

export const StoriesList = withRouter(StoriesListComponent)
