import React from 'react'
import ReactDom from 'react-dom'

import API from '../../API/index'

class AddGroup extends React.Component {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
    this.state = {
      addedLists: [],
      groupName: ''
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  groupNameChange = (e) => {
    this.setState({
      groupName: e.target.value
    })
  }

  addGroup = () => {
    let ids = this.state.addedLists.map(v => v.id)
    ids.unshift(sessionStorage.userId)
    API.post('/group/create', {
      name: this.state.groupName,
      memberIds: ids,
      portraitUri: 'https://app.yunxin.163.com/webdemo/im/images/advanced.png'
    }).then(res => {
      if (res.code === 200 && res.result.id) {
        this.props.onGetAllGroups()
      }
    })
  }

  handleCheckChange = (e) => {
    const target = e.target
    const item = JSON.parse(target.dataset.friend)
    let lists
    if (target.checked) {
      lists = this.state.addedLists
      lists.push(item)
    } else {
      lists = this.state.addedLists.filter(list => list.id !== item.id)
    }
    this.setState({
      addedLists: lists
    })
  }

  render() {
    return ReactDom.createPortal(
      <div className="mask">
        <div className="modal-default add-group">
          <div className="title-default box-sizing">添加成员
            <i className="icon-close fa fa-close" onClick={this.props.onClose}></i>
          </div>
          <div className="group-name">
            <input type="text" placeholder="请输入群名称" name="groupName" onChange={this.groupNameChange}/>
          </div>
          <div className="content">
            <div className="user-list box-sizing">
              <ul className="box-sizing">
                {
                  this.props.friendsList.map(item => 
                    <li key={item.id}>
                      <input type="checkbox" id={item.id} data-friend={JSON.stringify(item)} onChange={this.handleCheckChange}/>
                      <label htmlFor={item.id}>
                      <img src={item.img ? item.img : require('../../../assets/images/default-icon.png')} alt="" />
                      <span>{item.name}</span>
                      </label>
                    </li>
                  )
                }
              </ul>
            </div>
            <div className="added-list">
              <p className="added-info">已添加{this.state.addedLists.length}人</p>
              <ul>
                {
                  this.state.addedLists.map(list =>
                    <li key={list.id}>
                      <img src={list.img ? list.img : require('../../../assets/images/default-icon.png')} alt="" />
                      <p>{list.name}</p>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className="btns-default">
            <button className="btn btn-cancel" onClick={this.props.onClose}>取消</button>
            <button className="btn btn-ok" disabled={this.state.addedLists.length === 0 || !this.state.groupName} onClick={this.addGroup}>确定</button>
          </div>
        </div>
      </div>,
      this.container
    )
  }
}

export default AddGroup