import React from 'react'

import { colors } from '../../styles/common'

export const HumburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
    <path fill={colors.NEARFORM_BRAND_MAIN} d="M6.559 10.398h38v5.043h-38zm0 12.641h38v5.121h-38zm0 12.723h38V40.8h-38zm0 0" />
  </svg>
)

export const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
    <path fill={colors.NEARFORM_BRAND_MAIN} d="M46.328 4.348L43.68 1.695 24 21.348 4.336 1.684 1.684 4.336 21.348 24 1.672 43.652l2.648 2.653L24 26.652l19.664 19.664 2.652-2.652L26.652 24zm0 0" />
  </svg>
)
