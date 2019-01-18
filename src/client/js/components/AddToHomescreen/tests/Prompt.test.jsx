import React from 'react'
import { render, mount } from 'enzyme'
import Prompt from '../Prompt'

const setup = () => {
  const props = { display: true, onInstall: jest.fn(), onDismiss: jest.fn() }
  return props
}

describe('Prompt test suite', () => {
  describe('natively supported', () => {
    it('should render correctly', () => {
      const props = setup()
      const test = render(<Prompt {...props} nativeSupport />)

      expect(test).toMatchSnapshot()
    })

    it('should call button callbacks', () => {
      const props = setup()
      const test = mount(<Prompt {...props} nativeSupport />)

      test.find('button[children="Install"]').simulate('click')
      expect(props.onInstall).toBeCalled()

      test.find('button[children="Close"]').simulate('click')
      expect(props.onDismiss).toBeCalled()
    })
  })

  describe('not natively supported', () => {
    it('should render correctly', () => {
      const props = setup()
      const test = render(<Prompt {...props} />)

      expect(test).toMatchSnapshot()
    })

    it('should show instructions when clicking install', () => {
      const props = setup()
      const test = mount(<Prompt {...props} />)

      test.find('button[children="Install"]').simulate('click')

      expect(test).toMatchSnapshot()
    })

    it('should call button callbacks', () => {
      const props = setup()
      const test = mount(<Prompt {...props} />)

      test.find('button[children="Close"]').simulate('click')
      expect(props.onDismiss).toBeCalled()
    })
  })
})
