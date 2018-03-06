const { fetchStories } = require('./store/actions/stories')

module.exports = [
  {
    path: '/',
    exact: true,
    component: require('./pages/HomePage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  },
  {
    path: '/newest',
    exact: true,
    component: require('./pages/NewestPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  },
  {
    path: '/newcomments',
    exact: true,
    component: require('./pages/CommentsPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  },
  {
    path: '/show',
    exact: true,
    component: require('./pages/ShowPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  },
  {
    path: '/ask',
    exact: true,
    component: require('./pages/AskPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  },
  {
    path: '/jobs',
    exact: true,
    component: require('./pages/JobsPage'),
    fetchData: ({ dispatch }) => dispatch(fetchStories())
  }
]
