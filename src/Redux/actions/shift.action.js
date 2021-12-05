import {
  FETCH_SHIFT_ADMIN,
  FETCH_SHIFT_ADMIN_LOAD,
  ADD_SHIFT_START,
  ADD_SHIFT_SUCCESS,
  ADD_SHIFT_FAIL,
  UPDATE_SHIFT_SUCCESS,
  REMOVE_SHIFT_SUCCESS,
  FETCH_SHIFT_GUARD_SUCCESS,
} from './types'
import httpClinet from './../../utils/httpClients'
import notifications from './../../utils/notifications'

export const fetchShiftByAdmin = (params) => (dispathc) => {
  dispathc({ type: FETCH_SHIFT_ADMIN_LOAD })
  httpClinet
    .GET('/shift', true, params)
    .then((out) => {
      dispathc({ type: FETCH_SHIFT_ADMIN, payload: out.data })
    })
    .catch((err) => {})
}

export const addShiftByAdmin = (data) => (dispatch) => {
  dispatch({ type: ADD_SHIFT_START })
  httpClinet
    .POST('/shift', data, true)
    .then((out) => {
      dispatch({ type: ADD_SHIFT_SUCCESS, payload: out.data })
    })
    .catch((err) => {
      notifications.handleError(err.response)
      dispatch({ type: ADD_SHIFT_FAIL })
    })
}

export const shiftUpdate = (id, data) => (dispatch) => {
  dispatch({ type: ADD_SHIFT_START })
  httpClinet
    .PUT(`/shift/${id}`, data, true)
    .then((out) => {
      dispatch({ type: UPDATE_SHIFT_SUCCESS, payload: out.data, id: id })
    })
    .catch((err) => {
      notifications.handleError(err.response)
      dispatch({ type: ADD_SHIFT_FAIL })
    })
}

export const remvoeShift = (id) => (dispatch) => {
  dispatch({ type: ADD_SHIFT_START })
  httpClinet
    .REMOVE(`/shift/${id}`, true)
    .then((out) => {
      notifications.showSuccess(out.data.message)
      dispatch({ type: REMOVE_SHIFT_SUCCESS, id: id })
    })
    .catch((err) => {
      notifications.handleError(err.response)
      dispatch({ type: ADD_SHIFT_FAIL })
    })
}

export const fetchUserByGuard = () => (dispatch) => {
  httpClinet
    .GET(`/shift/by-guard`, true, {})
    .then((out) => {
      console.log(out.data)
      dispatch({ type: FETCH_SHIFT_GUARD_SUCCESS, payload: out.data })
    })
    .catch((err) => {})
}
