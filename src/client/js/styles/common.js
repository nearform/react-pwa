import { style, keyframes } from 'typestyle'

export function debugClassName($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production'
    ? { $debugName }
    : {}
}

export const messageText = style(debugClassName('message-text'), {
  padding: '1em',
  textAlign: 'center'
})

export const colors = {
  LIGHTEST_GRAY: '#f9f9f9',
  LIGHT_GRAY: '#e2e2e2',
  GRAY: '#797a7c',
  NEARFORM_BRAND_ACCENT_1: '#3a404c',
  NEARFORM_BRAND_ACCENT_2: '#424853',
  NEARFORM_BRAND_MAIN: '#ec1c2b'
}

export const ergonomics = {
  PALM: {
    BEGINNING: 0,
    END: 750
  },
  LAP: {
    BEGINNING: 751,
    END: 1100
  },
  DESK: {
    BEGINNING: 1101
  }
}

export const placeholder = style(debugClassName('placeholder'), {
  margin: 0,
  padding: 0,
  /*
   * the '!important' here is necessary because these styles are used to
   * override already defined styles and we can't rely on the cascade to ensure
   * one class is applied before the other
   */
  color: `${colors.LIGHT_GRAY} !important`,
  background: `${colors.LIGHT_GRAY} !important`
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
