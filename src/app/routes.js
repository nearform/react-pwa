import { fetchStories } from './helpers/stories'
import LoadingPage from './pages/LoadingPage'
import HomePage from './pages/HomePage'
import NewestPage from './pages/NewestPage'
import CommentsPage from './pages/CommentsPage'
import ShowPage from './pages/ShowPage'
import AskPage from './pages/AskPage'
import JobsPage from './pages/JobsPage'

export default [
  {
    path: '/app-shell',
    exact: true,
    component: LoadingPage,
    fetcher: async () => ({ data: {} })
  },
  {
    path: '/',
    exact: true,
    component: HomePage,
    fetcher: () => fetchStories({ filter: 'top' })
  },
  {
    path: '/page/:page',
    exact: true,
    component: HomePage,
    fetcher: ({match}) => fetchStories({ filter: 'top', page: match.params.page })
  },
  {
    path: '/newest',
    exact: true,
    component: NewestPage,
    fetcher: () => fetchStories({ filter: 'new' })
  },
  {
    path: '/newest/page/:page?',
    exact: true,
    component: NewestPage,
    fetcher: ({match}) => fetchStories({ filter: 'new', page: match.params.page })
  },
  {
    path: '/newcomments',
    exact: true,
    component: CommentsPage,
    fetcher: () => fetchStories({ filter: 'comments' })
  },
  {
    path: '/newcomments/page/:page?',
    exact: true,
    component: CommentsPage,
    fetcher: ({match}) => fetchStories({ filter: 'comments', page: match.params.page })
  },
  {
    path: '/show',
    exact: true,
    component: ShowPage,
    fetcher: () => fetchStories({ filter: 'show' })
  },
  {
    path: '/show/page/:page?',
    exact: true,
    component: ShowPage,
    fetcher: ({match}) => fetchStories({ filter: 'show', page: match.params.page })
  },
  {
    path: '/ask',
    exact: true,
    component: AskPage,
    fetcher: () => fetchStories({ filter: 'ask' })
  },
  {
    path: '/ask/page/:page?',
    exact: true,
    component: AskPage,
    fetcher: ({match}) => fetchStories({ filter: 'ask', page: match.params.page })
  },
  {
    path: '/jobs',
    exact: true,
    component: JobsPage,
    fetcher: () => fetchStories({ filter: 'jobs' })
  },
  {
    path: '/jobs/page/:page?',
    exact: true,
    component: JobsPage,
    fetcher: ({match}) => fetchStories({ filter: 'jobs', page: match.params.page })
  }
]
