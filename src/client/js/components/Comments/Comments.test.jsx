import React from 'react'
import { render } from 'enzyme'

import {Comments} from './Comments'

import {commentsMock} from './comments.mock'

jest.mock('react-timeago', () => () => (
  <time>'MOCK_TIME_AGO'</time>
))

it('renders correctly when no data provided', () => {
  const props = {
    data: null
  }
  const test = render(<Comments {...props} />)
  expect(test).toMatchSnapshot()
})

it('renders correctly when empty data provided', () => {
  const props = {
    data: []
  }
  const test = render(<Comments {...props} />)
  expect(test).toMatchSnapshot()
})

it('renders correctly when data provided', () => {
  const props = {
    data: commentsMock
  }
  const test = render(<Comments {...props} />)
  expect(test).toMatchSnapshot()
})
