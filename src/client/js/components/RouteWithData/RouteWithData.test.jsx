import React from 'react'
import { render, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { RouteWithData } from './RouteWithData'

const router = {
  history: new MemoryRouter().history,
  route: {
    location: {},
    match: {}
  }
}

const createContext = () => ({
  context: { router },
  childContextTypes: () => ({ router: {} })
})

const MockComp = ({location, data}) => (
  <div>
    <span>location.pathname: {location.pathname}</span>
    <span>data: {data}</span>
  </div>
)

beforeEach(() => {
  MockComp.dataFetcher = jest.fn().mockImplementation(() => {
    return Promise.resolve(42)
  })
})

it('renders child correctly', () => {
  const props = {
    component: MockComp,
    ssrPreloading: {
      success: true,
      payload: 'MOCK_PAYLOAD'
    },
    location: {
      pathname: '/'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <RouteWithData {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('renders error page when preloaded has error', () => {
  const props = {
    component: MockComp,
    ssrPreloading: {
      success: false,
      payload: 'MOCK_PAYLOAD'
    },
    location: {
      pathname: '/'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <RouteWithData {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

describe('loadData', () => {
  let test = null

  beforeEach(() => {
    const props = {
      component: MockComp,
      ssrPreloading: {
        success: true,
        payload: 'MOCK_PAYLOAD'
      },
      location: {
        pathname: '/'
      }
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={[ props.location.pathname ]}>
        <RouteWithData {...props} />
      </MemoryRouter>
    )

    test = wrapper.find(RouteWithData)
  })

  it('calls child component\'s dataFetcher', async () => {
    expect(MockComp.dataFetcher).not.toHaveBeenCalled()

    await test.instance().loadData()

    expect(MockComp.dataFetcher).toHaveBeenCalled()
  })
})

it('renders offline page when not online', async () => {
  const onLine = global.navigator.onLine
  Object.defineProperty(window.navigator, 'onLine', {value: false, configurable: true})

  const props = {
    component: MockComp,
    ssrPreloading: {},
    location: {
      pathname: '/'
    }
  }

  MockComp.dataFetcher = jest.fn().mockImplementation(() => {
    return Promise.reject(new Error('MOCK_ERROR'))
  })

  const test = mount(<RouteWithData {...props} />, createContext())

  await test.instance().loadData()

  expect(render(test.instance().render())).toMatchSnapshot()

  Object.defineProperty(window.navigator, 'onLine', {value: onLine})
})
