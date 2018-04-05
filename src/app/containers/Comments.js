const { connect } = require('react-redux')

const CommentsList = require('../components/CommentsList')

function mstp (state) {
  return {
    comments: state.pageLoader.data
  }
}

module.exports = connect(mstp)(CommentsList)
