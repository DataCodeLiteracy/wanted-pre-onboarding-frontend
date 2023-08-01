import { useState, useEffect } from 'react'
import { AuthForm, AuthH1, AuthMain, ValidLabel } from '../styles/AuthStyle'
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken, setEmail, setPassword } from '../reducer/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../reducer/reducers'
import { AppDispatch } from '../app/store'
import localToken from '../api/LocalToken'
interface AuthProps {
  AuthTitle: string
  AuthButtonText: string
  handleAuth: (e: React.FormEvent<HTMLFormElement>) => void
}

const Auth = ({ AuthTitle, AuthButtonText, handleAuth }: AuthProps) => {
  const { email, password, accessToken } = useSelector(
    (state: RootState) => state.auth
  )
  const [btnDisabled, setBtnDisabled] = useState(false)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const isValidEmail = email.indexOf('@') !== -1
  const isValidPassword = password.length >= 8

  useEffect(() => {
    setBtnDisabled(!isValidEmail || !isValidPassword)
  }, [isValidEmail, isValidPassword])

  useEffect(() => {
    dispatch(setAccessToken(localToken.get()))

    if (accessToken) {
      navigate('/todo')
    }
  }, [dispatch, accessToken, navigate])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEmail(e.target.value))
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(setPassword(e.target.value))
  }

  return (
    <AuthMain>
      <AuthH1>{AuthTitle}</AuthH1>
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
          {AuthButtonText}
        </button>
      </AuthForm>
    </AuthMain>
  )
}

export default Auth
