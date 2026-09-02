import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext';
import './Catalago.css';

export default function Favoritos() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  const handleAddToCart = (book) => {
    if (!isAuthenticated) {
      showAlert('⚠️ Você precisa fazer login para adicionar livros ao carrinho!');
      setTimeout(() => {
        navigate('/login');
      }, 1600);
      return;
    }

    addToCart(book, 1);
    showAlert(`✓ "${book.title}" adicionado ao carrinho!`);
  };

  return (
    <div className="container catalog-page">
      {/* Toast Alert Flutuante */}
      {alertMessage && (
        <div className="cart-toast-alert">
          <i className="ph ph-check-circle" style={{ fontSize: '20px' }}></i>
          <span>{alertMessage}</span>
          <Link to="/carrinho" className="toast-cart-link">Ver carrinho</Link>
        </div>
      )}

      <div className="catalog-back-wrapper">
        <Link to="/home" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Voltar para o início</span>
        </Link>
      </div>

      <div className="section-header" style={{ marginBottom: '24px' }}>
        <h1 className="section-title">Meus Livros Favoritos</h1>
        <span style={{ color: 'var(--text-muted, #64748b)', fontSize: '14px' }}>
          {favorites.length} {favorites.length === 1 ? 'item salvo' : 'itens salvos'}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <i className="ph ph-heart-break empty-icon" style={{ color: '#ec4899' }}></i>
          <h3>Sua lista de favoritos está vazia</h3>
          <p>Explore nosso catálogo e clique no ícone de coração para salvar suas leituras desejadas.</p>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="book-grid catalog-grid">
          {favorites.map((book) => (
            <article key={book.id} className="book-card">
              <div className="card-thumb">
                {book.discount && <span className="badge badge-discount">{book.discount}</span>}
                <button
                  type="button"
                  className="wishlist-btn active"
                  title="Remover dos favoritos"
                  onClick={() => toggleFavorite(book)}
                  style={{ color: '#ef4444' }}
                >
                  <i className="ph-fill ph-heart"></i>
                </button>
                <Link to={`/livro/${book.id}`}>
                  <img src={book.image} alt={book.title} loading="lazy" />
                </Link>
              </div>

              <div className="card-info">
                <Link to={`/livro/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 className="book-title" title={book.title}>{book.title}</h3>
                </Link>
                <p className="book-author">{book.author}</p>
                <div className="rating">
                  <i className="ph-fill ph-star"></i>
                  <span className="rating-value">{book.rating}</span>
                </div>
                <div className="price-box">
                  <span className="price-current">
                    R$ {Number(book.price).toFixed(2).replace('.', ',')}
                  </span>
                  {book.oldPrice && (
                    <span className="price-old">
                      R$ {Number(book.oldPrice).toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => handleAddToCart(book)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}