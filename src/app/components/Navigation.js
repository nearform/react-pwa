const React = require('react');

const Link = require('./Link');

module.exports = function Navigation() {
  return (
    <div className="navigation-component">
      <Link to="/">Hacker News</Link>
      <nav>
        <Link to="/newest">new</Link> |
        <Link to="/newcomments"> comments</Link> |
        <Link to="/show"> show</Link> |
        <Link to="/ask"> ask</Link> |
        <Link to="/jobs"> jobs</Link>
      </nav>
    </div>
  );
}
