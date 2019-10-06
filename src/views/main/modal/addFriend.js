import React from 'react'
import ReactDom from 'react-dom'

import API from '../../API/index'

class AddFriend extends React.Component {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
    this.state = {
      phone: '',
      searchResult: false, // 是否搜索结果
      userInfo: null,
      finishAdd: false
    }
  }

  phoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    })
  }
  // 继续搜索
  resetSearch = () => {
    this.setState({
      searchResult: false,
      phone: ''
    })
    document.getElementById('add-user').value = ''
  }
  // 查看用户信息
  searchUserInfo = () => {
    API.get(`/user/find/86/${this.state.phone}`).then(res => {
      this.setState({
        searchResult: true,
        userInfo: res.result
      })
    })
  }
  // 发起添加好友
  friendInvite = () => {
    API.post('/friendship/invite', {
      'friendId': this.state.userInfo.id,
      'message': `你好，我是${sessionStorage.userId}`
    }).then(res => {
      if (res.code === 200 && res.result) {
        if (res.result.action === 'AddDirectly') {
          this.setState({
            finishAdd: true
          })
          this.props.onFriendAll()
        }
      }
    })
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  render() {
    return ReactDom.createPortal(
      <div className="mask">
        <div className="modal-default add-friend">
          <div className="title-default box-sizing">添加好友
            <i className="icon-close fa fa-close" onClick={this.props.onClose}></i>
          </div>
          <div className="content">
            <input id="add-user" type="text" placeholder="请输入账号" className={`${'add-input'} ${(this.state.searchResult || this.state.finishAdd) ? 'hide' : ''}`} name="phone" onChange={this.phoneChange}/>
            <div className={`${'user-info'} ${(this.state.searchResult && !this.state.finishAdd) ? '' : 'hide'}`}>
              <img src={require('../../../assets/images/default-icon.png')} alt=""/>
              <div className="user-desc">
                <p>昵称：{this.state.userInfo && this.state.userInfo.nickname}</p>
                <p>账号：{this.state.phone}</p>
              </div>
            </div>
            <div className={`${this.state.finishAdd ? '' : 'hide'}`}>
              添加好友成功！
            </div>
          </div>
          <div className="btns-default">
            {!this.state.searchResult && !this.state.finishAdd && <button className="btn btn-cancel" onClick={this.props.onClose}>取消</button>}
            {!this.state.searchResult && !this.state.finishAdd && <button className="btn btn-ok" onClick={this.searchUserInfo}>确定</button>}
            {this.state.searchResult && <button className="btn btn-cancel" onClick={this.resetSearch}>继续搜索</button>}
            {this.state.searchResult && !this.state.finishAdd && <button className="btn btn-ok" onClick={this.friendInvite}>加为好友</button>}
            {this.state.finishAdd && <button className="btn btn-ok" onClick={this.props.onClose}>完成</button>}
          </div>
        </div>
      </div>,
      this.container
    )
  }
}

export default AddFriend