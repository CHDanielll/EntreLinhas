import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalago from './Pages/Catalago';
import Home from './Pages/Home';
import LivroDetalhes from './Pages/LivroDetalhes';
import Login from './Pages/Login';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalago />} />
        {/* Rota dinâmica com o parâmetro :id */}
        <Route path="/livro/:id" element={<LivroDetalhes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}