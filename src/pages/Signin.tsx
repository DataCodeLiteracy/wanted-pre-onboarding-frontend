import axios, { AxiosError } from 'axios'
import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  if (!authContext) {
    return
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
    const SIGNIN_API =
      'https://www.pre-onboarding-selection-task.shop/auth/signin'

    try {
      const res = await axios.post(
        SIGNIN_API,
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

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

  return <Auth sign={'로그인'} signBtn={'로그인'} handleSign={handleSignin} />
}
