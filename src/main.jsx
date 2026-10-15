import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import CartProvider from './context/CartProvider';
import ThemeModeProvider from './context/ThemeModeProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeModeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>
);
