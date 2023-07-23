import { ReactNode, createContext, useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import localToken from '../api/LocalToken'

export interface AuthContextProps {
  email: string
  password: string
  btnDisabled: boolean
  accessToken: string | null
  isValidEmail: boolean
  isValidPassword: boolean
  navigate: NavigateFunction
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const navigate = useNavigate()

  const accessToken = localToken.get()

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  useEffect(() => {
    setBtnDisabled(!isValidEmail || !isValidPassword)
  }, [isValidEmail, isValidPassword])

  useEffect(() => {
    if (accessToken) {
      navigate('/todo')
    }
  }, [accessToken, navigate])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const contextValue: AuthContextProps = {
    email,
    password,
    btnDisabled,
    accessToken,
    isValidEmail,
    isValidPassword,
    navigate,
    handleEmailChange,
    handlePasswordChange
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
