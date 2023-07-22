import { AxiosError } from 'axios'
import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import { REQUEST_URL } from '../api/requestUrl'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { SignWrapper } from '../styles/SignStyle'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  if (!authContext) {
    return null
  }

  const { email, password, accessToken, navigate } = authContext

  if (accessToken) {
    navigate('/todo')
  }

  const saveToken = (token: string) => {
    localStorage.setItem('access_token', token)
  }

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const SIGNIN_API = REQUEST_URL + '/auth/signin'

    try {
      const res = await AuthApi({ SIGN: SIGNIN_API, email, password })

      const { access_token } = res.data
      if (access_token) {
        saveToken(access_token)
        navigate('/todo')
      }

      window.alert('로그인이 완료되었습니다!')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          window.alert(error.response.data.message)
        } else if (error.response?.status === 401) {
          window.alert(error.response.data.message)
        }
      }
    }
  }

  return (
    <SignWrapper>
      <AppHeader
        navigate={navigate}
        isHomeButton={true}
        isSignupButton={true}
        isLogin={true}
      />
      <Auth title={'로그인'} signBtn={'로그인'} handleSign={handleSignin} />
    </SignWrapper>
  )
}
