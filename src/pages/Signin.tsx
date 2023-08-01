import React from 'react'
import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import useError from '../Hooks/useError'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../reducer/reducers'
import { AppDispatch } from '../app/store'
import { setAccessToken } from '../reducer/authSlice'

export default function Signup() {
  const { email, password } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()

  const { showError } = useError()

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
        dispatch(setAccessToken(localToken.get()))
        navigate('/todo')
        window.alert('로그인이 완료되었습니다.')
      }
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
