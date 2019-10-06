import React from 'react'

import styles from './msgItem.module.scss'

function MsgItemMe(props) {
  return (
    <div className={`${styles.item} ${styles.itemMe}`}>
      <div className={styles.msg}>
        <div className={styles.msgText}>
          <div className={styles.box}>{props.msgInfo.text}</div>
        </div>
      </div>
      <img className={styles.img} src={props.msgInfo.img ? props.magInfo.img : require('../../../assets/images/default-icon.png')} alt=""/>
    </div>
  )
}

export default MsgItemMe