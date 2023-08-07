import { useNavigate } from 'react-router-dom'
import { Button, FlexDiv, Nav } from '../styles/HeaderStyle'
import { AiFillHome } from 'react-icons/ai'
import localToken from '../api/LocalToken'
import useError from '../Hooks/useError'

export default function AppHeader({
  isHomeButton,
  isSignupButton,
  isLogin
}: {
  isHomeButton: boolean
  isSignupButton: boolean
  isLogin: boolean
}) {
  const { alertError } = useError()

  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      localToken.remove()
      localToken.save('')
      window.alert('로그아웃 되었습니다.')
      navigate('/')
    } catch (error) {
      alertError(error.message)
    }
  }

  return (
    <Nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <FlexDiv>
        {isHomeButton && (
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            <AiFillHome />
          </Button>
        )}
        {isSignupButton && (
          <Button
            onClick={() => {
              navigate('/signup')
            }}
          >
            회원가입
          </Button>
        )}
        {isLogin && (
          <Button
            onClick={() => {
              navigate('/signin')
            }}
          >
            로그인
          </Button>
        )}
        {!isLogin && (
          <Button data-testid="logout-button" onClick={handleLogout}>
            로그아웃
          </Button>
        )}
      </FlexDiv>
    </Nav>
  )
}
