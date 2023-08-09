import { useContext, useEffect } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import { authUser } from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import useError from '../Hooks/useError'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { showError } = useError()

  const navigate = useNavigate()

  const { email, password, accessToken } = authContext

  useEffect(() => {
    if (accessToken) {
      navigate('/todo')
    }
  }, [])

  if (!authContext) {
    return null
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await authUser('/signup', { email, password })

      window.alert('회원가입이 완료되었습니다!')

      navigate('/signin')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <AuthWrapper>
      <AppHeader />
      <Auth
        AuthTitle="회원가입"
        AuthButtonText="가입하기"
        handleAuth={handleSignup}
      />
    </AuthWrapper>
  )
}
