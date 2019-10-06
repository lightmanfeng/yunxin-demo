import React from 'react'
import styles from './left.module.scss'
import PanelItem from './components/panelItem'
import PanelList from './components/panelList'
import AddFriend from './modal/addFriend'
import AddGroup from './modal/addGroup'

import API from '../API/index'

function formatData(arr) {
  return arr.filter(v => v.status === 20).map(item => {
    return {
      id: item.user.id,
      img: item.user.portraiUri,
      name: item.user.nickname,
      origin: item
    }
  })
}
function formatGroupData(arr) {
  return arr.map(item => {
    return {
      id: item.group.id,
      img: item.group.portraitUri,
      name: item.group.name,
      origin: item
    }
  })
}

class LeftPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectTab: 1,
      sessionsList: [
        // {id: 1, img: 'https://app.yunxin.163.com/webdemo/im/images/normal.png', name: 'web开发讨论组', time: '13:34', msg: '[langren加入群]'},
        // {id: 2, img: 'https://app.yunxin.163.com/webdemo/im/images/normal.png', name: 'web开发讨论组', time: '13:34', msg: '[langren加入群]'},
        // {id: 3, img: 'https://app.yunxin.163.com/webdemo/im/images/normal.png', name: 'web开发讨论组', time: '13:34', msg: '[langren加入群]'},
      ],
      groupsList: [],
      friendsList: [],
      showAddFriendModal: false,
      showAddGroupModal: false,
    }
  }

  componentDidMount() {
    this.onFriendAll()
    this.getAllGroup()
  }

  switchTab = (event, type) => {
    this.setState({
      selectTab: type
    })
    if (type === 2) {
      this.onFriendAll()
    }
    event.preventDefault()
  }
  // 添加好友
  handleAddFriend = () => {
    this.setState({
      showAddFriendModal: true
    })
  }
  closeAddFriendModal = () => {
    this.setState({showAddFriendModal: false})
  }
  onFriendAll = () => {
    API.get('/friendship/all').then(res => {
      this.setState({
        friendsList: formatData(res.result)
      })
    })
  }

  // 群相关
  closeAddGroupModal = () => {
    this.setState({showAddGroupModal: false})
  }
  getAllGroup = () => {
    this.closeAddGroupModal()
    API.get('/user/groups').then(res => {
      this.setState({
        groupsList: formatGroupData(res.result)
      })
    })
  }

  handleTeamsItemClick = (id) => {
    // 创建群
    if (id === 1) {
      this.setState({showAddGroupModal: true})
    }
    // API.post('/user/send_code', {
    //   region: '86',
    //   phone: '13120329553'
    // }).then(res => {
    //   API.post('/user/verify_code', {
    //     region: '86',
    //     phone: '13120329553',
    //     code: '9999'
    //   }).then(res => {
    //     API.post('/user/register', {
    //       nickname: 'lightman3',
    //       password: 'f920123',
    //       verification_token: res.result.verification_token
    //     }).then(res => {
    //       console.log(res)
    //     })
    //   })
    // })
  }
  // 退出
  userLogout = (e) => {
    e.preventDefault()
    API.post('/user/logout').then(res => {
      window.location.href = '/login'
    }).catch(() => {
      window.location.href = '/login'
    })
  }
  
  render() {
    // const {userInfo, sessionsList, friendsList, teamsList} = this.props;
    const teams = [
      {id: 1, img: require('../../assets/images/addTeam.png'), name: '创建高级群'},
      {id: 2, img: require('../../assets/images/searchTeam.png'), name: '搜索高级群'},
    ]
    const addUser = {id: 0, img: require('../../assets/images/addFriend.png'), name: '添加好友'}
    return (
      <div className={styles.leftPanel}>
        <div className={styles.title}>
          <img src={require('../../assets/images/default-icon.png')} alt="" width="56" height="56" className="radius-circle avatar"/>
          <span className={styles.userName}>lightman</span>
          <span><i className={`${styles.cursor} ${'fa fa-pencil'}`}></i></span>
          <a href="/login" onClick={this.userLogout} className={styles.exit}>退出</a>
        </div>
        <div className={styles.switchPanel}>
          <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 1)}}>
            <i className={`${this.state.selectTab === 1 ? 'blue' : 'gray'} ${'fa fa-user-circle'}`}></i>
            <span className={`${this.state.selectTab === 1 ? styles.trangle : ''}`}></span>

          </a>
          <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 2)}}>
          <i className={`${this.state.selectTab === 2 ? 'blue' : 'gray'} ${'fa fa-user'}`}></i>
            <span className={`${this.state.selectTab === 2 ? styles.trangle : ''}`}></span>
          </a>
          <a href="javascript(0):;" onClick={(event) => {this.switchTab(event, 3)}}>
          <i className={`${this.state.selectTab === 3 ? 'blue' : 'gray'} ${'fa fa-users'}`}></i>
            <span className={`${this.state.selectTab === 3 ? styles.trangle : ''}`}></span>
          </a>
        </div>
        <div className={`${styles.item} ${this.state.selectTab === 1 ? '' : 'hide'}`}>
          <PanelList list={this.state.sessionsList}/>
        </div>
        <div className={`${styles.item} ${this.state.selectTab === 2 ? '' : 'hide'}`}>
          <PanelItem item={addUser} onItemClick={this.handleAddFriend}/>
          <PanelList list={this.state.friendsList}/>
        </div>
        <div className={`${styles.item} ${this.state.selectTab === 3 ? '' : 'hide'}`}>
          <ul>
            {teams.map(item => 
              <PanelItem
                item={item}
                key={item.id}
                activeId={this.state.activeId}
                onItemClick={this.handleTeamsItemClick}/>
            )}
          </ul>
          <PanelList list={this.state.groupsList}/>
        </div>
        <div className="">
          {this.state.showAddFriendModal && (<AddFriend onClose={this.closeAddFriendModal} onFriendAll={this.onFriendAll} />)}
          {this.state.showAddGroupModal && (<AddGroup friendsList={this.state.friendsList} onClose={this.closeAddGroupModal} onGetAllGroups={this.getAllGroup}/>)}
        </div>
      </div>
    )
  }
}

export default LeftPanel;