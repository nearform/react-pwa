const util = require('util');
const path = require('path');
const express = require('express');
const { createServer } = require('http');
const ecstatic = require('ecstatic');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const appShellHandler = require('./app-shell-handler');

const app = express();

app.use((req, res, next) => {
  console.log(`req.url: ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '../../build')));

// TODO reuse routes.js paths? depends on the server framework being used
app.get('/', appShellHandler);
app.get('/newest', appShellHandler);
app.get('/newcomments', appShellHandler);
app.get('/show', appShellHandler);
app.get('/ask', appShellHandler);
app.get('/jobs', appShellHandler);
app.get('/app-shell', appShellHandler);

function init() {
  let server;
  return Promise.resolve(app)
    .then(app => {
      server = app.listen(3000, (err) => {
        if (err) throw err;
      })
    })
    .then(() => ({ app, server }))
}

module.exports = {
  init
};
