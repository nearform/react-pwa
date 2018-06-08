import React from 'react'
import { render } from 'enzyme'

import {NearFormLogo, HumburgerIcon, CloseIcon} from './Glyphs'

it('renders NearFormLogo correctly', () => {
  const test = render(<NearFormLogo />)
  expect(test).toMatchSnapshot()
})

it('renders HumburgerIcon correctly', () => {
  const test = render(<HumburgerIcon />)
  expect(test).toMatchSnapshot()
})

it('renders CloseIcon correctly', () => {
  const test = render(<CloseIcon />)
  expect(test).toMatchSnapshot()
})
