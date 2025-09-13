import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL } from '@/config/env'
import { RequestOption } from '@/types'

export class HttpClient {
  private axios: AxiosInstance
  private getToken?: () => string | null
  private onUnauthorized?: () => void

  constructor(baseURL: string = API_BASE_URL, getToken?: () => string | null, onUnauthorized?: () => void) {
    this.getToken = getToken
    this.onUnauthorized = onUnauthorized
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })

    this.axios.interceptors.request.use((config) => {
      const token = this.getToken?.()
      if (token) {
        config.headers = config.headers ?? {}
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    })

    this.axios.interceptors.response.use(
      (res: AxiosResponse) => res,
      (err) => {
        if (err?.response?.status === 401) {
          this.onUnauthorized?.()
        }
        return Promise.reject(err)
      }
    )
  }

  get<T>(url: string, cfg?: RequestOption): Promise<T> {
    const config: AxiosRequestConfig = { params: cfg?.params, headers: cfg?.headers, signal: cfg?.signal }
    return this.axios.get<T>(url, config).then((r) => r.data as T)
  }

  post<T>(url: string, data?: any, cfg?: RequestOption): Promise<T> {
    const config: AxiosRequestConfig = { params: cfg?.params, headers: cfg?.headers, signal: cfg?.signal }
    return this.axios.post<T>(url, data, config).then((r) => r.data as T)
  }

  put<T>(url: string, data?: any, cfg?: RequestOption): Promise<T> {
    const config: AxiosRequestConfig = { params: cfg?.params, headers: cfg?.headers, signal: cfg?.signal }
    return this.axios.put<T>(url, data, config).then((r) => r.data as T)
  }

  delete<T>(url: string, cfg?: RequestOption): Promise<T> {
    const config: AxiosRequestConfig = { params: cfg?.params, headers: cfg?.headers, signal: cfg?.signal }
    return this.axios.delete<T>(url, config).then((r) => r.data as T)
  }
}
