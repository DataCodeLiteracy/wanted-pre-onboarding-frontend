import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'

const useError = () => {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { email, password } = authContext

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  if (!authContext) {
    return null
  }

  return { isValidEmail, isValidPassword }
}

export default useError
