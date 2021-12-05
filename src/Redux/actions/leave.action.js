import { notification } from 'antd'
import httpClients from '../../utils/httpClients'
import notifications from '../../utils/notifications'
import {
  REQUEST_LEAVE,
  FETCH_LEAVE_BY_GUARD,
  REQUEST_LEAVE_SUCCESS,
  REQUEST_LEAVE_FAIL,
  CLOSE_MODAL,
  ACCEPT_LEAVE,
  ACCEPT_LEAVE_FAIL,
  ACCEPT_LEAVE_SUCCESS,
} from './types'

export const fetchLeaveByGuard = () => (dispatch) => {
  httpClients
    .GET('/day-off', true, {})
    .then((out) => {
      dispatch({ type: FETCH_LEAVE_BY_GUARD, payload: out.data })
    })
    .catch((error) => {})
}
export const fetchLeaveByAdmin = () => (dispatch) => {
  httpClients
    .GET('/day-off/admin', true, {})
    .then((out) => {
      dispatch({ type: FETCH_LEAVE_BY_GUARD, payload: out.data })
    })
    .catch((error) => {})
}
export const requestLeave = (data) => (dispatch) => {
  dispatch({ type: REQUEST_LEAVE })
  httpClients
    .POST('/day-off', data, true)
    .then((out) => {
      dispatch({ type: REQUEST_LEAVE_SUCCESS, payload: out.data })
      dispatch({ type: CLOSE_MODAL })
    })
    .catch((error) => {
      notifications.handleError(error.response)
      dispatch({ type: REQUEST_LEAVE_FAIL })
    })
}

export const acceptLeave = (id, data) => (dispatch) => {
  dispatch({ type: ACCEPT_LEAVE })
  httpClients
    .PUT(`/day-off/${id}`, data, true)
    .then((out) => {
      dispatch({ type: ACCEPT_LEAVE_SUCCESS, id: id, payload: out.data })
      notifications.showSuccess('Leave Accepted.')
    })
    .catch((error) => {
      dispatch({ type: ACCEPT_LEAVE_FAIL })
      notifications.handleError(error.response)
    })
}
