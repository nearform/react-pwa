import React from 'react'
import { render, mount } from 'enzyme'
import { MemoryRouter, NavLink } from 'react-router-dom'
import Header, { styles } from './Header'

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

it('opens and closes mobile nav menu', () => {
  const props = {
    location: {
      pathname: '/',
    },
  }

  const test = mount(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  const navigation = test.find('[data-testid="navigation"]')
  const navigationNode = navigation.getDOMNode()
  const navigationHamburger = test.find('[data-testid="navigationHamburger"]')
  const navigationClose = test.find('[data-testid="navigationClose"]')

  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(false)

  navigationHamburger.simulate('click')
  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(true)

  navigationClose.simulate('click')
  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(false)
})

it('toggles navigation when clicking mobile nav item', () => {
  const props = {
    location: {
      pathname: '/',
    },
  }

  const test = mount(
    <MemoryRouter initialEntries={[props.location.pathname]}>
      <Header {...props} />
    </MemoryRouter>
  )

  const navigation = test.find('[data-testid="navigation"]')
  const navigationNode = navigation.getDOMNode()
  const navigationHamburger = test.find('[data-testid="navigationHamburger"]')
  const mobileTopStoriesLink = test.find('[data-testid="mobileTopStoriesLink"]').find(NavLink)

  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(false)

  navigationHamburger.simulate('click')
  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(true)

  mobileTopStoriesLink.simulate('click')
  expect(navigationNode.className.includes(styles.navigationSideVisible)).toEqual(false)
})
