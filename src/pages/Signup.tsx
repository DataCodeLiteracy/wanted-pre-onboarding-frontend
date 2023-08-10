import { useContext, useEffect } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import { authUser } from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import useError from '../Hooks/useError'
import { useNavigate } from 'react-router-dom'
import { COMPLETED_SIGN_UP } from '../utils/message'

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

      window.alert(COMPLETED_SIGN_UP)

      navigate('/signin')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <AuthWrapper>
      <AppHeader />
      <Auth title="회원가입" buttonText="가입하기" handleAuth={handleSignup} />
    </AuthWrapper>
  )
}
