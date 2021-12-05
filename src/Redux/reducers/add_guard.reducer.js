import { ADD_GUARD_INITIAL } from './../actions/types'

const initilaState = {
  data: {
    user_id: '',
    shift_date: '',
    shift_number: '',
    is_holiday: false,
    user_num: '',
    site: '',
    name_holiday: '',
    shift_id: null,
  },
}

function reducer(state = initilaState, action) {
  switch (action.type) {
    case ADD_GUARD_INITIAL:
      console.log('INSERT', action.payload)
      return { ...state, data: action.payload }
    default:
      return { ...state }
  }
}

export default reducer
