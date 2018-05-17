import { px } from 'csx'
import React from 'react'
import { style } from 'typestyle'
import { debugClassName } from '../styles/common'

const logoClassName = style(debugClassName('logo'), {
  backgroundImage:
    'url(data:image/gif;base64,R0lGODlhEgASAKIAAP/jyvihV/aKLfmxc/////9mAAAAAAAAACH5BAAAAAAALAAAAAASABIAAAMpWLrc/jDKOQkRy8pBhuKeRAAKQFBBxwVUYY5twXVxodV3nLd77f9ASQIAOw==)',
  backgroundSize: px(18),
  border: `${px(1)} solid #fff`,
  display: 'inline-block',
  height: px(18),
  width: px(18)
})

export function Logo(props) {
  return <div className={logoClassName} />
}
