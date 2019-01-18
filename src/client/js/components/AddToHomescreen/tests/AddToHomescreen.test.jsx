import React from 'react'
import { mount } from 'enzyme'
import AddToHomescreen from '../AddToHomescreen'
import { flushEffects } from '../../../utils/testUtils'

const setup = () => {
  const promptEvent = {
    preventDefault: jest.fn(),
  }
  const event = new Event('beforeinstallprompt', promptEvent)
  const test = mount(<AddToHomescreen />)
  const originalUserAgent = navigator.userAgent

  const cleanup = () => {
    test.unmount()
    Object.defineProperty(navigator, 'userAgent', { value: originalUserAgent, writable: true })
    Object.defineProperty(navigator, 'standalone', { value: undefined, writable: true })
  }

  return { test, event, cleanup }
}

describe('AddToHomescreen', () => {
  it('shouldnt render anything until effects are run', () => {
    const test = mount(<AddToHomescreen />)
    expect(test.isEmptyRender()).toEqual(true)
    test.unmount()
  })

  it('should display prompt when browser triggers beforeinstallprompt event', () => {
    const { test, event, cleanup } = setup()
    flushEffects()

    window.dispatchEvent(event)
    flushEffects()
    test.update()

    expect(test.find('Prompt').props()).toMatchObject({ display: true })
    cleanup()
  })

  it('should display prompt when beforeinstallprompt event is unsupported, but we still want to show fallback on mobile browsers', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X)
    AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1`,
      writable: true,
    })

    const { test, cleanup } = setup()
    flushEffects()
    test.update()

    expect(test.find('Prompt').props()).toMatchObject({ display: true })

    cleanup()
  })

  it('shouldnt display prompt when native event is unsupported, but the app was already installed and we are in standalone mode', () => {
    Object.defineProperty(navigator, 'standalone', { value: true, writable: true })
    Object.defineProperty(navigator, 'userAgent', {
      value: `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X)
    AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1`,
      writable: true,
    })

    const { test, cleanup } = setup()
    flushEffects()
    test.update()

    expect(test.find('Prompt').props()).toMatchObject({ display: false })

    cleanup()
  })
})
