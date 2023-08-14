import { useContext } from 'react'
import { AuthForm, AuthH1, AuthMain, ValidLabel } from '../styles/AuthStyle'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import { VALID_MESSAGE_EMAIL, VALID_MESSAGE_PASSWORD } from '../utils/message'
import useError from '../Hooks/useError'

interface AuthProps {
  title: string
  buttonText: string
  handleAuth: (e: React.FormEvent<HTMLFormElement>) => void
}

const Auth = ({ title, buttonText, handleAuth }: AuthProps) => {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { email, password, handleEmailChange, handlePasswordChange } =
    authContext

  const { isValidEmail, isValidPassword } = useError()

  const btnDisabled = !isValidEmail || !isValidPassword

  if (!authContext) {
    return null
  }

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
          {!isValidEmail && (
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
          {!isValidPassword && (
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
