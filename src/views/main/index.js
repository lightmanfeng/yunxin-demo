import React from 'react';

import LeftPanel from './leftPanel'
import RightPanel from './rightPanel'

import styles from  './index.module.scss';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: null, // 用户信息
      sessionsList: [], // 最近联系人
      friendsList: [], // 好友列表
      teamsList: [] // 群组列表
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.mainWrapper} ${'box-sizing'}`}>
          <LeftPanel
            userInfo={this.state.userInfo}
            sessionsList={this.state.sessionsList}
            friendsList={this.state.friendsList}
            teamsList={this.state.teamsList}>
          </LeftPanel>
          <RightPanel></RightPanel>
        </div>
      </div>
    )
  }
}

export default Main;