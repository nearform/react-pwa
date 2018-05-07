import { px } from 'csx'
import { style } from 'typestyle'

export function debugClassName ($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production' ? {$debugName} : {}
}

export const pageTitleClassName = style(
  debugClassName('page-title'),
  {
    $debugName: 'page-title',
    fontSize: '10pt',
    margin: 0,
    paddingLeft: px(8)
  }
)

export const pageContentClassName = style(
  debugClassName('page-content'),
  {
    $debugName: 'page-content',
    opacity: 1,
    padding: `${px(6)} ${px(6)} ${px(6)} 0`,
    transition: 'opacity .2s ease-out'
  }
)
