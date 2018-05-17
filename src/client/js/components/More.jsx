import { px } from 'csx'
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

const moreLinkClassName = style(debugClassName('more-link'), {
  marginBottom: px(6),
  padding: `0 0 0 ${px(30)}`
})

export function More({ location }) {
  let link = buildLink(location.pathname)

  return (
    <p className={moreLinkClassName}>
      <NavLink to={link}>Load more</NavLink>
    </p>
  )
}
