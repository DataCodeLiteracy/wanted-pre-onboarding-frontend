import { AxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/message'

const getErrorMessage = (error: Error | AxiosError | null): string => {
  let errorMessage = UNKNOWN_ERROR

  if (error instanceof AxiosError) {
    errorMessage = error.response?.data.message
  } else {
    errorMessage = error?.message
  }

  return errorMessage
}

const showAlert = (errorMessage: string) => {
  window.alert(errorMessage)
}

export const alertError = (() => {
  return (error: Error | AxiosError | null) => {
    const errorMessage = getErrorMessage(error)
    showAlert(errorMessage)
  }
})()
