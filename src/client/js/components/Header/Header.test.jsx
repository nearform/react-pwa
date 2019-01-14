import React from 'react'
import { render, mount } from 'enzyme'
import { MemoryRouter, NavLink } from 'react-router-dom'
import Header from './Header'

it('renders correctly when location is "/"', () => {
  const props = {
    location: {
      pathname: '/',
    },
  }

  const test = render(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('renders correctly when location is "/newcomments"', () => {
  const props = {
    location: {
      pathname: '/newcomments',
    },
  }

  const test = render(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('should render with menu open', () => {
  const props = {
    location: {
      pathname: '/',
    },
    navigationVisible: true,
  }

  const test = render(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  expect(test).toMatchSnapshot()
})

it('opens and closes mobile nav menu', () => {
  const props = {
    location: {
      pathname: '/',
    },
    toggleNavigation: jest.fn(),
  }

  const test = mount(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  const navigationHamburger = test.find('[data-testid="navigationHamburger"]')
  const navigationClose = test.find('[data-testid="navigationClose"]')
  const mobileTopStoriesLink = test.find('[data-testid="mobileTopStoriesLink"]').find(NavLink)

  navigationHamburger.simulate('click')
  expect(props.toggleNavigation).toHaveBeenCalledTimes(1)

  navigationClose.simulate('click')
  expect(props.toggleNavigation).toHaveBeenCalledTimes(2)

  mobileTopStoriesLink.simulate('click')
  expect(props.toggleNavigation).toHaveBeenCalledTimes(3)
})
