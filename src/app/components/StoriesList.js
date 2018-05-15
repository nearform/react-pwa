import React from 'react'
import More from '../containers/More'
import { withRouter } from 'react-router'

const calculateStartingNumber = (pathname) => {
  let currentPage = parseInt(pathname.split('page/')[1])
  if (!Number.isInteger(currentPage)) return 1
  return ((currentPage - 1) * 30 + 1)
}

const StoriesList = props => {
  const { stories, location } = props
  return (
    <React.Fragment>
      <ol className='stories-list-component' start={calculateStartingNumber(location.pathname)}>
        {stories.filter(Boolean).map(story => (
          <li className='stories-list-component__item' key={story.id}>
            <span><a href={story.url}>{story.title}</a></span>
            <br />
            <span className='stories-list-component__byline'>
              {story.score} points by {story.by.id}
            </span>
          </li>
        ))}
      </ol>
      <More />
    </React.Fragment>
  )
}
export default withRouter(StoriesList)
