import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './LivroDetalhes.css';

export default function LivroDetalhes() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('sinopse');

  useEffect(() => {
    let isMounted = true;

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const cleanId = id.replace(/^(works_|books_)/, '');
        const url = `https://openlibrary.org/works/${cleanId}.json`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Livro não encontrado');
        
        const data = await response.json();

        let description = 'Sinopse não informada.';
        if (typeof data.description === 'string') {
          description = data.description;
        } else if (data.description?.value) {
          description = data.description.value;
        }

        let authorName = 'Autor da obra';
        if (data.authors && data.authors.length > 0) {
          try {
            const authorKey = data.authors[0].author?.key;
            if (authorKey) {
              const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
              if (authorRes.ok) {
                const authorData = await authorRes.json();
                authorName = authorData.name || authorName;
              }
            }
          } catch {
            authorName = 'Autor da obra';
          }
        }

        const coverId = data.covers && data.covers.length > 0 ? data.covers[0] : null;
        const image = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
          : `https://picsum.photos/seed/${encodeURIComponent(data.title)}/400/600`;

        if (isMounted) {
          setBook({
            id: data.key,
            title: data.title || 'Título indisponível',
            author: authorName,
            description,
            image,
            price: 44.90,
            oldPrice: 56.00,
            discount: '-20%',
            rating: 4.8,
            reviewsCount: 124,
            pages: 304,
            language: 'Português',
            format: 'Capa Comum'
          });
        }
      } catch {
        if (isMounted) {
          setError('Não foi possível carregar as informações deste livro.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="container product-page">
        <div className="product-layout skeleton-product">
          <div className="skeleton-product-thumb"></div>
          <div className="skeleton-product-info">
            <div className="skeleton-line" style={{ width: '70%', height: '32px' }}></div>
            <div className="skeleton-line" style={{ width: '40%', height: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '30%', height: '36px', marginTop: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '100px', marginTop: '20px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container product-page">
        <div className="empty-state">
          <i className="ph ph-warning-circle empty-icon" style={{ color: 'var(--danger)' }}></i>
          <h3>Livro não encontrado</h3>
          <p>{error || 'As informações deste item não estão disponíveis no momento.'}</p>
          <Link to="/catalogo" className="btn btn-primary">
            Voltar ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container product-page">
      <div className="catalog-back-wrapper">
        <Link to="/catalogo" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="product-image-container">
            {book.discount && <span className="badge badge-discount">{book.discount}</span>}
            <button className="wishlist-btn" title="Favoritar">
              <i className="ph ph-heart"></i>
            </button>
            <img src={book.image} alt={book.title} />
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{book.title}</h1>
          <p className="product-author">Por <span>{book.author}</span></p>

          <div className="product-rating-row">
            <div className="stars">
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star-half"></i>
            </div>
            <span className="rating-score">{book.rating}</span>
            <span className="reviews-count">({book.reviewsCount} avaliações)</span>
          </div>

          <div className="product-price-box">
            <div className="prices">
              <span className="current-price">R$ {book.price.toFixed(2).replace('.', ',')}</span>
              {book.oldPrice && (
                <span className="old-price">R$ {book.oldPrice.toFixed(2).replace('.', ',')}</span>
              )}
            </div>
            <span className="stock-tag">
              <i className="ph ph-check-circle"></i> Em estoque
            </span>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={handleDecrease} className="qty-btn" title="Diminuir">
                <i className="ph ph-minus"></i>
              </button>
              <span className="qty-value">{quantity}</span>
              <button onClick={handleIncrease} className="qty-btn" title="Aumentar">
                <i className="ph ph-plus"></i>
              </button>
            </div>

            <button className="btn btn-secondary-outline btn-lg">
              Adicionar ao carrinho
            </button>
            <button className="btn btn-primary btn-lg">
              Comprar agora
            </button>
          </div>

          <div className="shipping-calculator">
            <label htmlFor="cep-input">Calcular frete e prazo:</label>
            <div className="shipping-input-group">
              <input type="text" id="cep-input" placeholder="00000-000" maxLength="9" />
              <button type="button" className="btn btn-secondary-outline">Calcular</button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs-section">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'sinopse' ? 'active' : ''}`}
            onClick={() => setActiveTab('sinopse')}
          >
            Sinopse
          </button>
          <button
            className={`tab-btn ${activeTab === 'informacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('informacoes')}
          >
            Informações Técnicas
          </button>
          <button
            className={`tab-btn ${activeTab === 'avaliacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('avaliacoes')}
          >
            Avaliações ({book.reviewsCount})
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'sinopse' && (
            <div className="tab-pane">
              <p className="product-synopsis">{book.description}</p>
            </div>
          )}

          {activeTab === 'informacoes' && (
            <div className="tab-pane">
              <dl className="tech-info-grid">
                <div className="tech-info-item">
                  <dt>Formato</dt>
                  <dd>{book.format}</dd>
                </div>
                <div className="tech-info-item">
                  <dt>Páginas</dt>
                  <dd>{book.pages}</dd>
                </div>
                <div className="tech-info-item">
                  <dt>Idioma</dt>
                  <dd>{book.language}</dd>
                </div>
                <div className="tech-info-item">
                  <dt>Autor</dt>
                  <dd>{book.author}</dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'avaliacoes' && (
            <div className="tab-pane">
              <div className="reviews-summary">
                <div className="overall-score">
                  <h2>{book.rating}</h2>
                  <div className="stars">
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                    <i className="ph-fill ph-star"></i>
                  </div>
                  <span>Média baseada em {book.reviewsCount} opiniões</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}