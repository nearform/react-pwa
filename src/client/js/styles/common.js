import { em, rem } from 'csx'
import { style } from 'typestyle'

export function debugClassName($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production' ? { $debugName } : {}
}

export const pageTitleClassName = style(debugClassName('page-title'), {
  $debugName: 'page-title',
  fontSize: em(1.3),
  margin: 0
})

// export const pageContentClassName = style(debugClassName('page-content'), {
//   $debugName: 'page-content',
//   opacity: 1,
//   padding: rem(1),
//   transition: 'opacity .2s ease-out'
// })
