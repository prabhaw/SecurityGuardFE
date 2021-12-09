import {
  ADD_SUR_HOUR,
  ADD_SUR_SUCCESS,
  ADD_SUR_FAIL,
  UPDATE_SUR,
  UPDATE_SUR_SUCCESS,
  FETCH_SUR,
  CLOSE_MODAL,
} from './types'
import httpClient from './../../utils/httpClients'
import notifications from './../../utils/notifications'

export const fetch_sur = (date) => (dispatch) => {
  httpClient
    .GET('/surcharge', true, { date: date })
    .then((out) => {
      dispatch({ type: FETCH_SUR, payload: out.data })
    })
    .catch((err) => {})
}

export const add_sur = (data) => (dispatch) => {
  dispatch({ type: ADD_SUR_HOUR })
  httpClient
    .POST('/surcharge', data, true)

    .then((out) => {
      dispatch({ type: ADD_SUR_SUCCESS, payload: out.data })
      dispatch({ type: CLOSE_MODAL })
    })

    .catch((err) => {
      dispatch({ type: ADD_SUR_FAIL })
      notifications.handleError(err.response)
    })
}

export const update_sur = (id, data) => (dispatch) => {
  dispatch({ type: UPDATE_SUR })
  httpClient
    .PUT(`/surcharge/${id}`, data, true)
    .then((out) => {
      dispatch({ type: UPDATE_SUR_SUCCESS, id: id, payload: out.data })
      dispatch({ type: CLOSE_MODAL })
    })
    .catch((err) => {
      dispatch({ type: ADD_SUR_FAIL })
      notifications.handleError(err.response)
    })
}
