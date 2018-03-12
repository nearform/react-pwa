const { connect } = require('react-redux')

const StoriesList = require('../components/StoriesList')

function mstp (state) {
  return {
    stories: state.pageLoader.data
  }
}

module.exports = connect(mstp)(StoriesList)
