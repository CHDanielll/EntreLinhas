import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="brand-logo">
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
            <a href="#favoritos" className="action-btn" title="Favoritos">
              <i className="ph ph-heart"></i>
            </a>
            <Link to="/login" className="action-btn" title="Minha Conta">
              <i className="ph ph-user"></i>
            </Link>
            <a href="#carrinho" className="action-btn cart-btn" title="Carrinho">
              <i className="ph ph-shopping-bag"></i>
              <span className="badge-count">1</span>
            </a>
          </div>
        </div>

        <nav className="nav-bar">
          <div className="container nav-container">
            <ul className="nav-list">
              <li><a href="#ficcao" className="nav-link">Ficção</a></li>
              <li><a href="#romance" className="nav-link">Romance</a></li>
              <li><a href="#fantasia" className="nav-link">Fantasia</a></li>
              <li><a href="#suspense" className="nav-link">Suspense</a></li>
              <li><a href="#terror" className="nav-link">Terror</a></li>
              <li><a href="#desenvolvimento" className="nav-link">Desenvolvimento</a></li>
              <li><a href="#biografias" className="nav-link">Biografias</a></li>
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

        <div className="book-grid">
          <article className="book-card">
            <div className="card-thumb">
              <span className="badge badge-discount">-20%</span>
              <button className="wishlist-btn" title="Favoritar"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" alt="A Biblioteca da Meia-Noite" />
            </div>
            <div className="card-info">
              <h3 className="book-title">A Biblioteca da Meia-Noite</h3>
              <p className="book-author">Matt Haig</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.8</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 44,90</span>
                <span className="price-old">R$ 56,00</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <span className="badge badge-discount">-15%</span>
              <button className="wishlist-btn" title="Favoritar"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=300" alt="Hábitos Atômicos" />
            </div>
            <div className="card-info">
              <h3 className="book-title">Hábitos Atômicos</h3>
              <p className="book-author">James Clear</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.9</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 38,90</span>
                <span className="price-old">R$ 45,90</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <span className="badge badge-discount">-25%</span>
              <button className="wishlist-btn" title="Favoritar"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300" alt="É Assim que Acaba" />
            </div>
            <div className="card-info">
              <h3 className="book-title">É Assim que Acaba</h3>
              <p className="book-author">Colleen Hoover</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.7</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 39,00</span>
                <span className="price-old">R$ 52,00</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <span className="badge badge-discount">-10%</span>
              <button className="wishlist-btn" title="Favoritar"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=300" alt="Corte de Névoa e Fúria" />
            </div>
            <div className="card-info">
              <h3 className="book-title">Corte de Névoa e Fúria</h3>
              <p className="book-author">Sarah J. Maas</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.9</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 49,90</span>
                <span className="price-old">R$ 55,90</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>
        </div>

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
          <div className="ranking-card">
            <span className="rank-badge">#1</span>
            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200" alt="Livro 1" />
          </div>
          <div className="ranking-card">
            <span className="rank-badge">#2</span>
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200" alt="Livro 2" />
          </div>
          <div className="ranking-card">
            <span className="rank-badge">#3</span>
            <img src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200" alt="Livro 3" />
          </div>
          <div className="ranking-card">
            <span className="rank-badge">#4</span>
            <img src="https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=200" alt="Livro 4" />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Navegue pelas categorias</h2>
        </div>

        <div className="categories-grid">
          <div className="category-pill">
            <i className="ph ph-heart-straight"></i>
            <span>Romance</span>
          </div>
          <div className="category-pill">
            <i className="ph ph-sparkle"></i>
            <span>Fantasia</span>
          </div>
          <div className="category-pill">
            <i className="ph ph-planet"></i>
            <span>Ficção</span>
          </div>
          <div className="category-pill">
            <i className="ph ph-detective"></i>
            <span>Suspense</span>
          </div>
          <div className="category-pill">
            <i className="ph ph-brain"></i>
            <span>Autoajuda</span>
          </div>
          <div className="category-pill">
            <i className="ph ph-baby"></i>
            <span>Infantil</span>
          </div>
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