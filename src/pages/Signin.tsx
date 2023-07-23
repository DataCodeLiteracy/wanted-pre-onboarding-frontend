import { AxiosError } from 'axios'
import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { SignWrapper } from '../styles/SignStyle'
import localToken from '../api/LocalToken'

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
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          window.alert(error.response.data.message)
        } else if (error.response?.status === 401) {
          window.alert(error.response.data.message)
        }
      } else {
        console.error(error.message || '알 수 없는 에러가 발생 했습니다')
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
