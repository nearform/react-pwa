import React from 'react'
import { render } from 'enzyme'

import {Stories} from './Stories'

import {storiesMock} from './stories.mock'

it('renders correctly when no data provided', () => {
  const props = {
    data: null,
    location: {
      pathname: '/'
    }
  }
  const test = render(<Stories {...props} />)
  expect(test).toMatchSnapshot()
})

it('renders correctly when empty data provided', () => {
  const props = {
    data: [],
    location: {
      pathname: '/'
    }
  }
  const test = render(<Stories {...props} />)
  expect(test).toMatchSnapshot()
})

it('renders correctly when data provided', () => {
  const props = {
    data: storiesMock,
    location: {
      pathname: '/'
    }
  }
  const test = render(<Stories {...props} />)
  expect(test).toMatchSnapshot()
})

it('renders correctly when data and page provided', () => {
  const props = {
    data: storiesMock,
    location: {
      pathname: '/foo/page/2'
    }
  }
  const test = render(<Stories {...props} />)
  expect(test).toMatchSnapshot()
})
