import { AxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/message'

export const alertError = (() => {
  return (error: Error | AxiosError | null) => {
    let errorMesaage = UNKNOWN_ERROR

    if (error instanceof AxiosError) {
      errorMesaage = error.response?.data.message
    } else {
      errorMesaage = error.message
    }

    window.alert(errorMesaage)
  }
})()
