import React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import {More} from './More'

it('renders correctly when location is "/"', () => {
  const props = {
    location: {
      pathname: '/'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <More {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('renders correctly when location is "/page/5"', () => {
  const props = {
    location: {
      pathname: '/page/5'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <More {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('renders correctly when location is "/newcomments"', () => {
  const props = {
    location: {
      pathname: '/newcomments'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <More {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('renders correctly when location is "/newcomments/page/2"', () => {
  const props = {
    location: {
      pathname: '/newcomments/page/2'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <More {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})
