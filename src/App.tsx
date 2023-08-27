import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import localToken from './api/LocalToken'
import AppHeader from './components/AppHeader'
import { Wrapper } from './styles/HomeStyle'

function App() {
  const navigate = useNavigate()

  // 각 컴포넌트에서 리다이렉션 처리하면서 주먹구구식으로 해결해 놓은 상태라.. 일단 주석으로 남겨놓자.
  // useEffect(() => {
  //   const path = window.location.pathname
  //   const accessToken = localToken.get()
  //   const authPath = ['/signin', '/signup']

  //   if (accessToken) {
  //     console.log(authPath.includes(path))
  //     if (authPath.includes(path)) {
  //       navigate('/todo')
  //     }
  //   } else {
  //     if (path === '/todo') {
  //       navigate('/signin')
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Wrapper>
      <AppHeader />
      <Outlet />
    </Wrapper>
  )
}

export default App
