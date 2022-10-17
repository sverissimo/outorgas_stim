import { useContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { EmpresaContext } from './context/EmpresaContext'
import { AppRouter } from './Routes'



function App() {

  const
    [empresaFilter, setEmpresaFilter] = useState<number[]>([])


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 2 * 60 * 60 * 1000 //2h
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      <EmpresaContext.Provider value={{ empresaFilter, setEmpresaFilter }}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </EmpresaContext.Provider >
    </QueryClientProvider>
  )
}

export default App
