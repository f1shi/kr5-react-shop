import './App.css';
import Header from './components/Header';
import CatalogPage from './pages/CatalogPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <div className="app">
      <Header />
      <CatalogPage />
      <OrderPage />
    </div>
  );
}

export default App;
