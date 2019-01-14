import React from 'react'
import { stylesheet } from 'typestyle'

const styles = stylesheet({
  linksList: {
    position: 'relative',
    zIndex: 3,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    position: 'absolute',
    left: '-1000px',
    display: 'block',
    padding: '.5em',
    fontSize: '1em',
    color: 'black',
    background: 'white',
    $nest: {
      '&:focus': {
        left: 0,
        fontWeight: 'bold',
      },
    },
  },
})

const SkipLinks = () => (
  <ul className={styles.linksList}>
    <li>
      <a href="#content" className={styles.link}>
        Skip to content
      </a>
    </li>
  </ul>
)

export default SkipLinks
