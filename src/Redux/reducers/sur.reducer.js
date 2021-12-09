import {
  ADD_SUR_HOUR,
  ADD_SUR_SUCCESS,
  ADD_SUR_FAIL,
  UPDATE_SUR,
  UPDATE_SUR_SUCCESS,
  FETCH_SUR,
} from './../actions/types'

const initialState = {
  sur_hour: [],
  loading: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUR:
      return {
        ...state,
        sur_hour: action.payload,
      }

    case ADD_SUR_HOUR:
      return {
        ...state,
        loading: true,
      }
    case ADD_SUR_SUCCESS:
      return {
        ...state,
        loading: false,
        sur_hour: [action.payload, ...state.sur_hour],
      }

    case ADD_SUR_FAIL:
      return {
        ...state,
        loading: false,
      }

    case UPDATE_SUR:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_SUR_SUCCESS:
      const updated_sur = state.sur_hour.map((item) => {
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
        loading: false,
        sur_hour: updated_sur,
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
