import React, { useEffect } from 'react'
import Auth from '../components/Auth'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localToken.get()

    if (accessToken) {
      navigate('/todo')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthWrapper>
      <Auth title="로그인" buttonText="로그인" />
    </AuthWrapper>
  )
}
