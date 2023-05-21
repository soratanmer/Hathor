import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import Cookies from 'js-cookie'

const service: AxiosInstance = axios.create({
  baseURL: String(import.meta.env.VITE_APP_NETEASE_API),
  withCredentials: true,
  timeout: 15000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.params) {
      config.params = {}
    }

    config.params.Cookies = `MUSIC_U=${Cookies.get('MUSIC_U')};`
    config.params.realIP = '116.25.146.177'

    return config
  },
  (axiosRequestError: AxiosError) => {
    return Promise.reject(axiosRequestError)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (axiosResponseError: AxiosError) => {
    return Promise.reject(axiosResponseError)
  }
)

export default service
