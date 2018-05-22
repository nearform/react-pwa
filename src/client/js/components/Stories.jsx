import { rem, quote } from 'csx'
import React from 'react'
import { style, keyframes } from 'typestyle'
import { debugClassName } from '../styles/common'

const calculateStartingNumber = pathname => {
  let currentPage = parseInt(pathname.split('page/')[1])
  if (!Number.isInteger(currentPage)) return 1
  return (currentPage - 1) * 30 + 1
}

const storiesListClassName = style(debugClassName('stories-list'), {
  display: 'grid',
  gridTemplateColumns: '100%',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
})

const loadingAnimationName = keyframes({
  '100%': { transform: 'translateX(100%)' }
})

const storiesListItemClassName = style(debugClassName('stories-list-item'), {
  padding: '1em 1em 1em 0',
  display: 'grid',
  gridRowGap: '.5em',
  gridTemplateColumns: '53px',
  backgroundImage: 'linear-gradient(0deg, #fff 97%, #e2e2e2 100%)',
})


const storiesListItemClassNamePlaceholder = style(debugClassName('stories-list-item'), {
  padding: '1em 1em 1em 0',
  display: 'grid',
  gridRowGap: '.5em',
  gridTemplateColumns: '53px',
  backgroundImage: 'linear-gradient(0deg, #fff 97%, #e2e2e2 100%)',
  $nest: {
    '&::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.15), rgba(0,0,0,0))',
      transform: 'translateX(-100%)',
      animationName: loadingAnimationName,
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
    }
  }
})

const storiesListIndexClassName = style(debugClassName('stories-list-index'), {
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '1',
  gridRowEnd: '3',
  background: '#ec1c2b',
  width: 20,
  height: 20,
  textAlign: 'center',
  padding: '1em',
  color: 'white',
})

const storiesListTitle = style(debugClassName('stories-list-title'), {
  padding: '0 1em 1em 1em',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '1',
  gridRowEnd: '2',
})

const storiesListTitlePlaceholder = style(debugClassName('stories-list-title'), {
  padding: '0 1em 1em 1em',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '1',
  gridRowEnd: '2',
  width: '66%'
})

const storiesListByLineClassName = style(debugClassName('stories-list-by-line'), {
  padding: '1em',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '2',
  gridRowEnd: '3',
})

const placeholder = style({
  padding: 0,
  margin: 0,
  color: '#d4d4d4',
  background: '#d4d4d4',
})

const storiesListIndexClassNamePlaceholder = style(debugClassName('stories-list-index'), {
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '1',
  gridRowEnd: '3',
  background: '#d4d4d4',
  width: 20,
  height: 20,
  textAlign: 'center',
  padding: '1em',
  color: '#d4d4d4',
})

export function Stories({ data: stories, location }) {
  if (stories) {
    return (
      <ol className={storiesListClassName} start={calculateStartingNumber(location.pathname)}>
        {stories.filter(Boolean).map((story, index) => {
          const count = index === 0 ? calculateStartingNumber(location.pathname) : index + calculateStartingNumber(location.pathname);
          return (
          <li className={storiesListItemClassName} key={story.id}>
            <div className={storiesListIndexClassName}>{count}</div>
            <div className={storiesListTitle}><a href={story.url}>{story.title}</a></div>
            <div className={storiesListByLineClassName} suppressHydrationWarning>
              1 hour ago by {story.by.id} ({story.score} points)
            </div>
          </li>
        )
        })}
      </ol>
    )
  }

    return (<ol className={storiesListClassName}>
      {Array(5).fill({}).map((_, index) => (
        <li className={storiesListItemClassNamePlaceholder} key={index}>
          <div className={storiesListIndexClassNamePlaceholder}>{index + 1}</div>
          <div className={storiesListTitlePlaceholder}><p className={placeholder}>This is title</p></div>
          <div className={storiesListByLineClassName} suppressHydrationWarning>
            <p className={placeholder}>1 hour ago by dave (6 points)</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
