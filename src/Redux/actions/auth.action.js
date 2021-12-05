import httpClients from '../../utils/httpClients'
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types'

export const login_user = (data) => (dispatch) => {
  dispatch({ type: LOGIN })
  httpClients
    .POST('/auth/login', data, false)
    .then((output) => {
      dispatch({ type: LOGIN_SUCCESS, payload: output.data })
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message })
    })
}

export const logout_user = (navigate) => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS })
}
