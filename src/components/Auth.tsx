import { useContext } from 'react'
import { SignForm, SignTitle, SignMain, ValidLabel } from '../styles/SignStyle'
import { AuthContext, AuthContextProps } from '../context/AuthContext'

interface AuthProps {
  title: string
  signBtn: string
  handleSign: (e: React.FormEvent<HTMLFormElement>) => void
}

const Auth = ({ title, signBtn, handleSign }: AuthProps) => {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  if (!authContext) {
    return null
  }

  const {
    email,
    password,
    btnDisabled,
    isValidEmail,
    isValidPassword,
    handleEmailChange,
    handlePasswordChange
  } = authContext

  return (
    <SignMain>
      <SignTitle>{title}</SignTitle>
      <SignForm onSubmit={handleSign}>
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
            <ValidLabel htmlFor="email">이메일에 @ 기호가 없습니다.</ValidLabel>
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
            <ValidLabel htmlFor="email">
              비밀번호는 8자 이상이여야 합니다.
            </ValidLabel>
          )}
        </div>

        <button
          data-testid="signin-button"
          type="submit"
          disabled={btnDisabled}
        >
          {signBtn}
        </button>
      </SignForm>
    </SignMain>
  )
}

export default Auth
