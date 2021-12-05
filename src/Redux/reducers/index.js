import { combineReducers } from 'redux'
import userReducer from './auth.reducer'
import modalReducer from './modal.reducer'
import usersReducer from './user.reducer'
import guardReducer from './fetchGuard.reducer'
import guardFormReducer from './add_guard.reducer'
import adminShift from './shift.reducer'
import leaves from './leave.reducer'
import holiday from './holiday.reducer'

export default combineReducers({
  user: userReducer,
  modal: modalReducer,
  users: usersReducer,
  guard: guardReducer,
  shiftForm: guardFormReducer,
  shiftadmin: adminShift,
  leaves: leaves,
  holiday: holiday,
})
