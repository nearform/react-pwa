import React from 'react'
import { render } from 'enzyme'

import {HumburgerIcon, CloseIcon} from './Glyphs'

it('renders HumburgerIcon correctly', () => {
  const test = render(<HumburgerIcon />)
  expect(test).toMatchSnapshot()
})

it('renders CloseIcon correctly', () => {
  const test = render(<CloseIcon />)
  expect(test).toMatchSnapshot()
})
