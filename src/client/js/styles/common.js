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
  GRAY: '#d4d4d4',
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

export const icons = {
  HAMBURGER: `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8cG9seWdvbiBmaWxsPSIjZWMxYzJiIiBwb2ludHM9IjguMjAwMDEyMjA3MDMxMjUsMTMgNTUuNzAwMDEyMjA3MDMxMjUsMTMgNTUuNzAwMDEyMjA3MDMxMjUsMTkuMzAwMDAzMDUxNzU3ODEyIDguMjAwMDEyMjA3MDMxMjUsMTkuMzAwMDAzMDUxNzU3ODEyICIgaWQ9IkZpbGwtMTkiIGNsYXNzPSJzdDAiLz4gIDxwb2x5Z29uIGZpbGw9IiNlYzFjMmIiIHBvaW50cz0iOC4yMDAwMTIyMDcwMzEyNSwyOC44MDAwMDMwNTE3NTc4MTIgNTUuNzAwMDEyMjA3MDMxMjUsMjguODAwMDAzMDUxNzU3ODEyIDU1LjcwMDAxMjIwNzAzMTI1LDM1LjE5OTk5Njk0ODI0MjE5IDguMjAwMDEyMjA3MDMxMjUsMzUuMTk5OTk2OTQ4MjQyMTkgIiBpZD0iRmlsbC0yMCIgY2xhc3M9InN0MCIvPiAgPHBvbHlnb24gZmlsbD0iI2VjMWMyYiIgcG9pbnRzPSI4LjIwMDAxMjIwNzAzMTI1LDQ0LjY5OTk5Njk0ODI0MjE5IDU1LjcwMDAxMjIwNzAzMTI1LDQ0LjY5OTk5Njk0ODI0MjE5IDU1LjcwMDAxMjIwNzAzMTI1LDUxIDguMjAwMDEyMjA3MDMxMjUsNTEgIiBpZD0iRmlsbC0yMSIgY2xhc3M9InN0MCIvPiA8L2c+PC9zdmc+)`,
  CLOSE: `url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGc+ICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+ICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDAyIiB3aWR0aD0iNTgyIiB5PSItMSIgeD0iLTEiLz4gPC9nPiA8Zz4gIDx0aXRsZT5MYXllciAxPC90aXRsZT4gIDxwb2x5Z29uIGlkPSJzdmdfMiIgcG9pbnRzPSIxMjMuNTQyOTY4OCwxMS41OTM3NSAxMTYuNDc2NTYyNSw0LjUxODU1NDcgNjQuMDAxOTUzMSw1Ni45MzA2NjQxIDExLjU1OTU3MDMsNC40ODgyODEzICAgICA0LjQ4ODI4MTMsMTEuNTU5NTcwMyA1Ni45MjcyNDYxLDYzLjk5NzA3MDMgNC40NTcwMzEzLDExNi40MDUyNzM0IDExLjUyNDQxNDEsMTIzLjQ4MTQ0NTMgNjMuOTk4NTM1Miw3MS4wNjgzNTk0ICAgICAxMTYuNDQyMzgyOCwxMjMuNTExNzE4OCAxMjMuNTEyNjk1MywxMTYuNDQxNDA2MyA3MS4wNzMyNDIyLDY0LjAwMTk1MzEgICAiIGZpbGw9IiNlYzFjMmIiLz4gPC9nPjwvc3ZnPg==)`
}

export const placeholder = style(debugClassName('placeholder'), {
  margin: 0,
  padding: 0,
  /*
   * the '!important' here is necessary because these styles are used to
   * override already defined styles and we can't rely on the cascade to ensure
   * one class is applied before the other
   */
  color: `${colors.GRAY} !important`,
  background: `${colors.GRAY} !important`
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
