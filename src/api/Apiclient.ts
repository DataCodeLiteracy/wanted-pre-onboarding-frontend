import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

class APIClient {
  private readonly api: AxiosInstance
  headers: Record<string, string>
  baseURL: string

  constructor(
    baseURL: string,
    localToken?: string,
    config?: AxiosRequestConfig
  ) {
    this.baseURL = baseURL
    this.api = axios.create({ baseURL, ...config })
    this.headers = {
      Authorization: `Bearer ${localToken}`,
      'Content-Type': 'application/json'
    }

    this.api.defaults.headers.common = this.headers

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          throw error
        } else {
          throw new AxiosError(error)
        }
      }
    )
  }

  get(endpoint: string) {
    return this.api.get(endpoint)
  }

  post(endpoint: string, body: Record<string, string>) {
    return this.api.post(endpoint, body)
  }

  put(endpoint: string, body: Record<string, string | boolean>) {
    return this.api.put(endpoint, body)
  }

  delete(endpoint: string) {
    return this.api.delete(endpoint)
  }

  setToken(localToken: string) {
    this.api.defaults.headers.common = {
      ...this.api.defaults.headers.common,
      Authorization: `Bearer ${localToken}`
    }
  }
}

export default APIClient
