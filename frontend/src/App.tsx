import { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { UserAuth } from './auth/UserAuth'
import { getCookie } from './auth/utils/manageCookies'
import { Header } from './components/Header'
import { GlobalDataContextProvider } from './contexts/GlobalDataContext'
import { UserContext } from './contexts/UserContext'
import { AppRouter } from './Routes'

function App() {
  const { user } = useContext(UserContext)
  const session = getCookie('loggedIn')
  useEffect(() => {
    console.log("🚀 ~ file: App.tsx:13 ~ App ~ session:", session)

  })


  if (!user.isLoggedIn || !session) {
    return (
      <UserAuth />
    )
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
