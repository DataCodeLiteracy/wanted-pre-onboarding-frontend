import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'
import useError from '../Hooks/useError'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../reducer/reducers'

export default function Signup() {
  const { email, password } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const { showError } = useError()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const endpoint = '/auth/signup'

    try {
      await AuthApi({ endpoint, email, password })

      window.alert('회원가입이 완료되었습니다!')

      navigate('/signin')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <AuthWrapper>
      <AppHeader
        navigate={navigate}
        isHomeButton={true}
        isSignupButton={false}
        isLogin={true}
      />
      <Auth
        AuthTitle="회원가입"
        AuthButtonText="가입하기"
        handleAuth={handleSignup}
      />
    </AuthWrapper>
  )
}
