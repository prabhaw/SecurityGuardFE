import {
  USER_FETCH_SUCCESS,
  ADD_USER_START,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  CLOSE_MODAL,
} from './types'
import httpClients from '../../utils/httpClients'
import notifications from '../../utils/notifications'

export const fetchUsers = () => (dispatch) => {
  httpClients.GET('/user', true, {}).then((out) => {
    dispatch({ type: USER_FETCH_SUCCESS, payload: out.data })
  })
}

export const addUser = (data) => (dispatch) => {
  dispatch({ type: ADD_USER_START })
  httpClients
    .POST('/user', data, true)
    .then((out) => {
      dispatch({ type: CLOSE_MODAL })
      dispatch({ type: ADD_USER_SUCCESS, payload: out.data })
    })
    .catch((err) => {
      console.log(err.response.data)
      notifications.handleError(err.response)
      dispatch({ type: ADD_USER_FAIL })
    })
}
