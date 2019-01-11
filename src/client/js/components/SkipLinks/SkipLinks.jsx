import React from 'react'
import { classes, stylesheet } from 'typestyle'

const styles = stylesheet({
  linksList: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
})

const SkipLinks = () => (
  <ul className={styles.linksList}>
    <li>
      <a href="#content">Skip to content</a>
    </li>
  </ul>
)

export default SkipLinks
