import { rem } from 'csx'
import React from 'react'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'

const logoClassName = style(debugClassName('logo'), {
  backgroundImage:
    'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PHBhdGggZmlsbD0iI0ZCNjUxRSIgZD0iTTAgMGgyNTZ2MjU2SDB6Ii8+PHBhdGggZD0iTTExOS40IDE0NC43bC00NC04Mi4zaDIwLjFsMjUuOSA1Mi4xYy40IDEgLjggMiAxLjQgMyAuNS45IDEgMiAxLjMgM2wuNiAxIC40IDFhNjUuNiA2NS42IDAgMCAxIDMuMiA3LjMgNTk4LjcgNTk4LjcgMCAwIDEgNy40LTE1LjNsMjYuMi01MmgxOC43bC00NC4zIDgzLjJ2NTMuMWgtMTd2LTU0eiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==)',
  backgroundSize: rem(2),
  border: `${rem(0.1)} solid #fff`,
  display: 'inline-block',
  height: rem(2),
  width: rem(2)
})

export function Logo(props) {
  return <div className={logoClassName} />
}
