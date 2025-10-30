import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './Admin.jsx'
import NotFound from './NotFound.jsx'
import { initializeTheme } from './theme.js'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
let page = <App />

initializeTheme()

if (normalizedPath === '/admin') {
  page = <Admin />
} else if (normalizedPath !== '/' && normalizedPath !== '/index.html') {
  page = <NotFound />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
