import { NavigateFunction } from 'react-router-dom'
import { Button, FlexDiv, Nav } from '../styles/HeaderStyle'
import { AiFillHome } from 'react-icons/ai'

export default function AppHeader({
  navigate,
  handleLogout,
  showHomeButton,
  showSignupButton,
  showSigninButton
}: {
  navigate: NavigateFunction
  handleLogout: boolean
  showHomeButton: boolean
  showSignupButton: boolean
  showSigninButton: boolean
}) {
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
        {handleLogout && (
          <Button data-testid="logout-button" onClick={handleLogout}>
            로그아웃
          </Button>
        )}
      </FlexDiv>
    </Nav>
  )
}
