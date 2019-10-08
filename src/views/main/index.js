import React from 'react';

import UserInfo from './modal/userInfo'

import {connect} from 'react-redux'
import {showUserInfo} from './../../actions'

import LeftPanel from './leftPanel'
import RightPanel from './rightPanel'

import styles from  './index.module.scss';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.mainWrapper} ${'box-sizing'}`}>
          <LeftPanel>
          </LeftPanel>
          <RightPanel></RightPanel>
        </div>
        <div>
          {this.props.showModal.show && <UserInfo/>}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)