import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </AuthContextProvider>
  )
}

export default App
