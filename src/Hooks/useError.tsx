import { useState } from 'react'
import { AxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/message'

const useError = () => {
  const [error, setError] = useState<Error | AxiosError | null>(null)

  const showError = (error) => {
    if (error) {
      if (error instanceof AxiosError) {
        window.alert(error.response?.data.message)
      } else {
        window.alert(error.message || UNKNOWN_ERROR)
      }
    }
    setError(error)
  }

  return { error, showError }
}

export default useError
