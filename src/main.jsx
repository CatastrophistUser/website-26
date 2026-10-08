import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AgentsPage from './pages/AgentsPage.jsx'

// No router: this is the only route split the site has, so a pathname check is
// enough. Add react-router if a third route ever shows up.
const isAgentsRoute = /^\/agents\/?$/.test(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAgentsRoute ? <AgentsPage /> : <App />}
  </StrictMode>,
)
