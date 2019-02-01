import React from 'react'
import { Link } from 'react-router-dom'
import { stylesheet, classes } from 'typestyle'
import { colors } from '../../styles/common'
import { buildLinks } from '../../utils/page'

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
    zIndex: 1,
    top: '70px', // Height of the header TODO: should be shared constant
  },
  moreItem: {
    background: colors.NEARFORM_BRAND_ACCENT_2,
    marginLeft: '1em',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '800',
    padding: '10px 12px',
    borderRadius: '10px',
    boxShadow: '2px 2px 8px 0px rgba( 0, 0, 0, 0.2 )',
  },
  moreDisabled: {
    background: colors.GRAY,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
})

export function More({ location, data }) {
  const currentCount = data ? data.length : 0
  const { nextLink, prevLink, nextLinkEnabled, prevLinkEnabled, currentPage } = buildLinks(
    location.pathname,
    currentCount
  )

  const rangeStart = currentPage ? 30 * (currentPage - 1) + 1 : 1
  const rangeEnd = rangeStart + 29

  return (
    <div className={styles.more}>
      <span>{`${rangeStart} - ${rangeEnd}`}</span>

      <Link
        className={classes(styles.moreItem, !prevLinkEnabled && styles.moreDisabled)}
        role="button"
        aria-label="Load previous posts"
        disabled={!prevLinkEnabled}
        to={prevLink}
      >
        {'<'}
      </Link>

      <Link
        className={classes(styles.moreItem, !nextLinkEnabled && styles.moreDisabled)}
        role="button"
        aria-label="Load next posts"
        disabled={!nextLinkEnabled}
        to={nextLink}
      >
        {'>'}
      </Link>
    </div>
  )
}
