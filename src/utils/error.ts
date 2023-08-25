import { AxiosError } from 'axios'
import { CHECK_MESSAGE_EMAIL, UNKNOWN_ERROR } from '../utils/message'

export const getErrorMessage = (error: Error | AxiosError | null): string => {
  let errorMessage = UNKNOWN_ERROR

  if (error instanceof AxiosError) {
    error.response?.status === 404
      ? (errorMessage = CHECK_MESSAGE_EMAIL)
      : (errorMessage = error.response?.data.message || UNKNOWN_ERROR)
  } else {
    errorMessage = error?.message || UNKNOWN_ERROR
  }

  return errorMessage
}

const showAlert = (errorMessage: string) => {
  window.alert(errorMessage)
}

export const alertError = (error: Error | AxiosError | null) => {
  const errorMessage = getErrorMessage(error)
  showAlert(errorMessage)
}

// return (error: Error | AxiosError | null) => {
//   const errorMessage = getErrorMessage(error)
//   showAlert(errorMessage)
// }
