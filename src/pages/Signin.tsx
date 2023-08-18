import React from 'react'
import Auth from '../components/Auth'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'

export default function Signin() {
  return (
    <AuthWrapper>
      <AppHeader />
      <Auth title="로그인" buttonText="로그인" />
    </AuthWrapper>
  )
}
