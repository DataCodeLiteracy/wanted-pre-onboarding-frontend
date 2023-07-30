import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import useError from '../Hooks/useError'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { showError } = useError()

  if (!authContext) {
    return null
  }

  const { email, password, accessToken, navigate } = authContext

  if (accessToken) {
    navigate('/todo')
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
      <AppHeader
        navigate={navigate}
        isHomeButton={true}
        isSignupButton={true}
        isLogin={true}
      />
      <Auth
        AuthTitle="로그인"
        AuthButtonText="로그인"
        handleAuth={handleSignin}
      />
    </AuthWrapper>
  )
}
