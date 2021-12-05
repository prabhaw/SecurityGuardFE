import axios from 'axios'

const BaseURL = process.env.REACT_APP_BASE_URL
const http = axios.create({
  baseURL: BaseURL,
  responseType: 'json',
})

const getHeaders = (secure) => {
  let headerOptions = {
    'Content-Type': 'application/json',
  }
  if (secure) {
    headerOptions['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  }
  return headerOptions
}

function GET(url, secure = false, params) {
  return http.get(url, {
    headers: getHeaders(secure),
    params: params,
  })
}

function POST(url, data, secure = true) {
  return http.post(url, data, {
    headers: getHeaders(secure),
    params: {},
  })
}

function PUT(url, data, secure = true) {
  return http.put(url, data, { headers: getHeaders(secure), params: {} })
}
function REMOVE(url, secure = true) {
  return http.delete(url, { headers: getHeaders(secure) })
}

export default {
  GET,
  POST,
  PUT,
  REMOVE,
}
