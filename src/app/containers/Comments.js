import { connect } from 'react-redux'
import { CommentsList } from '../components/CommentsList'

function mstp (state) {
  return {
    comments: state.pageLoader.data
  }
}

export const Comments = connect(mstp)(CommentsList)
