import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:productId" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
