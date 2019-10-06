export const curUser = user => {
  return {
    type: 'CUR_USER',
    user
  }
}

export const showUserInfo = (id) => {
  return {
    type: 'SHOW_USERINFO',
    id
  }
}

export const msgsInfo = (msgInfo) => {
  return {
    type: 'ADD_MSG',
    msgInfo
  }
}

export const personInfo = (person) => {
  return {
    type: 'PERSONAL',
    person
  }
}