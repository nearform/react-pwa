import React from 'react'
import { Link } from 'react-router-dom'
import { stylesheet, classes } from 'typestyle'
import { colors } from '../styles/common'

const buildLinks = pathname => {
  const pathParts = pathname.split('/')
  const currentPage = parseInt(pathname.split('page/')[1])
  const nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  const prevPage = Number.isInteger(currentPage) && currentPage > 2 ? currentPage - 1 : null

  if (!pathParts[1] || pathParts[1] === 'page') {
    return {
      currentPage,
      prevLinkEnabled: currentPage >= 2,
      prevLink: Number.isInteger(currentPage) && currentPage > 2 ? `/page/${prevPage}` : '/',
      nextLink: `/page/${nextPage}`
    }
  }

  return {
    currentPage,
    prevLinkEnabled: currentPage >= 2,
    prevLink: Number.isInteger(currentPage) && currentPage > 2 ? `/${pathParts[1]}/page/${prevPage}` : `/${pathParts[1]}`,
    nextLink: `/${pathParts[1]}/page/${nextPage}`
  }
}

const styles = stylesheet({
  more: {
    padding: `1em 0 1em 0`,
    background: colors.LIGHTEST_GRAY,
    textAlign: 'right',
    gridColumnStart: '1',
    gridColumnEnd: '4',
    gridRowStart: '2',
    marginRight: '6px'
  },
  moreItem: {
    background: colors.NEARFORM_BRAND_ACCENT_2,
    marginLeft: '1em',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '800',
    padding: '10px 12px',
    borderRadius: '10px',
    boxShadow: '2px 2px 8px 0px rgba( 0, 0, 0, 0.2 )'
  },
  moreDisabled: {
    background: colors.GRAY,
    cursor: 'not-allowed',
    boxShadow: 'none'
  }
})

export function More({ location }) {
  const {nextLink, prevLink, prevLinkEnabled, currentPage} = buildLinks(location.pathname)

  const rangeStart = currentPage ? 30 * (currentPage - 1) + 1 : 1
  const rangeEnd = rangeStart + 29

  return (
    <div className={styles.more}>
      <span>{rangeStart} - {rangeEnd}</span>

      {prevLinkEnabled &&
        <Link className={styles.moreItem} to={prevLink}>
          {'<'}
        </Link>
      }

      {!prevLinkEnabled &&
        <span className={classes(styles.moreItem, styles.moreDisabled)}>
          {'<'}
        </span>

      }

      <Link className={styles.moreItem} to={nextLink}>
        {'>'}
      </Link>
    </div>
  )
}
