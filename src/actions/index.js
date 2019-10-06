export const curUser = user => {
  return {
    type: 'CUR_USER',
    user
  }
}

export const showUserInfo = id => {
  return {
    type: 'SHOW_USERINFO',
    id
  }
}