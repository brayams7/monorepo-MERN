import { getToken } from "@/lib/cookies"
import axios from "axios"
// import { publicRoutes } from "@/core/contants/routes"

const API_BASE_URL = import.meta.env.VITE_URL_BASE
const VITE_URI_API = import.meta.env.VITE_URI_API

export const api = axios.create({
  baseURL: API_BASE_URL + VITE_URI_API,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  function (config) {
    const token = getToken() as string
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if(error.response?.status === 401){
      // removeToken()
      // window.location.href = `/${publicRoutes.AUTH}`
    }

    return Promise.reject(error)
  }
)
