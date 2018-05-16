import React from 'react'
import Link from '../components/Link'
import { withRouter } from 'react-router'

const buildLink = pathname => {
  let pathParts = pathname.split('/')
  let currentPage = parseInt(pathname.split('page/')[1])
  let nextPage = Number.isInteger(currentPage) ? currentPage + 1 : 2
  if (!pathParts[1] || pathParts[1] === 'page') return `/page/${nextPage}`
  return `/${pathParts[1]}/page/${nextPage}`
}

const More = props => {
  let link = buildLink(props.location.pathname)
  return (
    <p className='more-link'>
      <Link to={link}>More</Link>
    </p>
  )
}

export default withRouter(More)
