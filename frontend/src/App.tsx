import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { AppRouter } from './Routes'



function App() {

  const queryClient = new QueryClient

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
