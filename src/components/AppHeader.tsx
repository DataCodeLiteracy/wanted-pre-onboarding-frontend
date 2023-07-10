import { NavigateFunction } from 'react-router-dom'
import { Button, FlexDiv, Nav } from '../styles/HeaderStyle'
import { AiFillHome } from 'react-icons/ai'

export default function AppHeader({
  navigate,
  showLogoutButton,
  showHomeButton,
  showSignupButton,
  showSigninButton
}: {
  navigate: NavigateFunction
  showLogoutButton: boolean
  showHomeButton: boolean
  showSignupButton: boolean
  showSigninButton: boolean
}) {
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.setItem('access_token', '')
    window.alert('로그아웃 되었습니다.')
    navigate('/')
  }

  return (
    <Nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <FlexDiv>
        {showHomeButton && (
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            <AiFillHome />
          </Button>
        )}
        {showSignupButton && (
          <Button
            onClick={() => {
              navigate('/signup')
            }}
          >
            회원가입
          </Button>
        )}
        {showSigninButton && (
          <Button
            onClick={() => {
              navigate('/signin')
            }}
          >
            로그인
          </Button>
        )}
        {showLogoutButton && (
          <Button data-testid="logout-button" onClick={handleLogout}>
            로그아웃
          </Button>
        )}
      </FlexDiv>
    </Nav>
  )
}
