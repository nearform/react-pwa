module.exports = [
  {
    path: '/',
    exact: true,
    component: require('./pages/HomePage')
  },
  {
    path: '/newest',
    exact: true,
    component: require('./pages/NewestPage')
  },
  {
    path: '/newcomments',
    exact: true,
    component: require('./pages/CommentsPage')
  },
  {
    path: '/show',
    exact: true,
    component: require('./pages/ShowPage')
  },
  {
    path: '/ask',
    exact: true,
    component: require('./pages/AskPage')
  },
  {
    path: '/jobs',
    exact: true,
    component: require('./pages/JobsPage')
  }
]
