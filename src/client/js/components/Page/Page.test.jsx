import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router-dom'
import pageFactory from './Page'
import { flushEffects, flushAllPromises } from '../../utils/testUtils'

describe('Page test suite', () => {
  let Wrapper, Page

  beforeEach(() => {
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
})
