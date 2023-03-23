import { BrowserRouter } from 'react-router-dom'
import { UserAuth } from './auth/UserAuth'
import { getCookie } from './auth/utils/manageCookies'
import { Header } from './components/Header'
import { GlobalDataContextProvider } from './context/GlobalDataContext'
import { AppRouter } from './Routes'

function App() {
  const loggedIn = getCookie('loggedIn')


  if (!loggedIn) {
    console.log("🚀 ~ file: App.tsx:10 ~ App ~ loggedIn:", loggedIn)
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
