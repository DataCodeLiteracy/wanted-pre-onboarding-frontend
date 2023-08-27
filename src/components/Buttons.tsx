import { AiFillHome } from 'react-icons/ai'
import { Button, FlexDiv } from '../styles/HeaderStyle'
import localToken from '../api/LocalToken'
import { alertError } from '../utils/error'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

const Buttons = () => {
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

  const handleMovePath = (path: string) => {
    navigate(path)
  }

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
    <FlexDiv>
      {buttons.map(
        (button) =>
          button.showOnPaths.includes(window.location.pathname) && (
            <Button
              key={button.path}
              onClick={() => {
                if (button.text === '로그아웃') {
                  handleLogout()
                } else {
                  handleMovePath(button.path)
                }
              }}
            >
              {button.text}
            </Button>
          )
      )}
    </FlexDiv>
  )
}

export default Buttons
