import React, { useState, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { media, classes, stylesheet } from 'typestyle'
import { colors, ergonomics } from '../../styles/common'
import { Logo } from '../Logo'
import { NearFormLogo, HumburgerIcon, CloseIcon } from '../Glyphs'

export const styles = stylesheet({
  navigation: {
    zIndex: 1, // set stacking context for child side menu
    padding: '1em 1em 0 1em',
    display: 'grid',
    gridTemplateColumns: `65px auto 48px`,
    background: colors.LIGHTEST_GRAY,
    position: 'sticky',
    top: 0,
    alignItems: 'center',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
      },
      {
        gridTemplateColumns: '65px 170px auto',
      }
    ),
  },
  navigationLogo: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    fontWeight: 300,
    fontSize: '1.33em',
    color: colors.NEARFORM_BRAND_MAIN,
  },
  navigationNav: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    textAlign: 'right',
  },
  navigationHamburger: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    cursor: 'pointer',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
      },
      {
        display: 'none',
      }
    ),
  },
  navigationClose: {
    gridColumnStart: '2',
    gridColumnEnd: '3',
    cursor: 'pointer',
  },
  navigationSide: {
    display: 'grid',
    gridTemplateColumns: 'auto 57px',
    height: '100%',
    width: '0',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: colors.NEARFORM_BRAND_ACCENT_1,
    background: `linear-gradient(
      142.5deg,
      ${colors.NEARFORM_BRAND_ACCENT_1} 0%,
      ${colors.NEARFORM_BRAND_ACCENT_1} 50%,
      ${colors.NEARFORM_BRAND_ACCENT_2} 50%,
      ${colors.NEARFORM_BRAND_ACCENT_2} 100%
    )`,
    overflowX: 'hidden',
    transition: 'all .3s cubic-bezier(.25, .8, .25, 1)',
    paddingTop: '1.35em',
  },
  navigationSideVisible: {
    width: '100%',
  },
  navigationItem: {
    fontSize: '1.25em',
    marginBottom: '2.5em',
    whiteSpace: 'nowrap',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
      },
      {
        padding: '.5em',
        fontSize: '1em',
        color: 'black',
      }
    ),
    a: {
      color: 'white',
    },
  },
  navigationMobile: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '1',
    listStyleType: 'none',
  },
  navigationDesktop: {
    textAlign: 'right',
    ...media(
      {
        minWidth: ergonomics.PALM.BEGINNING,
        maxWidth: ergonomics.PALM.END,
      },
      {
        display: 'none',
      }
    ),
  },
  nearFormLogo: {
    width: '170px',
  },
})

function checkRootRouteActive(match, location) {
  return location.pathname === '/' || location.pathname.split('/')[1] === 'page'
}

const Navigation = () => {
  const [navigationVisible, setNavigationVisible] = useState(false)
  const toggleNavigation = useCallback(() => setNavigationVisible(oldNavigationVisible => !oldNavigationVisible), [])

  return (
    <header className={styles.navigation}>
      <Link to="/" className={styles.navigationLogo}>
        <Logo />
      </Link>
      <a aria-label="nearForm Website" className={styles.nearFormLogo} href="https://www.nearform.com/blog">
        <NearFormLogo />
      </a>
      <div className={styles.navigationHamburger} onClick={toggleNavigation} data-testid="navigationHamburger">
        <HumburgerIcon />
      </div>
      <div
        className={
          navigationVisible ? classes(styles.navigationSide, styles.navigationSideVisible) : styles.navigationSide
        }
        data-testid="navigation"
      >
        <div className={styles.navigationClose} onClick={toggleNavigation} data-testid="navigationClose">
          <CloseIcon />
        </div>
        <ul className={styles.navigationMobile}>
          <li className={styles.navigationItem} data-testid="mobileTopStoriesLink">
            <NavLink onClick={toggleNavigation} to="/" isActive={checkRootRouteActive}>
              Top Stories
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink onClick={toggleNavigation} to="/newest">
              New Stories
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink onClick={toggleNavigation} to="/newcomments">
              Comments
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink onClick={toggleNavigation} to="/show">
              Show
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink onClick={toggleNavigation} to="/ask">
              Ask
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <NavLink onClick={toggleNavigation} to="/jobs">
              Jobs
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <a href="https://www.nearform.com/blog">About nearForm</a>
          </li>
        </ul>
      </div>
      <nav className={styles.navigationDesktop}>
        <NavLink className={styles.navigationItem} to="/" isActive={checkRootRouteActive}>
          Top Stories
        </NavLink>
        <NavLink className={styles.navigationItem} to="/newest">
          New Stories
        </NavLink>
        <NavLink className={styles.navigationItem} to="/newcomments">
          Comments
        </NavLink>
        <NavLink className={styles.navigationItem} to="/show">
          Show
        </NavLink>
        <NavLink className={styles.navigationItem} to="/ask">
          Ask
        </NavLink>
        <NavLink className={styles.navigationItem} to="/jobs">
          Jobs
        </NavLink>
      </nav>
    </header>
  )
}

export default Navigation
