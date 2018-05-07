import { px } from 'csx'
import React from 'react'
import { withRouter } from 'react-router'
import { style } from 'typestyle'
import { Link } from '../components/Link'
import { debugClassName } from '../styles/common'

const buildLink = pathname => {
  let pathParts = pathname.split('/')
  let currentPage = parseInt(pathname.split('page/')[1])
  let nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  if (!pathParts[1] || pathParts[1] === 'page') return `/page/${nextPage}`
  return `/${pathParts[1]}/page/${nextPage}`
}

const moreLinkClassName = style(
  debugClassName('more-link'),
  {
    marginBottom: px(6),
    padding: `0 0 0 ${px(30)}`
  }
)

export function MoreComponent (props) {
  let link = buildLink(props.location.pathname)
  return (
    <p className={moreLinkClassName}>
      <Link to={link}>More</Link>
    </p>
  )
}

export const More = withRouter(MoreComponent)
