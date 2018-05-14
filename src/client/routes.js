import { AskStoriesPage } from './js/pages/AskStoriesPage'
import { JobsStoriesPage } from './js/pages/JobsStoriesPage'
import { NewCommentsPage } from './js/pages/NewCommentsPage'
import { NewStoriesPage } from './js/pages/NewStoriesPage'
import { ShowStoriesPage } from './js/pages/ShowStoriesPage'
import { TopStoriesPage } from './js/pages/TopStoriesPage'

// Add all the routes
export const routes = {
  '': TopStoriesPage,
  '/newest': NewStoriesPage,
  '/newcomments': NewCommentsPage,
  '/show': ShowStoriesPage,
  '/ask': AskStoriesPage,
  '/jobs': JobsStoriesPage
}
