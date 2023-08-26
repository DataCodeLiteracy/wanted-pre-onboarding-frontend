import React from 'react'
import Auth from '../components/Auth'
import { AuthWrapper } from '../styles/AuthStyle'

export default function SignIn() {
  return (
    <AuthWrapper>
      <Auth title="로그인" buttonText="로그인" />
    </AuthWrapper>
  )
}
