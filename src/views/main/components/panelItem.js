import React from 'react'
import styles from './panelItem.module.scss'

import UserInfo from '../modal/userInfo'

import {connect} from 'react-redux'
import {curUser, showUserInfo} from '../../../actions'

function PanelItem(props) {
  const handleClick = () => {
    props.onItemClick(props.item.id)
    onCurItemClick(props.item)
  }
  const handleShowUserInfo = (e) => {
    e.stopPropagation()
    onShowUserInfo(props.item.id)
  }
  const {onCurItemClick, onShowUserInfo, showModal} = props

  return [
    <li className={`${styles.panel_item} ${props.activeId === props.item.id ? styles.active : ''}`} onClick={handleClick}>
      <div className={styles.panel_avatar}>
        <img onClick={handleShowUserInfo} className={styles.panel_image} src={props.item.img ? props.item.img : require('../../../assets/images/default-icon.png')} alt=""/>
      </div>
      <div className={styles.panel_text}>
        <span>{props.item.name}</span>
        <b>{props.item.time}</b>
      </div>
    </li>,
    <div>
      {showModal.show && showModal.id === props.item.id && <UserInfo/>}
    </div>
  ]
}
function mapStateToProps(state) {
  return {
    currentUserInfo: state.userInfo,
    showModal: state.showUserInfo
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onCurItemClick: (item) => dispatch((curUser(item))),
    onShowUserInfo: (item) => dispatch(showUserInfo(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PanelItem)
