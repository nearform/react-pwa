import React from 'react'
import { pageContentClassName, pageTitleClassName, debugClassName } from '../styles/common'
import { rem, quote } from 'csx'
import { style, keyframes } from 'typestyle'

const storiesListClassName = style(debugClassName('stories-list'), {
  display: 'grid',
  gridTemplateColumns: '100%',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
})

const storiesListItemClassName = style(debugClassName('stories-list-item'), {
  padding: '1em 1em 1em 0',
  display: 'grid',
  gridRowGap: '.5em',
  gridTemplateColumns: '53px',
  backgroundImage: 'linear-gradient(0deg, #fff 97%, #e2e2e2 100%)',
  $nest: {
    '&::after': {
      content: '',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.15), rgba(0,0,0,0))',
      transform: 'translateX(-100%)',
      animationName: 'loadingAnimationName',
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
  background: '#d4d4d4',
  width: 20,
  height: 20,
  textAlign: 'center',
  padding: '1em',
  color: '#d4d4d4',
})

const storiesListTitle = style(debugClassName('stories-list-title'), {
  padding: '0 1em 1em 1em',
  gridColumnStart: '2',
  gridColumnEnd: '3',
  gridRowStart: '1',
  gridRowEnd: '2',
  width: '75%'

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

const loadingAnimationName = keyframes({
  '100%': { transform: 'translateX(100%)' }
})

export function LoadingPage() {
  return (
    <div className={pageContentClassName}>
      <ol className={storiesListClassName}>
        {Array(5).fill({}).map((_, index) => (
          <li className={storiesListItemClassName} key={index}>
            <div className={storiesListIndexClassName}>{index + 1}</div>
            <div className={storiesListTitle}><p className={placeholder}>This is title</p></div>
            <div className={storiesListByLineClassName} suppressHydrationWarning>
              <p className={placeholder}>1 hour ago by dave (6 points)</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
