import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { BackgroundProvider } from './context/BackgroundContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { CharacterProvider } from './context/CharacterContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BackgroundProvider>
          <CharacterProvider>
            <App />
          </CharacterProvider>
        </BackgroundProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
