import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from './../actions/types'

const isLogin =
  !!localStorage.getItem('token') && !!localStorage.getItem('user')

const initilsState = {
  loggedIn: isLogin,
  user: JSON.parse(localStorage.getItem('user')),
  loading_login: false,
  message: null,
}

function reducer(state = initilsState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading_login: true,
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return {
        ...state,
        loading_login: false,
        loggedIn: true,
        user: action.payload.user,
        message: null,
      }
    case LOGIN_FAIL:
      return {
        loading_login: false,
        message: action.payload,
      }
    case LOGOUT_SUCCESS:
      localStorage.clear()
      return {
        ...state,
        user: null,
        loggedIn: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
