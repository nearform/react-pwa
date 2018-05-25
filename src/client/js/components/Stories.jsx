import { rem, quote } from 'csx'
import React from 'react'
import { style, keyframes, media, classes } from 'typestyle'
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
},
media({minWidth: 751, maxWidth: 1100}, {gridTemplateColumns: 'repeat(2, 50%)'}),
media({minWidth: 1101}, {gridTemplateColumns: 'repeat(3, 33.333%)'}),
)

const loadingAnimationName = keyframes({
  '100%': { transform: 'translateX(100%)' }
})

const storiesListItemClassName = style(debugClassName('stories-list-item'), {
  padding: '1em 0 0 0',
  display: 'grid',
  gridRowGap: '.5em',
  gridTemplateColumns: '53px',
  backgroundImage: 'linear-gradient(0deg, #fff 97%, #e2e2e2 100%)',
},
media({minWidth: 751}, {borderRight: '1px solid #e2e2e2'})
)


const storiesListItemClassNamePlaceholder = style(debugClassName('stories-list-item'), {
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
  height: 40,
  textAlign: 'center',
  paddingTop: '1em',
  color: 'white',
})

const storiesListTitle = style(debugClassName('stories-list-title'), {
  padding: '0 1em 1em 1em',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '1',
  height: '4em',
  gridRowEnd: '2',
  $nest: {
    a: {
      color: 'black'
    }
  }
})

const storiesListTitlePlaceholder = style(debugClassName('stories-list-title'), {
  width: '66%'
})

const storiesListByLineClassName = style(debugClassName('stories-list-by-line'), {
  padding: '.5em .5em .5em 1.5em',
  gridColumnStart: '1',
  gridColumnEnd: '3',
  gridRowStart: '2',
  gridRowEnd: '3',
  margin: '2em 0 0 0',
  background: '#f7f7f8'
})

const placeholder = style({
  padding: 0,
  margin: 0,
  color: '#d4d4d4',
  background: '#d4d4d4',
})

const storiesListIndexClassNamePlaceholder = style(debugClassName('stories-list-index'), {
  background: '#d4d4d4',
  color: '#d4d4d4',
})

const noStoriesClassName = style(debugClassName('no-stories'), {
  padding: '1em',
  textAlign: 'center'
})

export function Stories({ data: stories, location }) {
  if (stories) {
    if (stories.length === 0) {
      return (
        <div className={noStoriesClassName}>No further items to display.</div>
      )
    }
    
    return (
      <ol className={storiesListClassName} start={calculateStartingNumber(location.pathname)}>
        {stories.filter(Boolean).map((story, index) => {
          const count = index === 0 ? calculateStartingNumber(location.pathname) : index + calculateStartingNumber(location.pathname);
          return (
          <li className={storiesListItemClassName} key={story.id}>
            <div className={storiesListIndexClassName}>{count}</div>
            <div className={storiesListTitle}><a href={story.url}>{story.title}</a></div>
            <div className={storiesListByLineClassName} suppressHydrationWarning>
              {story.score} points by {story.by.id}
            </div>
          </li>
        )
        })}
      </ol>
    )
  }

  return (
    <ol className={storiesListClassName}>
      {Array(20).fill({}).map((_, index) => (
        <li className={classes(storiesListItemClassName, storiesListItemClassNamePlaceholder)} key={index}>
          <div className={classes(storiesListIndexClassName, storiesListIndexClassNamePlaceholder)}>{index + 1}</div>
          <div className={classes(storiesListTitle, storiesListTitlePlaceholder)}><p className={placeholder}>placeholder title</p></div>
          <div className={storiesListByLineClassName}>
            <p className={placeholder}>n points by placeholder</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
