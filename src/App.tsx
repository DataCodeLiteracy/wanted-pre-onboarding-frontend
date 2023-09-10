import { Outlet } from 'react-router-dom'
import AppHeader from './components/AppHeader'
import { Wrapper } from './styles/HomeStyle'

function App() {
  return (
    <Wrapper>
      <AppHeader />
      <Outlet />
    </Wrapper>
  )
}

export default App
