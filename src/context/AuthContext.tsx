import { ReactNode, createContext, useState, useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export interface AuthContextProps {
  email: string
  password: string
  btnDisabled: boolean
  accessToken: string | null
  navigate: NavigateFunction
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const accessToken = localStorage.getItem('access_token')
  const navigate = useNavigate()

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  useEffect(() => {
    setBtnDisabled(!isValidEmail || !isValidPassword)
  }, [email, password])

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
    navigate,
    handleEmailChange,
    handlePasswordChange
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
