import { px, rem } from 'csx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { media, style } from 'typestyle'
import { debugClassName } from '../styles/common'
import { Logo } from './Logo'
import { More } from './More'

const navigationClassName = style(
  debugClassName('navigation'),
  {
    padding: '1em 1em 0 1em',
    display: 'grid',
    gridTemplateColumns: '15% auto 15%',
    background: '#f9f9f9',
    position: 'sticky',
    top: 0,
    borderBottom: '6px solid #ec1c2b',
  }
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
})

const more = style(debugClassName('hamburger'), {

})

export function Navigation({ location }) {
  return (
    <div className={navigationClassName}>
      <Link to="/" className={navigationLogoClassName}>
        <Logo />
      </Link>

      <div className={hamburger}></div>
      <More className={more} location={location} />
    </div>
  )
}
