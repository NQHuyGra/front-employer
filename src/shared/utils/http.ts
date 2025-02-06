import axios from "axios";
import { deleteAuthInfo, getToken } from "./storageUtils";
import { toast } from "react-toastify";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

http.defaults.timeout = 1000 * 60 * 10

http.defaults.withCredentials = true

http.interceptors.request.use(
    (config) => {
        const accessToken = getToken()
  
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
  
        return config
    }, (error) => {
      return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {
        return response
    }, (error) => {

        if (error.response && error.response.status === 401) {
            deleteAuthInfo()
            window.location.href = '/login'
        }

        toast.error(error?.response?.data?.message || error?.message)

      return Promise.reject(error)
    }
)

export default http