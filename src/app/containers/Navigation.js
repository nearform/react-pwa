import { px } from 'csx'
import React from 'react'
import { withRouter } from 'react-router'
import { media, style } from 'typestyle'
import { Link } from '../components/Link'
import { Logo } from '../components/Logo'
import { debugClassName } from '../styles/common'

const navigationClassName = style(
  debugClassName('navigation'),
  {
    alignItems: 'center',
    backgroundColor: '#fe6501',
    display: 'flex',
    padding: px(2),
    $nest: {
      a: {
        color: '#000'
      }
    }
  }
)

const navigationLogoClassName = style(
  debugClassName('navigation-logo'),
  {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0
  }
)

const navigationTextClassName = style(
  debugClassName('navigation-text'),
  {
    fontWeight: 700,
    padding: `${px(2)} ${px(4)}`
  }
)

const navigationNavClassName = style(
  debugClassName('navigation-nav'),
  {
    color: '#000',
    fontSize: '9pt',
    marginLeft: px(8)
  },
  media({minWidth: px(500)}, {fontSize: '10pt'})
)

const navigationActiveClassName = style(
  debugClassName('navigation-active'),
  {
    color: '#fff'
  }
)

const isActive = (slug, {location}) => location.pathname.match(slug) ? navigationActiveClassName : null

const NavigationComponent = (props) => {
  return (
    <div className={navigationClassName}>
      <Link to='/' className={navigationLogoClassName}>
        <Logo />
        <span className={navigationTextClassName}>Hacker News</span>
      </Link>
      <nav className={navigationNavClassName}>
        <Link to='/newest' className={isActive('newest', props)}>new</Link> |
        <Link to='/newcomments' className={isActive('comments', props)}> comments</Link> |
        <Link to='/show' className={isActive('show', props)}> show</Link> |
        <Link to='/ask' className={isActive('ask', props)}> ask</Link> |
        <Link to='/jobs' className={isActive('jobs', props)}> jobs</Link>
      </nav>
    </div>
  )
}

export const Navigation = withRouter(NavigationComponent)
