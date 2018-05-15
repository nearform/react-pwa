import { connect } from 'react-redux'

import StoriesList from '../components/StoriesList'

function mstp (state) {
  return {
    stories: state.pageLoader.data
  }
}

export default connect(mstp)(StoriesList)
