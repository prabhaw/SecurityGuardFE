import { OPEN_MODAL, CLOSE_MODAL } from './types'

export const openModal = (component) => (dispatch) => {
  dispatch({ type: OPEN_MODAL, component })
}

export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL })
}
