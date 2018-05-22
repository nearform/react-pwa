import { rem } from 'csx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'

const buildLink = pathname => {
  let pathParts = pathname.split('/')
  let currentPage = parseInt(pathname.split('page/')[1])
  let nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  if (!pathParts[1] || pathParts[1] === 'page') return `/page/${nextPage}`
  return `/${pathParts[1]}/page/${nextPage}`
}

export const moreLinkClassName = style(debugClassName('more-link'), {
  padding: rem(1),
  background: '#f9f9f9',
  textAlign: 'center',
  gridColumnStart: '1',
  gridColumnEnd: '4',
  gridRowStart: '2'
})

export function More({ location }) {
  let link = buildLink(location.pathname)

  return (
    <div className={moreLinkClassName}>
      <NavLink to={link}>Load more</NavLink>
    </div>
  )
}
