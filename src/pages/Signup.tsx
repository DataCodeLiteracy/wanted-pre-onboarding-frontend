import { AxiosError } from 'axios'
import { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../context/AuthContext'
import Auth from '../components/Auth'
import { REQUEST_URL } from '../api/requestUrl'
import AuthApi from '../api/AuthApi'

export default function Signup() {
  const authContext = useContext<AuthContextProps | null>(AuthContext)

  if (!authContext) {
    return
  }

  const { email, password, accessToken, navigate } = authContext

  if (accessToken) {
    navigate('/todo')
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const SIGNUP_API = REQUEST_URL + '/auth/signup'

    try {
      await AuthApi({ SIGN: SIGNUP_API, email, password })

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
    <Auth sign={'회원가입'} signBtn={'가입하기'} handleSign={handleSignup} />
  )
}
