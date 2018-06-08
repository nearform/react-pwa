import React from 'react'
import { render, shallow } from 'enzyme'
import { MemoryRouter, NavLink } from 'react-router-dom'

import Header from './Header'

it('renders correctly when location is "/"', () => {
  const props = {
    location: {
      pathname: '/'
    }
  }

  const test = render(
    <MemoryRouter initialEntries={[ props.location.pathname ]}>
      <Header {...props} />
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
      <Header {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('opens and closes mobile nav menu', () => {
  const props = {
    location: {
      pathname: '/'
    }
  }

  const test = shallow(<Header {...props} />)
  const navigationHamburger = test.find('[data-auto="navigationHamburger"]')
  const navigationClose = test.find('[data-auto="navigationClose"]')

  expect(test.state().navigationVisible).toEqual(false)

  navigationHamburger.simulate('click')
  expect(test.state().navigationVisible).toEqual(true)

  navigationClose.simulate('click')
  expect(test.state().navigationVisible).toEqual(false)
})

it('toggles navigation when clicking mobile nav item', () => {
  const props = {
    location: {
      pathname: '/'
    }
  }

  const test = shallow(<Header {...props} />)
  const navigationHamburger = test.find('[data-auto="navigationHamburger"]')
  const mobileTopStoriesLink = test.find('[data-auto="mobileTopStoriesLink"]').find(NavLink)

  expect(test.state().navigationVisible).toEqual(false)

  navigationHamburger.simulate('click')
  expect(test.state().navigationVisible).toEqual(true)

  mobileTopStoriesLink.simulate('click')
  expect(test.state().navigationVisible).toEqual(false)
})
