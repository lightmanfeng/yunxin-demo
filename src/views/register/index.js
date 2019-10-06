import React from 'react';

import './index.scss';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
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
    event.preventDefault()
  }

  render() {
    return (
      <div className="container-login container-register">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <span className="input-tip">
              账号：
            </span>
            <input type="text" value={this.state.account} name="account" onChange={this.handleChange}/>
          </div>
          <div className="row">
            <span className="input-tip">
              昵称：
            </span>
              <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
          </div>
          <div className="row">
            <span className="input-tip">
              密码：
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
