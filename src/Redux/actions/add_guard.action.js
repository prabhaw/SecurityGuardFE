import httpClients from '../../utils/httpClients'
import notifications from '../../utils/notifications'
import { ADD_GUARD_INITIAL } from './types'

export const setGuardValue = (data) => (dispatch) => {
  httpClients
    .GET(`/holiday/holiday`, true, { date: data.shift_date })
    .then((out) => {
      dispatch({
        type: ADD_GUARD_INITIAL,
        payload: {
          ...data,
          is_holiday: !!out.data,
          name_holiday: out.data?.name_holiday,
        },
      })
    })
    .catch((error) => {})
}
