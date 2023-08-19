import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthForm, AuthH1, AuthMain, ValidLabel } from '../styles/AuthStyle'
import {
  COMPLETED_SIGN_IN,
  COMPLETED_SIGN_UP,
  VALID_MESSAGE_EMAIL,
  VALID_MESSAGE_PASSWORD
} from '../utils/message'
import localToken from '../api/LocalToken'
import { signInUser, signUpUser } from '../api/AuthApi'
import { alertError } from '../utils/error'
import { isValidEmail, isValidPassword } from '../utils/validation'

interface AuthProps {
  title: string
  buttonText: string
}

const Auth = ({ title, buttonText }: AuthProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const path = window.location.pathname

    try {
      if (path === '/signup') {
        await signUpUser({ email, password })
        window.alert(COMPLETED_SIGN_UP)
      }

      if (path === '/signin') {
        const res = await signInUser({ email, password })

        const { access_token } = res

        const saveToken = (token: string) => {
          localToken.save(token)
        }

        if (access_token) {
          saveToken(access_token)
        }

        window.alert(COMPLETED_SIGN_IN)
      }

      navigate(path === '/signup' ? '/signin' : '/todo')
    } catch (error) {
      alertError(error)
    }
  }

  const validEmail = isValidEmail(email)
  const validPassword = isValidPassword(password)

  const btnDisabled = !validEmail || !validPassword

  return (
    <AuthMain>
      <AuthH1>{title}</AuthH1>
      <AuthForm onSubmit={handleAuth}>
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
          {!validEmail && (
            <ValidLabel htmlFor="email">{VALID_MESSAGE_EMAIL}</ValidLabel>
          )}
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
          {!validPassword && (
            <ValidLabel htmlFor="email">{VALID_MESSAGE_PASSWORD}</ValidLabel>
          )}
        </div>

        <button
          data-testid="signin-button"
          type="submit"
          disabled={btnDisabled}
        >
          {buttonText}
        </button>
      </AuthForm>
    </AuthMain>
  )
}

export default Auth
