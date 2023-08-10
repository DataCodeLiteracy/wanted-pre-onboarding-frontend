import React, { useContext, useEffect } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import useError from '../Hooks/useError'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../api/AuthApi'
import { COMPLETED_SIGN_IN } from '../utils/message'

export default function Signin() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { showError } = useError()

  const navigate = useNavigate()

  const { email, password, accessToken } = authContext

  useEffect(() => {
    if (accessToken) {
      navigate('/todo')
    }
  }, [])

  if (!authContext) {
    return null
  }

  const saveToken = (token: string) => {
    localToken.save(token)
  }

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await authUser('/signin', { email, password })

      const { access_token } = res
      if (access_token) {
        saveToken(access_token)
        navigate('/todo')
      }

      window.alert(COMPLETED_SIGN_IN)
    } catch (error) {
      showError(error)
    }
  }

  return (
    <AuthWrapper>
      <AppHeader />
      <Auth title="로그인" buttonText="로그인" handleAuth={handleSignin} />
    </AuthWrapper>
  )
}
