import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import localToken from './LocalToken'

type Method = 'get' | 'post' | 'put' | 'delete'
class APIClient {
  private readonly api: AxiosInstance
  headers: Record<string, string | boolean>
  baseURL: string

  constructor(
    baseURL: string,
    headers: Record<string, string | boolean> = {},
    config?: AxiosRequestConfig
  ) {
    this.baseURL = baseURL
    this.headers = headers
    this.api = axios.create({ baseURL, headers })
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request('get', endpoint)
  }

  post<T>(endpoint: string, body: Record<string, string>): Promise<T> {
    return this.request('post', endpoint, body)
  }

  put<T>(endpoint: string, body: Record<string, string | boolean>): Promise<T> {
    return this.request('put', endpoint, body)
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request('delete', endpoint)
  }

  private request<T>(
    method: Method,
    url: string,
    data: Record<string, string | boolean> = {},
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.api
      .request({
        method,
        url,
        data: method === 'post' || method === 'put' ? data : undefined,
        headers: {
          ...this.headers,
          Authorization: `Bearer ${localToken.get()}`,
          'Content-Type': 'application/json'
        },
        ...config
      })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          throw error
        } else {
          throw new AxiosError(error)
        }
      })
  }
}

export default APIClient
