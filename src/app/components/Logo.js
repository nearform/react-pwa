import React from 'react'

const imageBg = 'data:image/gif;base64,R0lGODlhEgASAKIAAP/jyvihV/aKLfmxc/////9mAAAAAAAAACH5BAAAAAAALAAAAAASABIAAAMpWLrc/jDKOQkRy8pBhuKeRAAKQFBBxwVUYY5twXVxodV3nLd77f9ASQIAOw=='

const logoStyle = {
  backgroundImage: `url(${imageBg})`,
  backgroundSize: '18px',
  border: '1px solid #fff',
  display: 'inline-block',
  height: '18px',
  width: '18px'
}

export function Logo (props) {
  return (
    <div style={logoStyle} />
  )
}
