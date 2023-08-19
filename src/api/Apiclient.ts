import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
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

  get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.request('get', endpoint)
  }

  post<T>(
    endpoint: string,
    body: Record<string, string>
  ): Promise<AxiosResponse<T>> {
    return this.request('post', endpoint, body)
  }

  put<T>(
    endpoint: string,
    body: Record<string, string | boolean>
  ): Promise<AxiosResponse<T>> {
    return this.request('put', endpoint, body)
  }

  delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.request('delete', endpoint)
  }

  private request(
    method: Method,
    url: string,
    data: Record<string, string | boolean> = {},
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
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
