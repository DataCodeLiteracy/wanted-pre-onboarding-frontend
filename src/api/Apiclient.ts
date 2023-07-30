import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { REQUEST_URL } from './requestUrl'

class APIClient {
  #api: AxiosInstance
  headers: Record<string, string>

  constructor(
    baseURL: string,
    localToken: string,
    config?: AxiosRequestConfig
  ) {
    this.#api = axios.create({ baseURL, ...config })
    this.headers = {
      Authorization: `Bearer ${localToken}`,
      'Content-Type': 'application/json'
    }

    this.#api.defaults.headers.common = this.headers
  }

  get(endpoint: string) {
    return this.#api
      .get(REQUEST_URL + endpoint)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  post(endpoint: string, body: Record<string, string>) {
    return this.#api
      .post(REQUEST_URL + endpoint, body)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  put(endpoint: string, body: Record<string, string | boolean>) {
    return this.#api
      .put(REQUEST_URL + endpoint, body)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  delete(endpoint: string) {
    return this.#api
      .delete(REQUEST_URL + endpoint)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }
}

export default APIClient
