import {
  REQUEST_LEAVE,
  FETCH_LEAVE_BY_GUARD,
  REQUEST_LEAVE_SUCCESS,
  REQUEST_LEAVE_FAIL,
  ACCEPT_LEAVE,
  ACCEPT_LEAVE_FAIL,
  ACCEPT_LEAVE_SUCCESS,
} from './../actions/types'

const initialState = {
  btnloading: false,
  leaves: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAVE_BY_GUARD:
      return { ...state, leaves: action.payload }
    case REQUEST_LEAVE:
      return {
        ...state,
        btnloading: true,
      }
    case REQUEST_LEAVE_SUCCESS:
      return {
        ...state,
        btnloading: false,
        leaves: [action.payload, ...state.leaves],
      }
    case REQUEST_LEAVE_FAIL:
      return {
        ...state,
        btnloading: false,
      }
    case ACCEPT_LEAVE:
      return {
        ...state,
        btnloading: true,
      }
    case ACCEPT_LEAVE_SUCCESS:
      const data_up = state.leaves.map((item) => {
        if (item.id !== action.id) {
          return item
        } else {
          return {
            ...item,
            ...action.payload,
          }
        }
      })
      return {
        ...state,
        btnloading: false,
        leaves: data_up,
      }
    case ACCEPT_LEAVE_FAIL:
      return {
        ...state,
        btnloading: false,
      }

    default:
      return { ...state }
  }
}

export default reducer
