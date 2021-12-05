import {
  USER_FETCH_SUCCESS,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_START,
} from './../actions/types'

const intitalState = {
  users: [],
  loading: false,
}

function reducer(state = intitalState, action) {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return {
        users: action.payload,
      }
    case ADD_USER_START:
      return {
        ...state,
        loading: true,
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload, ...state.users],
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
      }

    default:
      return { ...state }
  }
}

export default reducer
