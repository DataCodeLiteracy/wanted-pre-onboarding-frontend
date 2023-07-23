import { NavigateFunction } from 'react-router-dom'
import { Button, FlexDiv, Nav } from '../styles/HeaderStyle'
import { AiFillHome } from 'react-icons/ai'
import useError from '../Hooks/useError'

export default function AppHeader({
  navigate,
  isHomeButton,
  isSignupButton,
  isLogin
}: {
  navigate: NavigateFunction
  isHomeButton: boolean
  isSignupButton: boolean
  isLogin: boolean
}) {
  const handleLogout = () => {
    try {
      localStorage.removeItem('access_token')
      localStorage.setItem('access_token', '')
      window.alert('로그아웃 되었습니다.')
      navigate('/')
    } catch (error) {
      console.error(error.message || '알 수 없는 에러가 발생했습니다.')
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
