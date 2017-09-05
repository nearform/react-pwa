const path = require('path');
const express = require('express');
const { createServer } = require('http');
const ecstatic = require('ecstatic');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const App = require('../app');
const appShellHandler = require('./app-shell-handler');

const app = express();

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', appShellHandler);
app.get('/app-shell', appShellHandler);
app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('\n\n server started on port 3000');
});
