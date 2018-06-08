import React from 'react'
import { stylesheet } from 'typestyle'
import { colors } from '../../styles/common'

const styles = stylesheet({
  logo: {
    border: `2px solid ${colors.NEARFORM_BRAND_ACCENT_2}`,
    width: 30,
    padding: '.5em',
    color: colors.NEARFORM_BRAND_ACCENT_2
  }
})

export function Logo() {
  return <div className={styles.logo}>HN</div>
}
