import axios, { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignWrapper, SignTitle, SignMain, SignForm } from '../styles/SignStyle'
import { Button } from '../styles/HeaderStyle'
import AppHeader from '../components/AppHeader'

export default function Signup() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || ''
  )

  const navigate = useNavigate()

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  useEffect(() => {
    setBtnDisabled(!isValidEmail || !isValidPassword)
  }, [email, password])

  useEffect(() => {
    if (accessToken) {
      navigate('/todo')
    }
  }, [accessToken, navigate])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const SIGNUP_API =
      'https://www.pre-onboarding-selection-task.shop/auth/signup'

    try {
      const res = await axios.post(
        SIGNUP_API,
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

      window.alert('회원가입이 완료되었습니다!')

      navigate('/signin')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          window.alert(error.response.data.message)
        }
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <SignWrapper>
      <AppHeader
        navigate={navigate}
        handleLogout={false}
        showHomeButton={true}
        showSignupButton={false}
        showSigninButton={true}
      />
      <SignMain>
        <SignTitle>회원가입</SignTitle>
        <SignForm onSubmit={handleSignup}>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              data-testid="email-input"
              type="text"
              placeholder="이메일 입력"
              autoComplete="on"
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

          <Button
            data-testid="signup-button"
            type="submit"
            disabled={btnDisabled}
          >
            가입하기
          </Button>
        </SignForm>
      </SignMain>
    </SignWrapper>
  )
}
