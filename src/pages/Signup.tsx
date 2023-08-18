import Auth from '../components/Auth'
import AppHeader from '../components/AppHeader'
import { AuthWrapper } from '../styles/AuthStyle'

export default function Signup() {
  return (
    <AuthWrapper>
      <AppHeader />
      <Auth title="회원가입" buttonText="가입하기" />
    </AuthWrapper>
  )
}
