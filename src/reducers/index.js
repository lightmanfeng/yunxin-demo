import { combineReducers } from 'redux'
import userInfo from './userInfo'
import showUserInfo from './showUserInfo'

export default combineReducers({
  userInfo,
  showUserInfo
})
