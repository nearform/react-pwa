const React = require('react')
const { px } = require('csx')
const { style, media } = require('typestyle')
const { debugClassName } = require('../styles/common')

const Logo = require('../components/Logo')
const Link = require('../components/Link')
const { withRouter } = require('react-router')

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

const Navigation = (props) => {
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

module.exports = withRouter(Navigation)
