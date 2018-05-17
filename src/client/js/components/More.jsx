import { px, rem } from 'csx'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { media, style } from 'typestyle'
import { debugClassName } from '../styles/common'

const buildLink = pathname => {
  let pathParts = pathname.split('/')
  let currentPage = parseInt(pathname.split('page/')[1])
  let nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  if (!pathParts[1] || pathParts[1] === 'page') return `/page/${nextPage}`
  return `/${pathParts[1]}/page/${nextPage}`
}

export const moreLinkClassName = style(
  debugClassName('more-link'),
  {
    marginBottom: rem(1),
    padding: `0 0 0 ${rem(4.5)}`
  },
  media({ maxWidth: px(600) }, { paddingLeft: rem(3.5) })
)

export function More({ location }) {
  let link = buildLink(location.pathname)

  return (
    <p className={moreLinkClassName}>
      <NavLink to={link}>Load more</NavLink>
    </p>
  )
}
