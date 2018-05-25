import { px, rem } from 'csx'
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { media, style, classes } from 'typestyle'
import { debugClassName } from '../styles/common'
import { Logo } from './Logo'
import { More } from './More'

const navigationClassName = style(
  debugClassName('navigation'),
  {
    padding: '1em 1em 0 1em',
    display: 'grid',
    gridTemplateColumns: '65px auto 48px',
    background: '#f9f9f9',
    position: 'sticky',
    top: 0,
    borderBottom: '6px solid #ec1c2b',
    alignItems:'center'
  },
  media({minWidth:751}, {gridTemplateColumns: '65px 170px auto',})
)

const navigationLogoClassName = style(debugClassName('navigation-logo'), {
  gridColumnStart: '1',
  gridColumnEnd: '2',
  fontWeight: 300,
  fontSize: '1.33em',
  color: '#ec1c2b'
})

const navigationNavClassName = style(debugClassName('navigation-nav'), {
  gridColumnStart: '3',
  gridColumnEnd: '4',
  textAlign: 'right',
})

const navigationItemClassName = style(debugClassName('navigation-item'), {
  color: 'white',
  paddingRight: '1em'
})

const hamburger = style(debugClassName('hamburger'), {
  gridColumnStart: '3',
  gridColumnEnd: '4',
  backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8cG9seWdvbiBmaWxsPSIjZWMxYzJiIiBwb2ludHM9IjguMjAwMDEyMjA3MDMxMjUsMTMgNTUuNzAwMDEyMjA3MDMxMjUsMTMgNTUuNzAwMDEyMjA3MDMxMjUsMTkuMzAwMDAzMDUxNzU3ODEyIDguMjAwMDEyMjA3MDMxMjUsMTkuMzAwMDAzMDUxNzU3ODEyICIgaWQ9IkZpbGwtMTkiIGNsYXNzPSJzdDAiLz4gIDxwb2x5Z29uIGZpbGw9IiNlYzFjMmIiIHBvaW50cz0iOC4yMDAwMTIyMDcwMzEyNSwyOC44MDAwMDMwNTE3NTc4MTIgNTUuNzAwMDEyMjA3MDMxMjUsMjguODAwMDAzMDUxNzU3ODEyIDU1LjcwMDAxMjIwNzAzMTI1LDM1LjE5OTk5Njk0ODI0MjE5IDguMjAwMDEyMjA3MDMxMjUsMzUuMTk5OTk2OTQ4MjQyMTkgIiBpZD0iRmlsbC0yMCIgY2xhc3M9InN0MCIvPiAgPHBvbHlnb24gZmlsbD0iI2VjMWMyYiIgcG9pbnRzPSI4LjIwMDAxMjIwNzAzMTI1LDQ0LjY5OTk5Njk0ODI0MjE5IDU1LjcwMDAxMjIwNzAzMTI1LDQ0LjY5OTk5Njk0ODI0MjE5IDU1LjcwMDAxMjIwNzAzMTI1LDUxIDguMjAwMDEyMjA3MDMxMjUsNTEgIiBpZD0iRmlsbC0yMSIgY2xhc3M9InN0MCIvPiA8L2c+PC9zdmc+)',
  backgroundSize: rem(3),
  display: 'inline-block',
  height: rem(3),
  width: rem(3),
  cursor: 'pointer',
}, media({minWidth:751}, {display: 'none'}))

const closeNav = style(debugClassName('close-nav'), {
  gridColumnStart: '3',
  gridColumnEnd: '4',
  backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGc+ICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+ICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDAyIiB3aWR0aD0iNTgyIiB5PSItMSIgeD0iLTEiLz4gPC9nPiA8Zz4gIDx0aXRsZT5MYXllciAxPC90aXRsZT4gIDxwb2x5Z29uIGlkPSJzdmdfMiIgcG9pbnRzPSIxMjMuNTQyOTY4OCwxMS41OTM3NSAxMTYuNDc2NTYyNSw0LjUxODU1NDcgNjQuMDAxOTUzMSw1Ni45MzA2NjQxIDExLjU1OTU3MDMsNC40ODgyODEzICAgICA0LjQ4ODI4MTMsMTEuNTU5NTcwMyA1Ni45MjcyNDYxLDYzLjk5NzA3MDMgNC40NTcwMzEzLDExNi40MDUyNzM0IDExLjUyNDQxNDEsMTIzLjQ4MTQ0NTMgNjMuOTk4NTM1Miw3MS4wNjgzNTk0ICAgICAxMTYuNDQyMzgyOCwxMjMuNTExNzE4OCAxMjMuNTEyNjk1MywxMTYuNDQxNDA2MyA3MS4wNzMyNDIyLDY0LjAwMTk1MzEgICAiIGZpbGw9IiNlYzFjMmIiLz4gPC9nPjwvc3ZnPg==)',
  backgroundSize: rem(2.5),
  display: 'inline-block',
  height: rem(2.5),
  width: rem(2.5),
  cursor: 'pointer',
  gridColumnStart: '2',
  gridColumnEnd: '3',
})

const sidenav = style({
  display: 'grid',
  gridTemplateColumns: 'auto 57px',
  height: '100%',
  width: '0',
  position: 'fixed',
  zIndex: '1',
  top: '0',
  left: '0',
  backgroundColor: '#3a404c',
  background: 'linear-gradient(142.5deg, #3a404c 0%, #3a404c 50%, #424853 50%, #424853 100% )',
  overflowX: 'hidden',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  paddingTop: '1.35em'
})

const sidenavVisible = style({
  width: '100%'
})

const more = style(debugClassName('hamburger'), {

})

const navItem = style({
  color: 'white',
  fontSize: '1.25em',
  marginBottom: '2.5em',
  whiteSpace: 'nowrap',
  $nest: {
    a: {color: 'white'}
  }
}, media({minWidth:751}, {
  padding: '.5em',
  fontSize: '1em',
  color: 'black'
}))

const navMobile = style({
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '1',
  listStyleType: 'none'
})

const navDesktop = style({
  textAlign: 'right'
},
  media({minWidth:0,maxWidth:750}, {display: 'none'})
)

const nFLogo = style({
  width: '170px'
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
      <div className={navigationClassName}>
        <Link to="/" className={navigationLogoClassName}>
          <Logo />
        </Link>
        <a className={nFLogo} href="https://www.nearform.com">
          <svg width="170" height="52" xmlns="http://www.w3.org/2000/svg"><g fillRule="nonzero" fill="none"><path d="M45.666 8.54a7.226 7.226 0 0 1-4.095 5.166 2.708 2.708 0 0 0-1.27 2.209v19.358a2.727 2.727 0 0 0 1.535 2.353 7.19 7.19 0 0 1 3.918 5.644 25.73 25.73 0 0 0-.088-34.73zM10.188 37.55h-.019a2.45 2.45 0 0 0 1.47-2.277v-8.806a2.366 2.366 0 0 0-1.243-2.278l-.18-.09-.043-.02c-3.136-1.624-4.616-5.26-3.49-8.58 1.125-3.32 4.521-5.34 8.014-4.767 3.492.574 6.046 3.572 6.025 7.073a7.578 7.578 0 0 1-.506 2.657 2.753 2.753 0 0 0 .625 2.467l12.963 13.023c1.355 1.359 2.832.835 2.832-.69V15.903a2.577 2.577 0 0 0-1.197-2.24c-.061-.03-.073-.06-.134-.09a.112.112 0 0 0-.042 0 7.235 7.235 0 0 1-3.869-6.362 7.122 7.122 0 0 1 3.143-5.88C23.34-2.354 11.031 1.81 4.461 11.507a25.725 25.725 0 0 0 1.92 31.384 7.37 7.37 0 0 1 3.807-5.34z" fill="#ED1828"/><path d="M38.616 10.723c1.953 0 3.536-1.565 3.539-3.496.002-1.931-1.578-3.5-3.53-3.503-1.953-.005-3.54 1.556-3.547 3.488-.002.93.37 1.822 1.034 2.48a3.562 3.562 0 0 0 2.504 1.03z" fill="#ED1828"/><path d="M35.078 43.96c0 1.934 1.584 3.5 3.538 3.5 1.955 0 3.539-1.566 3.539-3.5 0-1.932-1.584-3.499-3.539-3.499-1.953.002-3.536 1.568-3.538 3.5z" fill="#797A7C"/><path d="M31.402 43.92c0-.865.16-1.722.472-2.529a2.636 2.636 0 0 0-.625-2.831L18.228 25.43c-1.209-1.168-2.913-.99-2.913 1.025v8.806c.014.994.58 1.899 1.474 2.354a7.11 7.11 0 0 1 3.931 6.248 7.105 7.105 0 0 1-3.762 6.35 26.59 26.59 0 0 0 18.362.064 7.165 7.165 0 0 1-3.918-6.358z" fill="#ED1828"/><path d="M13.523 40.461c-1.954 0-3.538 1.567-3.538 3.5s1.584 3.5 3.538 3.5c1.954 0 3.538-1.567 3.538-3.5-.002-1.932-1.585-3.498-3.538-3.5z" fill="#ED1828"/><path d="M17.061 17.775c0-1.933-1.584-3.5-3.538-3.5-1.954 0-3.538 1.567-3.538 3.5s1.584 3.5 3.538 3.5c1.953-.003 3.536-1.568 3.538-3.5zM67.09 33.022v-8.35c0-3.45-1.257-5.174-3.772-5.174a4.396 4.396 0 0 0-3.453 1.518 5.475 5.475 0 0 0-1.347 3.766v8.24h-1.305V18.663h1.305v2.592h.057a5.26 5.26 0 0 1 4.962-2.96c1.568 0 2.768.516 3.6 1.549.831 1.032 1.25 2.515 1.254 4.448v8.73h-1.3zM73.073 25.901c0 1.974.46 3.516 1.382 4.627a4.662 4.662 0 0 0 3.791 1.67c1.625 0 3.212-.593 4.762-1.78v1.374a8.553 8.553 0 0 1-5.034 1.583 5.719 5.719 0 0 1-4.536-1.993c-1.154-1.328-1.731-3.203-1.731-5.625a7.953 7.953 0 0 1 1.807-5.295 5.848 5.848 0 0 1 4.701-2.152c1.807 0 3.192.633 4.156 1.898.965 1.265 1.447 2.976 1.447 5.132v.576l-10.745-.015zm9.387-1.176c-.057-1.655-.458-2.94-1.205-3.857a3.77 3.77 0 0 0-3.09-1.374 4.562 4.562 0 0 0-3.38 1.355c-.893.904-1.443 2.197-1.65 3.88l9.325-.004zM96.098 33.022v-2.87h-.058a5.638 5.638 0 0 1-2.022 2.346 5.221 5.221 0 0 1-2.943.877 4.547 4.547 0 0 1-3.277-1.139 3.843 3.843 0 0 1-1.205-2.903c0-2.506 1.678-4.024 5.034-4.555l4.467-.66c0-3.085-1.172-4.627-3.515-4.627-1.596 0-3.152.632-4.666 1.897v-1.556a7.15 7.15 0 0 1 2.19-1.082 8.453 8.453 0 0 1 2.603-.448c1.494 0 2.645.458 3.453 1.374.809.917 1.218 2.249 1.228 3.997v9.349h-1.289zm-3.999-7.147c-1.522.215-2.59.563-3.204 1.044-.614.48-.921 1.263-.921 2.349-.025.79.287 1.552.86 2.103a3.3 3.3 0 0 0 2.39.827 4.505 4.505 0 0 0 3.489-1.518 5.677 5.677 0 0 0 1.389-3.963v-1.404l-4.003.562zM108.6 20.01a2.576 2.576 0 0 0-1.535-.463c-1.143 0-2.102.585-2.878 1.754-.775 1.17-1.159 2.829-1.15 4.98v6.74h-1.267V18.664h1.278v3.185h.057c.263-.984.81-1.87 1.574-2.551a3.747 3.747 0 0 1 2.494-.911c.494-.008.985.079 1.447.254l-.02 1.37z" fill="#797A7C"/><path fill="#ED1828" d="M113.044 14.192v8.202h7.514v1.264h-7.514v9.364h-1.404V12.905h9.497v1.275zM130.681 33.375c-2.118 0-3.794-.69-5.027-2.069s-1.85-3.172-1.85-5.378c0-2.384.64-4.249 1.92-5.595 1.278-1.346 2.977-2.02 5.095-2.02 2.07 0 3.705.669 4.905 2.005 1.2 1.336 1.8 3.187 1.8 5.553 0 2.234-.613 4.044-1.839 5.428-1.225 1.384-2.893 2.076-5.004 2.076zm.1-13.884a5.204 5.204 0 0 0-4.09 1.711c-1.024 1.142-1.536 2.727-1.536 4.756 0 1.88.497 3.39 1.49 4.528.992 1.14 2.35 1.71 4.07 1.712 1.748 0 3.095-.56 4.042-1.681.946-1.121 1.42-2.677 1.42-4.669 0-2.047-.471-3.617-1.413-4.71-.941-1.093-2.269-1.642-3.983-1.647zM147.992 20.01a2.576 2.576 0 0 0-1.535-.463c-1.143 0-2.103.585-2.878 1.754-.775 1.17-1.159 2.829-1.151 4.98v6.74h-1.278V18.664h1.278v3.185h.057c.263-.984.81-1.87 1.574-2.551a3.75 3.75 0 0 1 2.494-.911c.494-.008.985.079 1.447.254l-.008 1.37zM168.653 33.022v-8.635c0-1.804-.285-3.07-.856-3.796-.57-.726-1.476-1.09-2.717-1.093a3.787 3.787 0 0 0-2.962 1.458 5.431 5.431 0 0 0-1.247 3.659v8.407h-1.305v-8.73c0-3.198-1.23-4.798-3.688-4.798a3.632 3.632 0 0 0-2.95 1.465 5.869 5.869 0 0 0-1.179 3.796v8.267h-1.32V18.663h1.305v2.384h.057c1.024-1.822 2.504-2.734 4.44-2.737a4.201 4.201 0 0 1 2.713.903 4.44 4.44 0 0 1 1.535 2.376 5.503 5.503 0 0 1 1.95-2.417 4.806 4.806 0 0 1 2.759-.862c3.177 0 4.766 1.945 4.766 5.834v8.878h-1.301z"/></g></svg>
        </a>
        <div className={hamburger} onClick={() => this.toggleNavigation()}></div>
        <div className={navigationVisible ? classes(sidenav, sidenavVisible) : sidenav}>
          <div className={closeNav} onClick={() => this.toggleNavigation()}></div>
          <ul className={navMobile}>
            <li className={navItem}><NavLink isActive={checkRootRouteActive} onClick={() => this.toggleNavigation()} to="/">Top Stories</NavLink></li>
            <li className={navItem}><NavLink onClick={() => this.toggleNavigation()} to="/newest">New Stories</NavLink></li>
            <li className={navItem}><NavLink onClick={() => this.toggleNavigation()} to="/newcomments">Comments</NavLink></li>
            <li className={navItem}><NavLink onClick={() => this.toggleNavigation()} to="/show">Show</NavLink></li>
            <li className={navItem}><NavLink onClick={() => this.toggleNavigation()} to="/ask">Ask</NavLink></li>
            <li className={navItem}><NavLink onClick={() => this.toggleNavigation()} to="/jobs">Jobs</NavLink></li>
            <li className={navItem}><a href="https://www.nearform.com/about">About nearForm</a></li>
          </ul>
        </div>
        <nav className={navDesktop}>
          <NavLink isActive={checkRootRouteActive} className={navItem} to="/">Top Stories</NavLink>
          <NavLink className={navItem} to="/newest">New Stories</NavLink>
          <NavLink className={navItem} to="/newcomments">Comments</NavLink>
          <NavLink className={navItem} to="/show">Show</NavLink>
          <NavLink className={navItem} to="/ask">Ask</NavLink>
          <NavLink className={navItem} to="/jobs">Jobs</NavLink>
        </nav>
        <More className={more} location={location} />
      </div>
    )
  }
}

export default Navigation
