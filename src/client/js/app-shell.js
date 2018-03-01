const React = require('react');
const { render } = require('react-dom');

const AppShell = require('../../app/AppShell');
const container = document.getElementById('app-root');

render(<AppShell />, container);
