const { fetchStories } = require('./store/actions/stories')

module.exports = [
  {
    path: '/',
    exact: true,
    component: require('./pages/HomePage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ sort: 'rank' }))
  },
  {
    path: '/newest',
    exact: true,
    component: require('./pages/NewestPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ sort: 'newest' }))
  },
  {
    path: '/newcomments',
    exact: true,
    component: require('./pages/CommentsPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ filter: 'comments' }))
  },
  {
    path: '/show',
    exact: true,
    component: require('./pages/ShowPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ filter: 'show' }))
  },
  {
    path: '/ask',
    exact: true,
    component: require('./pages/AskPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ filter: 'ask' }))
  },
  {
    path: '/jobs',
    exact: true,
    component: require('./pages/JobsPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories({ filter: 'jobs' }))
  }
]
