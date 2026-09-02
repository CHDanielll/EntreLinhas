import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import Carrinho from './Pages/Carrinho';
import Catalago from './Pages/Catalago';
import Favoritos from './Pages/Favoritos';
import Home from './Pages/Home';
import LivroDetalhes from './Pages/LivroDetalhes';
import Login from './Pages/Login';

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/catalogo" element={<Catalago />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/livro/:id" element={<LivroDetalhes />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}