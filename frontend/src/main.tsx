import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './contexts/UserContext'
import './index.css'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);

