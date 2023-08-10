import { ReactNode, createContext, useState, useEffect } from 'react'
import localToken from '../api/LocalToken'
import { useNavigate } from 'react-router-dom'

export interface AuthContextProps {
  email: string
  password: string
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const path = window.location.pathname

  useEffect(() => {
    const accessToken = localToken.get()
    const authPath = ['/signin', '/signup']

    if (accessToken) {
      if (authPath.includes(path)) {
        navigate('/todo')
      }
    }
  }, [path, navigate])

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
    handleEmailChange,
    handlePasswordChange
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
