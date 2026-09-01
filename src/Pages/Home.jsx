import './Home.css'; // Certifique-se de importar o arquivo CSS no seu projeto

export default function Home() {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="container header-container">
          <a href="#" className="brand-logo">
            <i className="ph ph-book-open-text"></i>
            <div className="logo-text">
              <span className="logo-title">EntreLinhas</span>
              <span className="logo-sub">E-COMMERCE LITERÁRIO</span>
            </div>
          </a>

          <div className="search-bar">
            <i className="ph ph-magnifying-glass search-icon"></i>
            <input type="text" placeholder="Busque por título, autor..." />
          </div>

          <div className="header-actions">
            <a href="#" className="action-btn" title="Favoritos">
              <i className="ph ph-heart"></i>
            </a>
            <a href="#" className="action-btn" title="Minha Conta">
              <i className="ph ph-user"></i>
            </a>
            <a href="#" className="action-btn cart-btn" title="Carrinho">
              <i className="ph ph-shopping-bag"></i>
              <span className="badge-count">1</span>
            </a>
          </div>
        </div>

        {/* Navegação de Categorias */}
        <nav className="nav-bar">
          <div className="container nav-container">
            <ul className="nav-list">
              <li><a href="#" className="nav-link">Ficção</a></li>
              <li><a href="#" className="nav-link">Romance</a></li>
              <li><a href="#" className="nav-link">Fantasia</a></li>
              <li><a href="#" className="nav-link">Suspense</a></li>
              <li><a href="#" className="nav-link">Terror</a></li>
              <li><a href="#" className="nav-link">Desenvolvimento</a></li>
              <li><a href="#" className="nav-link">Biografias</a></li>
              <li><a href="#" className="nav-link nav-link-all">Ver todas &rarr;</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">DESTAQUES DO MÊS</span>
            <h1 className="hero-title">Encontre sua próxima história</h1>
            <p className="hero-description">
              Livros que despertam ideias, sentimentos e novas perspectivas.
            </p>
            <a href="#destaques" className="btn btn-hero">Explorar livros</a>
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

      {/* ================= LIVROS EM DESTAQUE ================= */}
      <section className="section container" id="destaques">
        <div className="section-header">
          <h2 className="section-title">Livros em destaque</h2>
          <a href="#" className="section-link">Ver todos (24) &rarr;</a>
        </div>

        <div className="book-grid">
          {/* Card 1 */}
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

          {/* Card 2 */}
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

          {/* Card 3 */}
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

          {/* Card 4 */}
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
      </section>

      {/* ================= MAIS VENDIDOS DA SEMANA ================= */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Mais vendidos da semana</h2>
          <a href="#" className="section-link">Ver ranking &rarr;</a>
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

      {/* ================= CATEGORIAS ================= */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Navegue pelas categorias</h2>
        </div>

        <div className="categories-grid">
          <a href="#" className="category-pill">
            <i className="ph ph-heart-straight"></i>
            <span>Romance</span>
          </a>
          <a href="#" className="category-pill">
            <i className="ph ph-sparkle"></i>
            <span>Fantasia</span>
          </a>
          <a href="#" className="category-pill">
            <i className="ph ph-planet"></i>
            <span>Ficção</span>
          </a>
          <a href="#" className="category-pill">
            <i className="ph ph-detective"></i>
            <span>Suspense</span>
          </a>
          <a href="#" className="category-pill">
            <i className="ph ph-brain"></i>
            <span>Autoajuda</span>
          </a>
          <a href="#" className="category-pill">
            <i className="ph ph-baby"></i>
            <span>Infantil</span>
          </a>
        </div>
      </section>

      {/* ================= BANNER OFERTAS ================= */}
      <section className="container promo-banner-wrapper">
        <div className="promo-banner">
          <div className="promo-content">
            <i className="ph ph-tag promo-icon"></i>
            <p><strong>Ofertas da semana:</strong> Até 40% OFF em livros selecionados</p>
          </div>
          <a href="#" className="btn btn-secondary-white">Ver ofertas</a>
        </div>
      </section>

      {/* ================= RECOMENDADOS ================= */}
      <section className="section container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recomendados para você</h2>
            <p className="section-subtitle">Com base nos seus livros favoritos</p>
          </div>
        </div>

        <div className="book-grid">
          <article className="book-card">
            <div className="card-thumb">
              <button className="wishlist-btn"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300" alt="A Metamorfose" />
            </div>
            <div className="card-info">
              <h3 className="book-title">A Metamorfose</h3>
              <p className="book-author">Franz Kafka</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.6</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 29,90</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <button className="wishlist-btn"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=300" alt="1984" />
            </div>
            <div className="card-info">
              <h3 className="book-title">1984</h3>
              <p className="book-author">George Orwell</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.9</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 35,00</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <button className="wishlist-btn"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" alt="O Homem do Castelo Alto" />
            </div>
            <div className="card-info">
              <h3 className="book-title">O Homem do Castelo Alto</h3>
              <p className="book-author">Philip K. Dick</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.5</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 42,00</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>

          <article className="book-card">
            <div className="card-thumb">
              <button className="wishlist-btn"><i className="ph ph-heart"></i></button>
              <img src="https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=300" alt="Flores para Algernon" />
            </div>
            <div className="card-info">
              <h3 className="book-title">Flores para Algernon</h3>
              <p className="book-author">Daniel Keyes</p>
              <div className="rating">
                <i className="ph-fill ph-star"></i>
                <span className="rating-value">4.9</span>
              </div>
              <div className="price-box">
                <span className="price-current">R$ 48,00</span>
              </div>
              <button className="btn btn-primary btn-block">Adicionar</button>
            </div>
          </article>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
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

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; 2026 EntreLinhas E-commerce Literário. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}