import {
  FETCH_ALL_HOLIDAY,
  ADD_HOLIDAY,
  ADD_HOLIDAY_SUCCESS,
  ADD_HOLIDAY_FAIL,
  REMOVE_HOLIDAY,
} from './../actions/types'

const initialState = {
  holidays: [],
  loading: false,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_HOLIDAY:
      return {
        ...state,
        holidays: action.payload,
      }
    case ADD_HOLIDAY:
      return {
        ...state,
        loading: true,
      }
    case ADD_HOLIDAY_SUCCESS:
      return {
        ...state,
        loading: false,
        holidays: [...state.holidays, action.payload],
      }
    case ADD_HOLIDAY_FAIL:
      return {
        ...state,
        loading: false,
      }
    case REMOVE_HOLIDAY:
      const removeData = state.holidays.filter((item) => item.id !== action.id)
      return {
        ...state,
        holidays: removeData,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
