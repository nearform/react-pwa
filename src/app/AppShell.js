const React = require('react');
const { ConnectedRouter } = require('react-router-redux');
const { Provider: ReduxProvider } = require('react-redux');


function AppShell({ store, history }) {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <span>hello world</span>
      </ConnectedRouter>
    </ReduxProvider>
  );
}

module.exports = AppShell;
