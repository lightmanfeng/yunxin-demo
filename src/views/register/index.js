import React from 'react';

import './index.scss';

import API from '../API'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
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
    API.post('/user/send_code', {
      region: '86',
      phone: this.state.phone
    }).then(res => {
      API.post('/user/verify_code', {
        region: '86',
        phone: this.state.phone,
        code: '9999'
      }).then(res => {
        API.post('/user/register', {
          nickname: this.state.name,
          password: this.state.password,
          verification_token: res.result.verification_token
        }).then(res => {
          window.location.href = '/login'
        })
      })
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className="container-login container-register">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <span className="input-tip">
              手机号：
            </span>
            <input type="text" value={this.state.phone} name="phone" onChange={this.handleChange}/>
          </div>
          <div className="row">
            <span className="input-tip">
              昵&nbsp;&nbsp;&nbsp;&nbsp;称：
            </span>
              <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </div>
          <div className="row">
            <span className="input-tip">
              密&nbsp;&nbsp;&nbsp;&nbsp;码：
            </span>
              <input type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
          </div>
          {/* <div className="row">
            <div className="error-msg hide" id="j-errorMsg">密码错误</div>
          </div> */}
          <div className="row tc">
            <input type="submit" className="btn btn-login" value="注册"/>
          </div>
        </form>
        <div className="user-redirect"><a href="/login">已有账号？直接登录</a></div>
      </div>
    )
  }
}

export default Register;
