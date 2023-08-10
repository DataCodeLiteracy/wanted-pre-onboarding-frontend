import { AxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/message'

export const alertError = (message) => {
  window.alert(message || UNKNOWN_ERROR)
}

export const showError = (error) => {
  if (error) {
    if (error instanceof AxiosError) {
      alertError(error.response?.data.message)
    } else {
      alertError(error.message)
    }
  }
}
