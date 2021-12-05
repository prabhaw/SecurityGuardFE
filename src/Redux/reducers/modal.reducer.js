import { OPEN_MODAL, CLOSE_MODAL } from './../actions/types'

const initialState = {
  open: false,
  element: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
        element: action.component,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
        component: null,
      }
    default:
      return { ...state }
  }
}

export default reducer
