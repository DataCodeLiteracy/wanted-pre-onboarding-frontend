import React, { useContext, useEffect } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import useError from '../Hooks/useError'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
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

    const endpoint = '/auth/signin'

    try {
      const res = await AuthApi({ endpoint, email, password })

      const { access_token } = res.data
      if (access_token) {
        saveToken(access_token)
        navigate('/todo')
      }

      window.alert('로그인이 완료되었습니다!')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <AuthWrapper>
      <AppHeader />
      <Auth
        AuthTitle="로그인"
        AuthButtonText="로그인"
        handleAuth={handleSignin}
      />
    </AuthWrapper>
  )
}
