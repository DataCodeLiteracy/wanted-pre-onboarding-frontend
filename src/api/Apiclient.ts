import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import localToken from './LocalToken'

type Method = 'get' | 'post' | 'put' | 'delete'
class APIClient {
  private readonly api: AxiosInstance
  headers: Record<string, string>
  baseURL: string

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.baseURL = baseURL
    this.api = axios.create({ baseURL })
  }

  get(endpoint: string) {
    return this.request('get', endpoint)
  }

  post(endpoint: string, body: Record<string, string>) {
    return this.request('post', endpoint, body)
  }

  put(endpoint: string, body: Record<string, string | boolean>) {
    return this.request('put', endpoint, body)
  }

  delete(endpoint: string) {
    return this.request('delete', endpoint)
  }

  private request(
    method: Method,
    url: string,
    data: Record<string, string | boolean> = {},
    config?: AxiosRequestConfig
  ) {
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
      .then((res) => res)
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
