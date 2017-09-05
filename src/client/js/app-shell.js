const React = require('react');
const { render } = require('react-dom');

const App = require('../../app');
const container = document.getElementById('app-root');

render(<App />, container);
