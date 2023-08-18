import { Outlet } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (
    <AppContextProvider>
      <Outlet />
    </AppContextProvider>
  )
}

export default App
