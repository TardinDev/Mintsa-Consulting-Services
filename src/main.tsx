import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ClerkAuthProvider } from './context/ClerkAuthContext'
import { AdminModeProvider } from './context/AdminModeContext'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkAuthProvider>
        <AdminModeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AdminModeProvider>
      </ClerkAuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
