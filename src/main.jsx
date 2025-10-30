import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFound from './NotFound.jsx'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const showNotFound = normalizedPath !== '/' && normalizedPath !== '/index.html'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showNotFound ? <NotFound /> : <App />}
  </StrictMode>,
)
