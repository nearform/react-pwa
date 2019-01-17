import React from 'react'
import { mount } from 'enzyme'
import useBeforeInstallPrompt from '../useBeforeInstallPrompt'
import { flushEffects } from '../../utils/testUtils'

const Wrapper = ({ children }) => {
  const data = useBeforeInstallPrompt()
  return children(data)
}

const TestComponent = () => null
const Test = () => <Wrapper>{data => <TestComponent {...data} />}</Wrapper>

const setup = () => {
  const promptEvent = {
    preventDefault: jest.fn(),
    prompt: jest.fn(),
  }

  // stub window.addEventListener
  const originalAddEventListener = window.addEventListener
  const events = {}
  window.addEventListener = jest.fn((event, cb) => {
    events[event] = cb
  })

  // stub BeforeInstallPromptEvent support
  Object.defineProperty(window, 'BeforeInstallPromptEvent', { value: {}, writable: true })

  const test = mount(<Test />)
  // call all effects
  flushEffects()

  // simulate the event
  events.beforeinstallprompt(promptEvent)
  // rerender
  test.update()

  const cleanup = () => {
    test.unmount()
    window.addEventListener = originalAddEventListener
    Object.defineProperty(window, 'BeforeInstallPromptEvent', { value: undefined, writable: true })
  }

  return { test, cleanup }
}

describe('useBeforeInstallPrompt hook', () => {
  it('should give us prompt, promptToInstall and promptSupported', () => {
    const { test, cleanup } = setup()
    const testProps = test.find('TestComponent').props()

    expect(testProps.prompt).toBeDefined()
    expect(testProps.promptToInstall).toBeDefined()
    expect(testProps.promptSupported).toBeDefined()
    expect(testProps.promptSupported).toEqual(true)
    cleanup()
  })

  it('should call preventDefault on the event to prevent Chrome < 72 to automatically show dialog', () => {
    const { test, cleanup } = setup()
    const testProps = test.find('TestComponent').props()

    expect(testProps.prompt.preventDefault).toBeCalled()
    cleanup()
  })

  it('should call prompt() on the original event when calling promptToInstall', () => {
    const { test, cleanup } = setup()
    const testProps = test.find('TestComponent').props()

    testProps.promptToInstall()

    expect(testProps.prompt.prompt).toBeCalled()
    cleanup()
  })
})
