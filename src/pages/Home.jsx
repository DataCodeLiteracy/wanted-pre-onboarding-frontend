import React from 'react'
import AppHeader from '../components/AppHeader'
import { Title, WhiteShadowTitle, Wrapper, Main } from '../styles/HomeStyle'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <AppHeader
        navigate={navigate}
        handleLogout={false}
        showHomeButton={false}
        showSignupButton={true}
        showSigninButton={true}
      />
      <Main>
        <Title>FRONTEND</Title>
        <WhiteShadowTitle>INTERNSHIP</WhiteShadowTitle>
      </Main>
      <div>Made By DataLiteracy</div>
    </Wrapper>
  )
}
