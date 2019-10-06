import React from 'react';

import styles from './index.module.scss'
import API from '../API/index'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    API.post('/user/login', {
      region: '86',
      phone: this.state.name,
      password: this.state.password
    }).then(res => {
      if (res.code === 200 && res.result.id) {
        sessionStorage.userId = res.result.id
      }
      window.location.href = '/main'
    }).catch(e => {
    })
    event.preventDefault()

  }

  render() {
    return (
      <div className={styles['container-login']}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.row}>
            <span className={styles.icon}>
              <i className={`${styles.fa} ${'fa fa-user'}`}></i>
            </span>
            <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </div>
          <div className={styles.row}>
            <span className={styles.icon}>
              <i className={`${styles.fa} ${'fa fa-lock'}`}></i>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </span>
          </div>
          <div className={styles.row}>
            <div className={`${styles['error-msg']} ${styles.hide}`}>密码错误</div>
          </div>
          <div className={styles.row}>
            <input type="submit" className={`${styles.btn} ${styles['btn-login']}`} vlaue="登录"/>
          </div>
        </form>
        <div className={styles['user-redirect']}><a href="/register">注册</a></div>
      </div>
    )
  }
}

export default Login;
