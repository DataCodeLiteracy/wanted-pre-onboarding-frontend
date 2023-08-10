import { ReactNode, createContext, useState } from 'react'
import localToken from '../api/LocalToken'

export interface AuthContextProps {
  email: string
  password: string
  accessToken: string | null
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = localToken.get()

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
    accessToken,
    handleEmailChange,
    handlePasswordChange
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
