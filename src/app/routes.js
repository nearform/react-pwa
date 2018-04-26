const { fetchStories } = require('./helpers/stories')

module.exports = [
  {
    path: '/app-shell',
    exact: true,
    component: require('./pages/LoadingPage'),
    fetcher: async () => ({ data: {} })
  },
  {
    path: '/',
    exact: true,
    component: require('./pages/HomePage'),
    fetcher: () => fetchStories({ filter: 'top' })
  },
  {
    path: '/page/:page',
    exact: true,
    component: require('./pages/HomePage'),
    fetcher: ({match}) => fetchStories({ filter: 'top', page: match.params.page })
  },
  {
    path: '/newest',
    exact: true,
    component: require('./pages/NewestPage'),
    fetcher: () => fetchStories({ filter: 'new' })
  },
  {
    path: '/newest/page/:page?',
    exact: true,
    component: require('./pages/NewestPage'),
    fetcher: ({match}) => fetchStories({ filter: 'new', page: match.params.page })
  },
  {
    path: '/newcomments',
    exact: true,
    component: require('./pages/CommentsPage'),
    fetcher: () => fetchStories({ filter: 'comments' })
  },
  {
    path: '/newcomments/page/:page?',
    exact: true,
    component: require('./pages/CommentsPage'),
    fetcher: ({match}) => fetchStories({ filter: 'comments', page: match.params.page })
  },
  {
    path: '/show',
    exact: true,
    component: require('./pages/ShowPage'),
    fetcher: () => fetchStories({ filter: 'show' })
  },
  {
    path: '/show/page/:page?',
    exact: true,
    component: require('./pages/ShowPage'),
    fetcher: ({match}) => fetchStories({ filter: 'show', page: match.params.page })
  },
  {
    path: '/ask',
    exact: true,
    component: require('./pages/AskPage'),
    fetcher: () => fetchStories({ filter: 'ask' })
  },
  {
    path: '/ask/page/:page?',
    exact: true,
    component: require('./pages/AskPage'),
    fetcher: ({match}) => fetchStories({ filter: 'ask', page: match.params.page })
  },
  {
    path: '/jobs',
    exact: true,
    component: require('./pages/JobsPage'),
    fetcher: () => fetchStories({ filter: 'jobs' })
  },
  {
    path: '/jobs/page/:page?',
    exact: true,
    component: require('./pages/JobsPage'),
    fetcher: ({match}) => fetchStories({ filter: 'jobs', page: match.params.page })
  }
]
