import { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { UserAuth } from './auth/UserAuth'
import { Header } from './components/Header'
import { GlobalDataContextProvider } from './contexts/GlobalDataContext'
import { UserContext } from './contexts/UserContext'
import { AppRouter } from './Routes'

function App() {
  const { user } = useContext(UserContext)

  if (!user.isLoggedIn) {
    return <UserAuth />
  }

  return (
    <BrowserRouter>
      <Header />
      <GlobalDataContextProvider >
        <AppRouter />
      </GlobalDataContextProvider>
    </BrowserRouter>
  )
}

export default App
