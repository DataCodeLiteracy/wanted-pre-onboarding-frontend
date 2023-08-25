import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import localToken from './api/LocalToken'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const path = window.location.pathname
    const accessToken = localToken.get()
    const authPath = ['/signin', '/signup']

    if (accessToken) {
      if (authPath.includes(path)) {
        navigate('/todo')
      }
    } else {
      if (path === '/todo') {
        navigate('/signin')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Outlet />
}

export default App
