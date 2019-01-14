import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import FocusLock from 'react-focus-lock'
import { Transition } from 'react-transition-group'
import { media, stylesheet } from 'typestyle'
import { colors, ergonomics } from '../../styles/common'
import { Logo } from '../Logo'
import { NearFormLogo, HumburgerIcon, CloseIcon } from '../Glyphs'

const buttonReset = {
  border: 'none',
  background: 'none',
  padding: 0,
}

const navigationTransition = {
  entering: { visibility: 'visible', transform: 'translateX(0)' },
  entered: { visibility: 'visible', transform: 'translateX(0)' },
  exiting: { visibility: 'visible' },
}

export const styles = stylesheet({
  navigation: {
    zIndex: 2, // set stacking context for child side menu
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
    ...buttonReset,
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
    ...buttonReset,
    alignSelf: 'start',
    textAlign: 'left',
    gridColumnStart: '2',
    gridColumnEnd: '3',
    cursor: 'pointer',
  },
  navigationSide: {
    visibility: 'hidden',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: colors.NEARFORM_BRAND_ACCENT_1,
    background: `linear-gradient(
      142.5deg,
      ${colors.NEARFORM_BRAND_ACCENT_1} 0%,
      ${colors.NEARFORM_BRAND_ACCENT_1} 50%,
      ${colors.NEARFORM_BRAND_ACCENT_2} 50%,
      ${colors.NEARFORM_BRAND_ACCENT_2} 100%
    )`,
    transform: 'translateX(-100%)',
    transition: 'transform .3s cubic-bezier(.25, .8, .25, 1)',
    paddingTop: '1.35em',
  },
  navigationSideContentWrapper: {
    display: 'grid',
    gridTemplateColumns: 'auto 57px',
    height: '100%',
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
  hidden: {
    display: 'none',
  },
})

function checkRootRouteActive(match, location) {
  return location.pathname === '/' || location.pathname.split('/')[1] === 'page'
}

const Navigation = ({ navigationVisible, toggleNavigation }) => {
  return (
    <header className={styles.navigation} role="banner">
      <Link to="/" className={styles.navigationLogo}>
        <Logo />
      </Link>
      <a aria-label="NearForm Website" className={styles.nearFormLogo} href="https://www.nearform.com/blog">
        <NearFormLogo />
      </a>

      <button
        className={styles.navigationHamburger}
        onClick={toggleNavigation}
        aria-label="Menu"
        aria-describedby="nav-info"
        data-testid="navigationHamburger"
      >
        <HumburgerIcon />
        <span id="nav-info" className={styles.hidden}>
          Press this button to show navigation
        </span>
      </button>

      <Transition in={navigationVisible} timeout={300}>
        {state => (
          <nav
            className={styles.navigationSide}
            style={{ ...navigationTransition[state] }}
            role="dialog"
            data-testid="navigation"
          >
            <FocusLock disabled={!navigationVisible} returnFocus className={styles.navigationSideContentWrapper}>
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
                  <a href="https://www.nearform.com/blog">About NearForm</a>
                </li>
              </ul>
              <button
                className={styles.navigationClose}
                onClick={toggleNavigation}
                aria-label="Close"
                data-testid="navigationClose"
              >
                <CloseIcon />
              </button>
            </FocusLock>
          </nav>
        )}
      </Transition>

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
