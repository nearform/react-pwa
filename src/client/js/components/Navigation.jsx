import { rem } from 'csx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'
import { Logo } from './Logo'

const navigationClassName = style(debugClassName('navigation'), {
  alignItems: 'center',
  backgroundColor: '#fe6501',
  display: 'flex',
  padding: rem(0.5),
  $nest: {
    a: {
      color: '#000'
    },
    'a.active': {
      fontWeight: 'bold'
    },
    'a:hover': {
      color: '#FFF',
      transition: 'color .1s ease-out'
    }
  }
})

const navigationLogoClassName = style(debugClassName('navigation-logo'), {
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0
})

const navigationTextClassName = style(debugClassName('navigation-text'), {
  fontWeight: 700,
  padding: `0 ${rem(0.5)}`
})

const navigationNavClassName = style(debugClassName('navigation-nav'), {
  color: '#000',
  marginLeft: rem(1),
  $nest: {
    a: {
      margin: `0 ${rem(0.2)}`
    }
  }
})

export function Navigation({ location }) {
  return (
    <div className={navigationClassName}>
      <Link to="/" className={navigationLogoClassName}>
        <Logo />
        <span className={navigationTextClassName}>Hacker News</span>
      </Link>

      <nav className={navigationNavClassName}>
        <NavLink to="/newest">new</NavLink>
        |
        <NavLink to="/newcomments">comments</NavLink>
        |
        <NavLink to="/show">show</NavLink>
        |
        <NavLink to="/ask">ask</NavLink>
        |
        <NavLink to="/jobs">jobs</NavLink>
      </nav>
    </div>
  )
}
