import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { media, classes, stylesheet } from 'typestyle'
import { colors, ergonomics } from '../styles/common'
import { NearFormLogo } from './NearFormLogo'
import { Logo } from './Logo'
import { More } from './More'

const styles = stylesheet({
  navigation: {
    padding: '1em 1em 0 1em',
    display: 'grid',
    gridTemplateColumns: `65px auto 48px`,
    background: colors.LIGHTEST_GRAY,
    position: 'sticky',
    top: 0,
    borderBottom: `6px solid ${colors.NEARFORM_BRAND_MAIN}`,
    alignItems: 'center',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING
      }, {
        gridTemplateColumns: '65px 170px auto'
      }
    )
  },
  navigationLogo: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    fontWeight: 300,
    fontSize: '1.33em',
    color: colors.NEARFORM_BRAND_MAIN
  },
  navigationNav: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    textAlign: 'right'
  },
  navigationHamburger: {
    gridColumnStart: '3',
    gridColumnEnd: '4',
    cursor: 'pointer',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING
      }, {
        display: 'none'
      }
    )
  },
  navigationClose: {
    gridColumnStart: '2',
    gridColumnEnd: '3',
    cursor: 'pointer'
  },
  navigationSide: {
    display: 'grid',
    gridTemplateColumns: 'auto 57px',
    height: '100%',
    width: '0',
    position: 'fixed',
    zIndex: '1',
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
    paddingTop: '1.35em'
  },
  navigationSideVisible: {
    width: '100%'
  },
  navigationItem: {
    fontSize: '1.25em',
    marginBottom: '2.5em',
    whiteSpace: 'nowrap',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING
      }, {
        padding: '.5em',
        fontSize: '1em',
        color: 'black'
      }
    ),
    a: {
      color: 'white'
    }
  },
  navigationMobile: {
    gridColumnStart: '1',
    gridColumnEnd: '2',
    gridRowStart: '1',
    listStyleType: 'none'
  },
  navigationDesktop: {
    textAlign: 'right',
    ...media(
      {
        minWidth: ergonomics.PALM.BEGINNING,
        maxWidth: ergonomics.PALM.END
      }, {
        display: 'none'
      }
    )
  },
  nearFormLogo: {
    width: '170px'
  }
})

function checkRootRouteActive(match, location) {
  return location.pathname === '/' || location.pathname.split('/')[1] === 'page'
}

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.toggleNavigation = this.toggleNavigation.bind(this)

    this.state = {
      navigationVisible: false
    }
  }

  toggleNavigation() {
    this.setState(() => {
      return {
        navigationVisible: !this.state.navigationVisible
      }
    })
  }

  render() {
    const { location } = this.props
    const { navigationVisible } = this.state

    return (
      <heading className={styles.navigation}>
        <Link to="/" className={styles.navigationLogo}>
          <Logo />
        </Link>
        <a aria-label="nearForm Website" className={styles.nearFormLogo} href="https://www.nearform.com/blog">
          <NearFormLogo />
        </a>
        <div className={styles.navigationHamburger} onClick={() => this.toggleNavigation()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <path fill={colors.NEARFORM_BRAND_MAIN} d="M6.559 10.398h38v5.043h-38zm0 12.641h38v5.121h-38zm0 12.723h38V40.8h-38zm0 0" />
          </svg>
        </div>
        <div className={navigationVisible ? classes(styles.navigationSide, styles.navigationSideVisible) : styles.navigationSide}>
          <div className={styles.navigationClose} onClick={() => this.toggleNavigation()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <path fill={colors.NEARFORM_BRAND_MAIN} d="M46.328 4.348L43.68 1.695 24 21.348 4.336 1.684 1.684 4.336 21.348 24 1.672 43.652l2.648 2.653L24 26.652l19.664 19.664 2.652-2.652L26.652 24zm0 0" />
            </svg>
          </div>
          <ul className={styles.navigationMobile}>
            <li className={styles.navigationItem}><NavLink isActive={checkRootRouteActive} onClick={() => this.toggleNavigation()} to="/">Top Stories</NavLink></li>
            <li className={styles.navigationItem}><NavLink onClick={() => this.toggleNavigation()} to="/newest">New Stories</NavLink></li>
            <li className={styles.navigationItem}><NavLink onClick={() => this.toggleNavigation()} to="/newcomments">Comments</NavLink></li>
            <li className={styles.navigationItem}><NavLink onClick={() => this.toggleNavigation()} to="/show">Show</NavLink></li>
            <li className={styles.navigationItem}><NavLink onClick={() => this.toggleNavigation()} to="/ask">Ask</NavLink></li>
            <li className={styles.navigationItem}><NavLink onClick={() => this.toggleNavigation()} to="/jobs">Jobs</NavLink></li>
            <li className={styles.navigationItem}><a href="https://www.nearform.com/blog">About nearForm</a></li>
          </ul>
        </div>
        <nav className={styles.navigationDesktop}>
          <NavLink isActive={checkRootRouteActive} className={styles.navigationItem} to="/">Top Stories</NavLink>
          <NavLink className={styles.navigationItem} to="/newest">New Stories</NavLink>
          <NavLink className={styles.navigationItem} to="/newcomments">Comments</NavLink>
          <NavLink className={styles.navigationItem} to="/show">Show</NavLink>
          <NavLink className={styles.navigationItem} to="/ask">Ask</NavLink>
          <NavLink className={styles.navigationItem} to="/jobs">Jobs</NavLink>
        </nav>
        <More location={location} />
      </heading>
    )
  }
}

export default Navigation
