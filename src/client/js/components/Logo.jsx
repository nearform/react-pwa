import { rem } from 'csx'
import React from 'react'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'

const logoClassName = style(debugClassName('logo'), {
  border: `2px solid #82827C`,
  width: 30,
  padding: rem(.5)
})

export function Logo(props) {
  return <div className={logoClassName}>HN</div>
}
