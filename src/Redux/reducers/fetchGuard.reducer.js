import { FETCH_GUARD_SUCCESS } from './../actions/types'

const initialState = {
  guards: [],
}

function redcer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GUARD_SUCCESS:
      return { ...state, guards: action.payload }
    default:
      return { ...state }
  }
}

export default redcer
