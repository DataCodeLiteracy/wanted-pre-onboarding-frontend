import { AxiosError } from 'axios'

export const alertError = (error: Error | AxiosError | null) => {
  window.alert(error)
}
