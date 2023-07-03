import axios, { AxiosError } from 'axios'
import { useContext } from 'react'
import { SignWrapper, SignTitle, SignMain, SignForm } from '../styles/SignStyle'
import { Button } from '../styles/HeaderStyle'
import AppHeader from '../components/AppHeader'
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
      }
    }
  }

  return (
    <SignWrapper>
      <AppHeader
        navigate={navigate}
        showLogoutButton={false}
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
