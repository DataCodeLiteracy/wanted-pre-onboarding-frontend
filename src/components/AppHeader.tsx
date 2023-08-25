import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, FlexDiv, Nav } from '../styles/HeaderStyle'
import { AiFillHome } from 'react-icons/ai'
import localToken from '../api/LocalToken'
import { alertError } from '../utils/error'
import { AxiosError } from 'axios'

export default function AppHeader() {
  const [currentPath, setCurrentPath] = useState('')

  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      localToken.remove()
      localToken.save('')
      window.alert('로그아웃 되었습니다.')
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(error)
      }
    }
  }

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [currentPath])

  const buttons = [
    {
      path: '/',
      text: <AiFillHome />,
      showOnPaths: ['/signin', '/signup', '/todo']
    },
    { path: '/signup', text: '회원가입', showOnPaths: ['/', '/signin'] },
    { path: '/signin', text: '로그인', showOnPaths: ['/', '/signup'] },
    { path: '', text: '로그아웃', showOnPaths: ['/', '/todo'] }
  ]

  return (
    <Nav>
      <h1>Wanted-Pre-Onboarding</h1>
      <FlexDiv>
        {buttons.map(
          (button) =>
            button.showOnPaths.includes(currentPath) && (
              <Button
                key={button.path}
                onClick={() => {
                  if (button.text === '로그아웃') {
                    handleLogout()
                  } else {
                    navigate(button.path)
                  }
                }}
              >
                {button.text}
              </Button>
            )
        )}
      </FlexDiv>
    </Nav>
  )
}
