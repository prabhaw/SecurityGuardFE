import httpClients from '../../utils/httpClients'
import notifications from '../../utils/notifications'
import {
  FETCH_ALL_HOLIDAY,
  ADD_HOLIDAY,
  ADD_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_FAIL,
  REMOVE_HOLIDAY,
  CLOSE_MODAL,
} from './types'

export const fetchHoliday = () => (dispatch) => {
  httpClients
    .GET('/holiday', true, {})
    .then((out) => {
      dispatch({ type: FETCH_ALL_HOLIDAY, payload: out.data })
    })
    .catch((error) => {})
}

export const addHoliday = (data) => (dispatch) => {
  dispatch({ type: ADD_HOLIDAY })
  httpClients
    .POST('/holiday', data, true)
    .then((out) => {
      dispatch({ type: ADD_HOLIDAY_SUCCESS, payload: out.data })
      dispatch({ type: CLOSE_MODAL })
    })
    .catch((error) => {
      dispatch({ type: ADD_HOLIDAY_FAIL })
      notifications.handleError(error.response)
    })
}

export const removeHoliday = (id) => (dispatch) => {
  httpClients
    .REMOVE(`/holiday/${id}`)
    .then((out) => {
      dispatch({ type: REMOVE_HOLIDAY, id: id })
      notifications.showSuccess(out.data.message)
    })
    .catch((error) => {
      notifications.handleError(error.response)
    })
}
