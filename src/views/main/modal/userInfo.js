import React from 'react'
import ReactDom from 'react-dom'

import {connect} from 'react-redux'
import {showUserInfo} from '../../../actions'
// import API from '../../API/index'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
    this.state = {
      userInfo: null,
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  render() {
    const {onShowUserInfo} = this.props
    return ReactDom.createPortal(
      <div className="mask">
        <div className="modal-default user-info">
          <i className="icon-close fa fa-close" onClick={() => {onShowUserInfo('123')}}></i>
          好友信息
        </div>
      </div>,
      this.container
    )
  }
}
function mapStateToProps(state) {
  return {
    showModal: state.showUserInfo
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onShowUserInfo: (item) => dispatch(showUserInfo(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)