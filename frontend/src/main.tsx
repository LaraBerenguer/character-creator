import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { BackgroundProvider } from './context/BackgroundContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BackgroundProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BackgroundProvider>
  </StrictMode>
);
