const React = require('react')
const Logo = require('../components/Logo')
const Link = require('../components/Link')
const { withRouter } = require('react-router')

const isActive = (slug, { location }) => {
  if (location.pathname.match(slug)) {
    return 'is-active'
  }
}

const Navigation = (props) => {
  return (
    <div className='navigation-component'>
      <Link to='/' className='navigation-component__logo'>
        <Logo />
        <span className='navigation-component__text'>Hacker News</span>
      </Link>
      <nav className='navigation-component__nav'>
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
