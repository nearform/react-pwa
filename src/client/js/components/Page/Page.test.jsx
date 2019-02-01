import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import pageFactory from './Page'
import { flushEffects, flushAllPromises, createTouchEventObject } from '../../utils/testUtils'
import * as PageUtils from '../../utils/page'

jest.mock('../../utils/page', () => ({
  buildLinks: jest.fn(() => ({})),
}))

function mockListenerSetup(el) {
  // track eventListener adds to trigger later
  // idea from - https://github.com/airbnb/enzyme/issues/426#issuecomment-228601631
  const eventListenerMap = {}
  el.addEventListener = jest.fn((event, cb) => {
    // eslint-disable-line no-param-reassign
    eventListenerMap[event] = cb
  })
  el.removeEventListener = jest.fn((event, cb) => {
    // eslint-disable-line no-param-reassign
    if (eventListenerMap[event] === cb) delete eventListenerMap[event]
  })
  return eventListenerMap
}

describe('Page test suite', () => {
  let Wrapper, Page
  let origAddEventListener
  let origRemoveEventListener
  let eventListenerMap

  beforeAll(() => {
    origAddEventListener = document.addEventListener
    origRemoveEventListener = document.removeEventListener
  })

  beforeEach(() => {
    // track eventListener adds to trigger later
    // idea from - https://github.com/airbnb/enzyme/issues/426#issuecomment-228601631
    eventListenerMap = mockListenerSetup(document)

    Page = pageFactory('top')
    Page.fetchData = jest.fn().mockImplementation(() => {
      return Promise.resolve([])
    })

    Wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/']}>
        {/* render route so the Page component will receive route props as it would normally */}
        <Route component={children} />
      </MemoryRouter>
    )
  })

  afterAll(() => {
    document.eventListener = origAddEventListener
    document.removeEventListener = origRemoveEventListener
  })

  it('should render with ssr data', () => {
    const props = {
      ssrPreloading: {
        success: true,
        payload: [],
      },
    }
    const test = mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)
    expect(Page.fetchData).not.toBeCalled()
    expect(test.find('main').length).toEqual(1)
  })

  it('should render error page when preloaded has error', () => {
    const props = { ssrPreloading: { success: false, payload: 'MOCK_PAYLOAD' } }
    const test = mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)
    expect(test.find('ErrorPage').length).toEqual(1)
  })

  it('should call fetchData when ssr data is not provided', () => {
    const props = { ssrPreloading: {} }
    mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)
    flushEffects()
    expect(Page.fetchData).toHaveBeenCalled()
  })

  it('should render Offline page when not online', async () => {
    const onLine = global.navigator.onLine
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true })
    Page.fetchData = jest.fn().mockImplementation(() => {
      return Promise.reject(new Error('MOCK_ERROR'))
    })

    const props = { ssrPreloading: {} }
    const test = mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)
    flushEffects()
    await flushAllPromises()
    test.update()

    expect(test.find('OfflinePage').length).toEqual(1)

    Object.defineProperty(window.navigator, 'onLine', { value: onLine })
  })

  it('should call swipe right callbacks when swiped right', () => {
    PageUtils.buildLinks.mockImplementation(() => ({
      nextLinkEnabled: true,
      nextLink: 'nextLink',
    }))

    const historyPushMock = jest.fn()
    const props = {
      ssrPreloading: {},
      history: { push: historyPushMock },
    }
    const component = mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)

    component.simulate('touchStart', createTouchEventObject({ x: 100, y: 100, timeStamp: 8077.299999946263 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 125, y: 100, timeStamp: 8100.999999966007 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 150, y: 100, timeStamp: 8116.899999964517 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 175, y: 100, timeStamp: 8122.799999953713 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 200, y: 100, timeStamp: 8130.199999955433 }))
    eventListenerMap.touchend(createTouchEventObject({}))

    expect(historyPushMock).toHaveBeenCalledTimes(1)
    expect(historyPushMock).toHaveBeenCalledWith('nextLink')
  })

  it('should call swipe left callbacks when swiped left', () => {
    PageUtils.buildLinks.mockImplementation(() => ({
      prevLinkEnabled: true,
      prevLink: 'prevLink',
    }))

    const historyPushMock = jest.fn()
    const props = {
      ssrPreloading: {},
      history: { push: historyPushMock },
    }
    const component = mount(<Wrapper>{routeProps => <Page {...routeProps} {...props} />}</Wrapper>)

    component.simulate('touchStart', createTouchEventObject({ x: 200, y: 100, timeStamp: 8077.299999946263 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 175, y: 100, timeStamp: 8100.999999966007 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 150, y: 100, timeStamp: 8116.899999964517 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 125, y: 100, timeStamp: 8122.799999953713 }))
    eventListenerMap.touchmove(createTouchEventObject({ x: 100, y: 100, timeStamp: 8130.199999955433 }))
    eventListenerMap.touchend(createTouchEventObject({}))

    expect(historyPushMock).toHaveBeenCalledTimes(1)
    expect(historyPushMock).toHaveBeenCalledWith('prevLink')
  })
})
