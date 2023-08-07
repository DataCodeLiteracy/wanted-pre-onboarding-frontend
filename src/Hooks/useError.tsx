import { useState } from 'react'
import { AxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/message'

const useError = () => {
  const [error, setError] = useState<Error | AxiosError | null>(null)

  const alertError = (message) => {
    window.alert(message || UNKNOWN_ERROR)
  }

  const showError = (error) => {
    if (error) {
      if (error instanceof AxiosError) {
        alertError(error.response?.data.message)
      } else {
        alertError(error.message)
      }
    }
    setError(error)
  }

  return { error, showError, alertError }
}

export default useError
