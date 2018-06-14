import { style, keyframes } from 'typestyle'
import constants from './constants'

export const colors = constants.colors
export const ergonomics = constants.ergonomics

export function debugClassName($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production'
    ? { $debugName }
    : {}
}

export const messageText = style(debugClassName('message-text'), {
  padding: '1em',
  textAlign: 'center'
})

export const placeholder = style(debugClassName('placeholder'), {
  margin: 0,
  padding: 0,
  /*
   * the '!important' here is necessary because these styles are used to
   * override already defined styles and we can't rely on the cascade to ensure
   * one class is applied before the other
   */
  color: `${constants.colors.LIGHT_GRAY} !important`,
  background: `${constants.colors.LIGHT_GRAY} !important`
})

export const loadingAnimation = style(debugClassName('loading'), {
  $nest: {
    '&::after': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.15), rgba(0,0,0,0))',
      transform: 'translateX(-100%)',
      animationName: keyframes({
        '100%': {
          transform: 'translateX(100%)'
        }
      }),
      animationDuration: '1.5s',
      animationIterationCount: 'infinite'
    }
  }
})
