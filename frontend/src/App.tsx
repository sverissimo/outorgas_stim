import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { GlobalDataContextProvider } from './context/GlobalDataContext'
import { AppRouter } from './Routes'

function App() {

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
