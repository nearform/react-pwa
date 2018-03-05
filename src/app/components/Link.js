const React = require('react');
const { Link: RRLink } = require('react-router-dom');

module.exports = function Link(props) {
  return <RRLink {...props} />;
};
