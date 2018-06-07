import React from 'react'
import { media, classes, stylesheet } from 'typestyle'
import { colors, loadingAnimation, placeholder, ergonomics } from '../../styles/common'

const calculateStartingNumber = pathname => {
  let currentPage = parseInt(pathname.split('page/')[1])
  if (!Number.isInteger(currentPage)) return 1
  return (currentPage - 1) * 30 + 1
}

const styles = stylesheet({
  storiesList: {
    display: 'grid',
    gridTemplateColumns: '100%',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
        maxWidth: ergonomics.LAP.END
      }, {
        gridTemplateColumns: 'repeat(2, 50%)'
      }
    ).$nest,
    ...media(
      {
        minWidth: ergonomics.DESK.BEGINNING
      }, {
        gridTemplateColumns: 'repeat(3, 33.333%)'
      }
    ).$nest
  },
  storiesListItem: {
    padding: '1em 0 0 0',
    display: 'grid',
    gridRowGap: '.5em',
    gridTemplateColumns: '53px',
    backgroundImage: `linear-gradient(0deg, white 97%, ${colors.LIGHT_GRAY} 100%)`,
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING
      }, {
        borderRight: `1px solid ${colors.LIGHT_GRAY}`
      }
    )
  },
  storiesListIndex: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '1',
    gridRowEnd: '3',
    background: colors.NEARFORM_BRAND_MAIN,
    height: 40,
    textAlign: 'center',
    paddingTop: '1em',
    color: 'white'
  },
  storiesListTitle: {
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
  },
  storiesListTitlePlaceholder: {
    width: '66%'
  },
  storiesListByLine: {
    padding: '.5em .5em .5em 1.5em',
    gridColumnStart: '1',
    gridColumnEnd: '3',
    gridRowStart: '2',
    gridRowEnd: '3',
    margin: '2em 0 0 0',
    background: colors.LIGHTEST_GRAY
  },
  noStories: {
    padding: '1em',
    textAlign: 'center'
  }
})

export function Stories({ data: stories, location }) {
  if (stories) {
    if (stories.length === 0) {
      return (
        <div className={styles.noStories}>No further items to display.</div>
      )
    }

    const startingNumber = calculateStartingNumber(location.pathname)

    return (
      <ol className={styles.storiesList} start={startingNumber}>
        {stories.filter(Boolean).map((story, index) => {
          const count = index === 0 ? startingNumber : index + startingNumber
          return (
            <li className={styles.storiesListItem} key={story.id}>
              <div className={styles.storiesListIndex}>{count}</div>
              <div className={styles.storiesListTitle}><a href={story.url}>{story.title}</a></div>
              <div className={styles.storiesListByLine} suppressHydrationWarning>
                {story.score} points by {story.by.id}
              </div>
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className={styles.storiesList}>
      {Array(20).fill({}).map((_, index) => (
        <li className={classes(styles.storiesListItem, loadingAnimation)} key={index}>
          <div className={classes(styles.storiesListIndex, placeholder)}>{index + 1}</div>
          <div className={classes(styles.storiesListTitle, styles.storiesListTitlePlaceholder)}><p className={placeholder}>placeholder title</p></div>
          <div className={styles.storiesListByLine}>
            <p className={placeholder}>n points by placeholder</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
