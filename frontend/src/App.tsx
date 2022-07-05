import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { AppRouter } from './Routes'



function App() {

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
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
