import { useEffect } from 'react'
import Auth from '../components/Auth'
import { AuthWrapper } from '../styles/AuthStyle'
import localToken from '../api/LocalToken'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localToken.get()

    if (accessToken) {
      navigate('/todo')
    }
  }, [])

  return (
    <AuthWrapper>
      <Auth title="회원가입" buttonText="가입하기" />
    </AuthWrapper>
  )
}
