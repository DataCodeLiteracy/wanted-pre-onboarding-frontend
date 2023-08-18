import { ReactNode, createContext, useEffect } from 'react'
import localToken from '../api/LocalToken'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const path = window.location.pathname

  useEffect(() => {
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
  }, [path, navigate])

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
