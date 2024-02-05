import { CssBaseline } from '@mui/material';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ProductsListPage from './pages/ProductsListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import Main from './components/Main';
import { useLocalStorage } from './hooks/useLocalStorage';
import Page404 from './pages/Page404';

export default function App() {
  const [cart, setCart] = useLocalStorage([], 'cart');

  const handleAddToCart = (cartItem) => {
    if (!cartItem) return;

    setCart((c) => [...c, cartItem]);
  };

  return (
    <div className="App">
      <HashRouter>
        <CssBaseline />
        <Header cart={cart} />
        <Main>
          <Routes>
            <Route path="/" element={<ProductsListPage />} />
            <Route
              path="/product/:id"
              element={
                <ProductDetailPage onAddToCart={handleAddToCart} cart={cart} />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} setCart={setCart} />}
            />
            <Route path={'*'} element={<Page404 />} />
          </Routes>
        </Main>
      </HashRouter>
    </div>
  );
}
