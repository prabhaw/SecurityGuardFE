import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-notifications-component/dist/theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ApplicationRoute from './Routes/Application.route'
import store from './Redux/store'
import PopModal from './Components/Modal'
import ReactNotifications from 'react-notifications-component'

ReactDOM.render(
  <Provider store={store}>
    <ReactNotifications />
    <BrowserRouter>
      <ApplicationRoute />
      <PopModal />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
