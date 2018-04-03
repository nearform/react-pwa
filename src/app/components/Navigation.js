const React = require('react')
const Logo = require('./Logo')
const Link = require('./Link')

module.exports = function Navigation () {
  return (
    <div className='navigation-component'>
      <Link to='/' className='navigation-component-logo'>
        <Logo />
        <span className='navigation-component-logo-text'>Hacker News</span>
      </Link>
      <nav className='navigation-component-nav'>
        <Link to='/newest'>new</Link> |
        <Link to='/newcomments'> comments</Link> |
        <Link to='/show'> show</Link> |
        <Link to='/ask'> ask</Link> |
        <Link to='/jobs'> jobs</Link>
      </nav>
    </div>
  )
}
