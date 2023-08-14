import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class APIClient {
  private readonly api: AxiosInstance
  headers: Record<string, string>
  baseURL: string

  constructor(
    baseURL: string,
    localToken: string,
    config?: AxiosRequestConfig
  ) {
    this.baseURL = baseURL
    this.api = axios.create({ baseURL, ...config })
    this.headers = {
      Authorization: `Bearer ${localToken}`,
      'Content-Type': 'application/json'
    }

    this.api.defaults.headers.common = this.headers
  }

  get(endpoint: string) {
    return this.api
      .get(this.baseURL + endpoint)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }
  post(endpoint: string, body: Record<string, string>) {
    return this.api
      .post(this.baseURL + endpoint, body)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  put(endpoint: string, body: Record<string, string | boolean>) {
    return this.api
      .put(this.baseURL + endpoint, body)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  delete(endpoint: string) {
    return this.api
      .delete(this.baseURL + endpoint)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}

export default APIClient
