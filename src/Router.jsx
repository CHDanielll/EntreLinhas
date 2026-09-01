import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalago from './Pages/Catalago';
import Home from './Pages/Home';
import Login from './Pages/Login';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalago />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}