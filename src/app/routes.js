const { fetchStories } = require('./helpers/stories')

module.exports = [
  {
    path: '/app-shell',
    exact: true,
    component: require('./pages/LoadingPage'),
    fetcher: () => Promise.resolve({ data: {} })
  },
  {
    path: '/',
    exact: true,
    component: require('./pages/HomePage'),
    fetcher: () => fetchStories({ filter: 'top' })
  },
  {
    path: '/newest',
    exact: true,
    component: require('./pages/NewestPage'),
    fetcher: () => fetchStories({ filter: 'new' })
  },
  {
    path: '/newcomments',
    exact: true,
    component: require('./pages/CommentsPage'),
    fetcher: () => fetchStories({ filter: 'comments' })
  },
  {
    path: '/show',
    exact: true,
    component: require('./pages/ShowPage'),
    fetcher: () => fetchStories({ filter: 'show' })
  },
  {
    path: '/ask',
    exact: true,
    component: require('./pages/AskPage'),
    fetcher: () => fetchStories({ filter: 'ask' })
  },
  {
    path: '/jobs',
    exact: true,
    component: require('./pages/JobsPage'),
    fetcher: () => fetchStories({ filter: 'jobs' })
  }
]
