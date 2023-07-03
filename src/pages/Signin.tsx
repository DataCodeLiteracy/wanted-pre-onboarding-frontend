import axios, { AxiosError } from 'axios'
import React, { useContext } from 'react'
import AppHeader from '../components/AppHeader'
import { SignForm, SignTitle, SignWrapper, SignMain } from '../styles/SignStyle'
import { AuthContext, AuthContextProps } from '../context/AuthContext'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  if (!authContext) {
    return
  }

  const {
    email,
    password,
    btnDisabled,
    accessToken,
    navigate,
    handleEmailChange,
    handlePasswordChange
  } = authContext

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

  return (
    <SignWrapper>
      <AppHeader
        navigate={navigate}
        showLogoutButton={false}
        showHomeButton={true}
        showSignupButton={true}
        showSigninButton={false}
      />
      <SignMain>
        <SignTitle>로그인</SignTitle>
        <SignForm onSubmit={handleSignin}>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              data-testid="email-input"
              type="text"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            data-testid="signin-button"
            type="submit"
            disabled={btnDisabled}
          >
            로그인
          </button>
        </SignForm>
      </SignMain>
    </SignWrapper>
  )
}
