import {
  FETCH_SHIFT_ADMIN,
  FETCH_SHIFT_ADMIN_LOAD,
  ADD_SHIFT_START,
  ADD_SHIFT_SUCCESS,
  ADD_SHIFT_FAIL,
  UPDATE_SHIFT_SUCCESS,
  REMOVE_SHIFT_SUCCESS,
  FETCH_SHIFT_GUARD_SUCCESS,
} from './../actions/types'

const initialState = {
  shift: [],
  loading: false,
  submitbtn: false,
  added: false,
  shift_guard: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SHIFT_ADMIN:
      return { ...state, loading: false, shift: action.payload }
    case FETCH_SHIFT_ADMIN_LOAD:
      return { ...state, loading: true }

    case ADD_SHIFT_START:
      return { ...state, submitbtn: true, added: false }
    case ADD_SHIFT_SUCCESS:
      return {
        ...state,
        submitbtn: false,
        added: true,
        shift: [...state.shift, action.payload],
      }

    case UPDATE_SHIFT_SUCCESS:
      const data = state.shift.map((item) => {
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
        submitbtn: false,
        added: true,
        shift: data,
      }

    case REMOVE_SHIFT_SUCCESS:
      const filterData = state.shift.filter((item) => item.id !== action.id)

      return {
        ...state,
        submitbtn: false,
        shift: filterData,
        added: true,
      }
    case ADD_SHIFT_FAIL:
      return {
        ...state,
        submitbtn: false,
      }
    case FETCH_SHIFT_GUARD_SUCCESS:
      return {
        ...state,
        shift_guard: action.payload,
      }
    default:
      return { ...state }
  }
}

export default reducer
