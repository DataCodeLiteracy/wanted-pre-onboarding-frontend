import { useContext, useState, useEffect } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'

const useError = () => {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { email, password } = authContext

  const [btnDisabled, setBtnDisabled] = useState(false)

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  useEffect(() => {
    setBtnDisabled(!isValidEmail || !isValidPassword)
  }, [isValidEmail, isValidPassword])

  if (!authContext) {
    return null
  }

  return { btnDisabled, isValidEmail, isValidPassword }
}

export default useError
