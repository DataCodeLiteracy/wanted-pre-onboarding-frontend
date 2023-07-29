import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import AuthApi from '../api/AuthApi'
import AppHeader from '../components/AppHeader'
import { SignWrapper } from '../styles/SignStyle'
import useError from '../Hooks/useError'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  const { showError } = useError()

  if (!authContext) {
    return null
  }

  const { email, password, accessToken, navigate } = authContext

  if (accessToken) {
    navigate('/todo')
  }

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
    <SignWrapper>
      <AppHeader
        navigate={navigate}
        isHomeButton={true}
        isSignupButton={false}
        isLogin={true}
      />
      <Auth title={'회원가입'} signBtn={'가입하기'} handleSign={handleSignup} />
    </SignWrapper>
  )
}
