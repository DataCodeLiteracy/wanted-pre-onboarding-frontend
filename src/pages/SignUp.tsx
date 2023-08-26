import Auth from '../components/Auth'
import { AuthWrapper } from '../styles/AuthStyle'

export default function SignUp() {
  return (
    <AuthWrapper>
      <Auth title="회원가입" buttonText="가입하기" />
    </AuthWrapper>
  )
}
