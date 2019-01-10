import pageFactory from './js/components/Page'

export default [
  {
    path: '/',
    exact: true,
    component: pageFactory('top'),
  },
  {
    path: '/newest',
    exact: true,
    component: pageFactory('new'),
  },
  {
    path: '/newcomments',
    exact: true,
    component: pageFactory('comments'),
  },
  {
    path: '/show',
    exact: true,
    component: pageFactory('show'),
  },
  {
    path: '/ask',
    exact: true,
    component: pageFactory('ask'),
  },
  {
    path: '/jobs',
    exact: true,
    component: pageFactory('jobs'),
  },
]
