import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './contexts/AuthContexts.tsx'
import { ToastPortalContextProvider } from "./contexts/ToastPortalContext.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ToastPortalContextProvider autoClose={true} autoCloseTime={3000}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToastPortalContextProvider>
  </React.StrictMode>,
)
