import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class APIClient {
  api: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.api = axios.create({ baseURL, ...config })
  }

  get(url: string, headers: Record<string, Record<string, string>>) {
    return this.api
      .get(url, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  post(url: string, body: object, headers: object) {
    return this.api
      .post(url, body, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  put(url: string, body: object, headers: object) {
    return this.api
      .put(url, body, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
  }

  delete(url: string, headers: object) {
    return this.api
      .delete(url, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export default APIClient
