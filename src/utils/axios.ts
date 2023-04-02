import axios from 'axios'

export const $axios = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

$axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

$axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)
