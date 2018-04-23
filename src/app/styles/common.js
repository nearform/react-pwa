const { px } = require('csx')
const { style } = require('typestyle')

const debugClassName = function ($debugName, force = false) {
  return force === true || process.env.NODE_ENV !== 'production' ? {$debugName} : {}
}

module.exports = {
  debugClassName,
  pageTitleClassName: style(
    debugClassName('page-title'),
    {
      $debugName: 'page-title',
      fontSize: '10pt',
      margin: 0,
      paddingLeft: px(8)
    }
  ),

  pageContentClassName: style(
    debugClassName('page-content'),
    {
      $debugName: 'page-content',
      opacity: 1,
      padding: `${px(6)} ${px(6)} ${px(6)} 0`,
      transition: 'opacity .2s ease-out'
    }
  )
}
