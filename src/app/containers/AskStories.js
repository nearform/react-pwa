const { connect } = require('react-redux')

const StoriesList = require('../components/StoriesList')

function mstp (state) {
  // check sort and filter are correct
  // set 'loading' prop
  return state.stories
}

module.exports = connect(mstp)(StoriesList)
