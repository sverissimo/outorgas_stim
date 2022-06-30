import { QueryClient, QueryClientProvider } from 'react-query'
import { Header } from './components/Header'
import { OutorgaTable } from './pages/OutorgaTable'

function App() {

  const queryClient = new QueryClient

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <OutorgaTable />
    </QueryClientProvider>
  )
}

export default App
