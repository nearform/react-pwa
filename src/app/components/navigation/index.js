const React = require('react');

module.exports = function Navigation() {
  return (
    <div className="navigation-component">
      <span>Hacker News</span>
      <nav>
        <a href="/new">new</a>
        <a href="/comments">comments</a>
        <a href="/show">show</a>
        <a href="/ask">ask</a>
        <a href="/jobs">jobs</a>
        <a href="/submit">submit</a>
      </nav>
    </div>
  );
}
