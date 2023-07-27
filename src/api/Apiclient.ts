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
      Authorization: `Bearer ${localToken}`
    }

    this.#api.defaults.headers.common = this.headers
  }

  get(endpoint: string, headers: Record<string, string>) {
    return this.#api
      .get(REQUEST_URL + endpoint, { ...this.headers, ...headers })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  post(
    endpoint: string,
    body: Record<string, string>,
    headers: Record<string, string>
  ) {
    return this.#api
      .post(REQUEST_URL + endpoint, body, { ...this.headers, ...headers })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  put(
    endpoint: string,
    body: Record<string, string | boolean>,
    headers: Record<string, string>
  ) {
    return this.#api
      .put(REQUEST_URL + endpoint, body, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
  }

  delete(endpoint: string, headers: Record<string, string>) {
    return this.#api
      .delete(REQUEST_URL + endpoint, { ...this.headers, ...headers })
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export default APIClient
