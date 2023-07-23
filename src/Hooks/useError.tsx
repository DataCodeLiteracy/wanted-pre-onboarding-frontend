import { useState } from 'react'
import { AxiosError } from 'axios'

const useError = () => {
  const [error, setError] = useState<Error | AxiosError | null>(null)

  const handleError = (error: Error | AxiosError) => {
    setError(error)
  }

  const showError = (error) => {
    if (error) {
      if (error instanceof AxiosError) {
        window.alert(error.response?.data.message)
      } else {
        console.error(error.message || '알 수 없는 에러가 발생 했습니다')
      }
    }
  }

  return { error, handleError, showError }
}

export default useError
