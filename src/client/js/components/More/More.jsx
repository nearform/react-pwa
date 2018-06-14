import React from 'react'
import { Link } from 'react-router-dom'
import { stylesheet, classes } from 'typestyle'
import { colors } from '../../styles/common'

const PAGE_SIZE = 30 // TODO: this should be shared config and either passed in request or shared with server

const buildLinks = (pathname, currentCount) => {
  const pathParts = pathname.split('/')
  const currentPage = parseInt(pathname.split('page/')[1]) || 1
  const nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  const prevPage = Number.isInteger(currentPage) && currentPage > 2 ? currentPage - 1 : null

  if (!pathParts[1] || pathParts[1] === 'page') {
    return {
      currentPage,
      prevLinkEnabled: currentPage >= 2,
      nextLinkEnabled: !(currentCount < PAGE_SIZE),
      prevLink: Number.isInteger(currentPage) && currentPage > 2 ? `/page/${prevPage}` : '/',
      nextLink: `/page/${nextPage}`
    }
  }

  return {
    currentPage,
    prevLinkEnabled: currentPage >= 2,
    nextLinkEnabled: !(currentCount < PAGE_SIZE),
    prevLink: Number.isInteger(currentPage) && currentPage > 2 ? `/${pathParts[1]}/page/${prevPage}` : `/${pathParts[1]}`,
    nextLink: `/${pathParts[1]}/page/${nextPage}`
  }
}

const styles = stylesheet({
  more: {
    background: colors.LIGHTEST_GRAY,
    textAlign: 'right',
    gridColumnStart: '1',
    gridColumnEnd: '4',
    gridRowStart: '2',
    padding: '1em',
    borderBottom: `6px solid ${colors.NEARFORM_BRAND_MAIN}`,
    position: 'sticky',
    top: '70px' // Height of the header TODO: should be shared constant
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

export function More({ location, data }) {
  const currentCount = data ? data.length : 0
  const {nextLink, prevLink, nextLinkEnabled, prevLinkEnabled, currentPage} = buildLinks(location.pathname, currentCount)

  const rangeStart = currentPage ? 30 * (currentPage - 1) + 1 : 1
  const rangeEnd = rangeStart + 29

  return (
    <div className={styles.more}>
      <span>{`${rangeStart} - ${rangeEnd}`}</span>

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

      {nextLinkEnabled &&
        <Link className={styles.moreItem} to={nextLink}>
          {'>'}
        </Link>
      }

      {!nextLinkEnabled &&
        <span className={classes(styles.moreItem, styles.moreDisabled)}>
          {'>'}
        </span>
      }
    </div>
  )
}
