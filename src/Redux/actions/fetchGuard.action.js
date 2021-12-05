import { FETCH_GUARD_SUCCESS } from './types'
import httpClient from '../../utils/httpClients'

export const fetchGuard = () => (dispatch) => {
  httpClient.GET('/user/fetch-guard', true, {}).then((out) => {
    dispatch({ type: FETCH_GUARD_SUCCESS, payload: out.data })
  })
}
