import axios from 'axios'

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Content-type': 'application/json',
  },
})

$axios.interceptors.request.use(
  (config) => {
    const storeValue = localStorage.getItem('Authorization')
    if (storeValue) {
      config.headers.Authorization = `Bearer ${storeValue}`
    }

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

// $axios.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response
//   },
//   (error) => {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error)
//   },
// )
