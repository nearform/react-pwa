import React from 'react'
import { render } from 'enzyme'

import {Logo} from './Logo'

it('renders Logo correctly', () => {
  const test = render(<Logo />)
  expect(test).toMatchSnapshot()
})
