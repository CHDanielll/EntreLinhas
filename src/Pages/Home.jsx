import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext';
import './Home.css';

export default function Home() {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalFavorites, toggleFavorite, isFavorite } = useFavorites();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedBooks = async () => {
      setLoading(true);
      try {
        const url = 'https://openlibrary.org/search.json?q=bestseller&limit=15';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha na requisição');

        const data = await response.json();
        const docs = data.docs || [];

        if (isMounted) {
          const formatted = docs
            .filter((item) => item.title && (item.cover_i || item.cover_id))
            .slice(0, 4)
            .map((item, index) => {
              const coverId = item.cover_i || item.cover_id;
              const image = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : `https://picsum.photos/seed/${encodeURIComponent(item.title)}/300/450`;

              const authors = item.author_name
                ? item.author_name.slice(0, 2).join(', ')
                : 'Autor desconhecido';

              const basePrice = 34.9 + (index % 4) * 6;
              const discounts = ['-20%', '-15%', '-25%', '-10%'];
              const discount = discounts[index % discounts.length];

              return {
                id: (item.key || String(index)).replace('/works/', ''),
                title: item.title,
                author: authors,
                rating: (4.6 + (index % 4) * 0.1).toFixed(1),
                price: basePrice,
                oldPrice: basePrice * 1.25,
                discount: discount,
                image
              };
            });

          setFeaturedBooks(formatted);
        }
      } catch {
        if (isMounted) {
          setFeaturedBooks([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link to="/home" className="brand-logo">
            <i className="ph ph-book-open-text"></i>
            <div className="logo-text">
              <span className="logo-title">EntreLinhas</span>
              <span className="logo-sub">E-COMMERCE LITERÁRIO</span>
            </div>
          </Link>

          <div className="search-bar">
            <i className="ph ph-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Busque por título, autor..." />
          </div>

          <div className="header-actions">
            
            <Link
              to="/favoritos"
              className="action-btn"
              title="Meus Favoritos"
              style={{ position: 'relative' }}
            >
              <i className="ph ph-heart" style={{ fontSize: '22px' }}></i>
              {totalFavorites > 0 && <span className="badge-count">{totalFavorites}</span>}
            </Link>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-primary, #7c3aed)' }}>
                  Olá, {user?.name || 'Leitor'}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="action-btn"
                  title="Sair da conta"
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <i className="ph ph-sign-out"></i>
                </button>
              </div>
            ) : (
              <Link to="/login" className="action-btn" title="Fazer Login">
                <i className="ph ph-user"></i>
              </Link>
            )}

            <Link to="/carrinho" className="action-btn cart-btn" title="Carrinho">
              <i className="ph ph-shopping-cart" style={{ fontSize: '24px' }}></i>
              {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
            </Link>
          </div>
        </div>

        <nav className="nav-bar">
          <div className="container nav-container">
            <ul className="nav-list">
              <li><Link to="/catalogo?categoria=ficcao" className="nav-link">Ficção</Link></li>
              <li><Link to="/catalogo?categoria=romance" className="nav-link">Romance</Link></li>
              <li><Link to="/catalogo?categoria=fantasia" className="nav-link">Fantasia</Link></li>
              <li><Link to="/catalogo?categoria=suspense" className="nav-link">Suspense</Link></li>
              <li><Link to="/catalogo?categoria=terror" className="nav-link">Terror</Link></li>
              <li><Link to="/catalogo?categoria=autoajuda" className="nav-link">Desenvolvimento</Link></li>
              <li><Link to="/catalogo?categoria=biografias" className="nav-link">Biografias</Link></li>
              <li><Link to="/catalogo" className="nav-link nav-link-all">Ver todas &rarr;</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">DESTAQUES DO MÊS</span>
            <h1 className="hero-title">Encontre sua próxima história</h1>
            <p className="hero-description">
              Livros que despertam ideias, sentimentos e novas perspectivas.
            </p>
            <Link to="/catalogo" className="btn btn-hero">Explorar catálogo completo</Link>
          </div>

          <div className="hero-showcase">
            <div className="hero-book book-left">
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" alt="Livro 1" />
            </div>
            <div className="hero-book book-center">
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" alt="Livro 2" />
            </div>
            <div className="hero-book book-right">
              <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400" alt="Livro 3" />
            </div>
          </div>
        </div>
      </section>


      <section className="section container" id="destaques">
        <div className="section-header">
          <h2 className="section-title">Livros em destaque</h2>
          <Link to="/catalogo" className="section-link">Ver catálogo completo &rarr;</Link>
        </div>

        {loading ? (
          <div className="book-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-thumb"></div>
                <div className="skeleton-line" style={{ width: '80%' }}></div>
                <div className="skeleton-line" style={{ width: '50%' }}></div>
                <div className="skeleton-line" style={{ width: '40%', height: '24px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="book-grid">
            {featuredBooks.map((book) => {
              const favorite = isFavorite(book.id);
              return (
                <article key={book.id} className="book-card">
                  <div className="card-thumb">
                    {book.discount && <span className="badge badge-discount">{book.discount}</span>}
                    <button
                      type="button"
                      className="wishlist-btn"
                      title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      onClick={() => toggleFavorite(book)}
                      style={{ color: favorite ? '#ef4444' : 'inherit' }}
                    >
                      <i className={favorite ? 'ph-fill ph-heart' : 'ph ph-heart'}></i>
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
                    <Link to={`/livro/${book.id}`} className="btn btn-primary btn-block">
                      Ver detalhes
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/catalogo" className="btn btn-primary" style={{ padding: '12px 32px' }}>
            Ver mais livros
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Mais vendidos da semana</h2>
          <Link to="/catalogo" className="section-link">Ver ranking &rarr;</Link>
        </div>

        <div className="ranking-grid">
          {featuredBooks.map((book, index) => (
            <Link to={`/livro/${book.id}`} key={book.id} className="ranking-card">
              <span className="rank-badge">#{index + 1}</span>
              <img src={book.image} alt={book.title} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Navegue pelas categorias</h2>
        </div>

        <div className="categories-grid">
          <Link to="/catalogo?categoria=romance" className="category-pill">
            <i className="ph ph-heart-straight"></i>
            <span>Romance</span>
          </Link>
          <Link to="/catalogo?categoria=fantasia" className="category-pill">
            <i className="ph ph-sparkle"></i>
            <span>Fantasia</span>
          </Link>
          <Link to="/catalogo?categoria=ficcao" className="category-pill">
            <i className="ph ph-planet"></i>
            <span>Ficção</span>
          </Link>
          <Link to="/catalogo?categoria=suspense" className="category-pill">
            <i className="ph ph-detective"></i>
            <span>Suspense</span>
          </Link>
          <Link to="/catalogo?categoria=autoajuda" className="category-pill">
            <i className="ph ph-brain"></i>
            <span>Autoajuda</span>
          </Link>
          <Link to="/catalogo?categoria=ficcao" className="category-pill">
            <i className="ph ph-baby"></i>
            <span>Infantil</span>
          </Link>
        </div>
      </section>

      <section className="container promo-banner-wrapper">
        <div className="promo-banner">
          <div className="promo-content">
            <i className="ph ph-tag promo-icon"></i>
            <p><strong>Ofertas da semana:</strong> Até 40% OFF em livros selecionados</p>
          </div>
          <Link to="/catalogo" className="btn btn-secondary-white">Ver ofertas</Link>
        </div>
      </section>

      <section className="container newsletter-wrapper">
        <div className="newsletter-card">
          <div className="newsletter-header">
            <h3 className="newsletter-title">Receba novidades da EntreLinhas</h3>
            <p className="newsletter-desc">Cadastre seu e-mail e receba descontos exclusivos e lançamentos em primeira mão.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Digite seu melhor e-mail..." required />
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; 2026 EntreLinhas E-commerce Literário. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}