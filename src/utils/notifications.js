import { store } from 'react-notifications-component'
const Notification = {
  type: 'danger',
  insert: 'bottom',
  container: 'top-center',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000,
  },
}

function showSuccess(msg) {
  store.addNotification({
    ...Notification,
    title: 'Success',
    type: 'success',
    message: msg,
  })
}
function showWarning(msg) {
  store.addNotification({
    ...Notification,
    title: 'Information',
    type: 'warning',
    message: msg,
  })
}
function showError(msg) {
  store.addNotification({
    ...Notification,
    title: 'Error Occour',
    message: msg,
  })
}

function handleError(err) {
  if (err && err.data) {
    showError(err.data.message)
  }
}
function showInfo(msg) {}
export default {
  showError,
  handleError,
  showWarning,
  showInfo,
  showSuccess,
}
