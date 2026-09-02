import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import './LivroDetalhes.css';

// Banco de nomes de usuários para sorteio
const POOL_NOMES = [
  'Daniel', 'Beatriz Costa', 'Matheus Henrique', 'Camila Rocha',
  'Lucas Albuquerque', 'Fernanda Lima', 'Rafael Souza', 'Juliana Mendes',
  'Rodrigo Ramos', 'Larissa Carvalho', 'Gabriel Nogueira', 'Amanda Fontes'
];

// Comentários Excelentes (60% quando livro é bem avaliado)
const COMENTARIOS_EXCELENTES = [
  'Achei o livro top! Escrita muito fluida e envolvente.',
  'História sensacional, li em apenas dois dias!',
  'Vale cada página lida. Entrou fácil para os meus favoritos!',
  'Prende a atenção do começo ao fim. Narrativa impecável.',
  'Edição maravilhosa, capa linda e entrega super rápida pela EntreLinhas.'
];

// Comentários Bons / Medianos (30%)
const COMENTARIOS_BONS = [
  'História interessante e com boas reflexões, embora o meio seja um pouco arrastado.',
  'Gostei bastante da premissa. O desfecho poderia ser melhor, mas vale a leitura.',
  'Boa leitura para um fim de semana chuvoso. Recomendo.',
  'Entrega rápida e livro em perfeito estado. A história é boa, cumpre o que promete.'
];

// Comentários Críticos / Ruins (10%)
const COMENTARIOS_RUINS = [
  'Esperava um pouco mais pelo hype que criaram. Achei o ritmo um pouco cansativo.',
  'Achei a diagramação boa, mas a narrativa não me prendeu tanto quanto eu gostaria.',
  'História previsível em alguns momentos, não funcionou muito bem para mim.'
];

// Função auxiliar para selecionar itens aleatórios de um array sem repetição imediata
function sortearAleatorios(array, quantidade) {
  const embaralhado = [...array].sort(() => 0.5 - Math.random());
  return embaralhado.slice(0, quantidade);
}

export default function LivroDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('sinopse');
  const [alertMessage, setAlertMessage] = useState('');
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const cleanId = (id || '').replace(/^(\/works\/|works_|books_)/, '');

        const [workRes, ratingsRes] = await Promise.all([
          fetch(`https://openlibrary.org/works/${cleanId}.json`),
          fetch(`https://openlibrary.org/works/${cleanId}/ratings.json`).catch(() => null)
        ]);

        if (!workRes.ok) throw new Error('Livro não encontrado');
        const data = await workRes.json();

        let averageRating = Number((4.3 + Math.random() * 0.6).toFixed(1));
        let ratingsCount = Math.floor(60 + Math.random() * 150);

        if (ratingsRes && ratingsRes.ok) {
          const ratingsData = await ratingsRes.json();
          if (ratingsData?.summary?.average) {
            averageRating = Number(ratingsData.summary.average.toFixed(1));
            ratingsCount = ratingsData.summary.count || ratingsCount;
          }
        }

        // --- GERAÇÃO DOS 5 COMENTÁRIOS OBRIGATÓRIOS BASEADOS NA NOTA ---
        const nomesSorteados = sortearAleatorios(POOL_NOMES, 5);
        let gerados = [];

        if (averageRating >= 4.0) {
          // Livro Bom: 60% Excelentes (3), ~30% Bons (1 ou 2), ~10% Ruins (1)
          const excelentes = sortearAleatorios(COMENTARIOS_EXCELENTES, 3).map((texto, i) => ({
            nome: nomesSorteados[i],
            texto,
            nota: (4.8 + Math.random() * 0.2).toFixed(1)
          }));

          const bom = sortearAleatorios(COMENTARIOS_BONS, 1).map((texto, i) => ({
            nome: nomesSorteados[3 + i],
            texto,
            nota: (3.8 + Math.random() * 0.4).toFixed(1)
          }));

          const ruim = sortearAleatorios(COMENTARIOS_RUINS, 1).map((texto) => ({
            nome: nomesSorteados[4],
            texto,
            nota: (2.5 + Math.random() * 0.8).toFixed(1)
          }));

          gerados = [...excelentes, ...bom, ...ruim];
        } else {
          // Livro Regular/Baixo: Inverte a proporção (Mais avaliações críticas)
          const ruins = sortearAleatorios(COMENTARIOS_RUINS, 3).map((texto, i) => ({
            nome: nomesSorteados[i],
            texto,
            nota: (2.0 + Math.random() * 1.0).toFixed(1)
          }));

          const bons = sortearAleatorios(COMENTARIOS_BONS, 1).map((texto, i) => ({
            nome: nomesSorteados[3 + i],
            texto,
            nota: (3.2 + Math.random() * 0.5).toFixed(1)
          }));

          const excelente = sortearAleatorios(COMENTARIOS_EXCELENTES, 1).map((texto) => ({
            nome: nomesSorteados[4],
            texto,
            nota: (4.5 + Math.random() * 0.5).toFixed(1)
          }));

          gerados = [...ruins, ...bons, ...excelente];
        }

        // Embaralha para que os comentários bons e ruins fiquem distribuídos naturalmente
        const finalReviews = gerados.sort(() => 0.5 - Math.random());

        let description = 'Sinopse não disponível para esta edição.';
        if (typeof data.description === 'string') {
          description = data.description;
        } else if (data.description?.value) {
          description = data.description.value;
        }

        let authorName = 'Autor da obra';
        if (data.authors && data.authors.length > 0) {
          const firstAuthor = data.authors[0];
          const authorKey = firstAuthor?.author?.key || firstAuthor?.key;

          if (authorKey) {
            try {
              const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
              if (authorRes.ok) {
                const authorData = await authorRes.json();
                authorName = authorData.name || authorName;
              }
            } catch {
              authorName = 'Autor da obra';
            }
          }
        }

        const coverId = data.covers && data.covers.length > 0 ? data.covers[0] : null;
        const image =
          coverId && coverId > 0
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : `https://picsum.photos/seed/${encodeURIComponent(data.title || 'livro')}/400/600`;

        if (isMounted) {
          setReviewsList(finalReviews);
          setBook({
            id: (data.key || id).replace('/works/', ''),
            title: data.title || 'Título indisponível',
            author: authorName,
            description: description,
            image: image,
            price: 44.9,
            oldPrice: 56.0,
            discount: '-20%',
            rating: averageRating,
            reviewsCount: ratingsCount,
            pages: 320,
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

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showAlert('⚠️ Você precisa fazer login para adicionar livros ao carrinho!');
      setTimeout(() => {
        navigate('/login');
      }, 1600);
      return;
    }

    if (book) {
      addToCart(book, quantity);
      showAlert(`✓ ${quantity}x "${book.title}" adicionado ao carrinho!`);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      showAlert('⚠️ Você precisa fazer login para comprar!');
      setTimeout(() => {
        navigate('/login');
      }, 1600);
      return;
    }

    if (book) {
      addToCart(book, quantity);
      navigate('/carrinho');
    }
  };

  return (
    <div className="container product-page">
      {alertMessage && (
        <div className="cart-toast-alert">
          <i className="ph ph-check-circle" style={{ fontSize: '20px' }}></i>
          <span>{alertMessage}</span>
          <Link to="/carrinho" className="toast-cart-link">Ver carrinho</Link>
        </div>
      )}

      <div className="catalog-back-wrapper">
        <Link to="/catalogo" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      {loading ? (
        <div className="product-layout skeleton-product">
          <div className="skeleton-product-thumb"></div>
          <div className="skeleton-product-info">
            <div className="skeleton-line" style={{ width: '70%', height: '32px' }}></div>
            <div className="skeleton-line" style={{ width: '40%', height: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '30%', height: '36px', marginTop: '20px' }}></div>
            <div className="skeleton-line" style={{ width: '100%', height: '100px', marginTop: '20px' }}></div>
          </div>
        </div>
      ) : error || !book ? (
        <div className="empty-state">
          <i className="ph ph-warning-circle empty-icon" style={{ color: 'var(--danger, #ef4444)' }}></i>
          <h3>Livro não encontrado</h3>
          <p>{error || 'As informações deste item não estão disponíveis no momento.'}</p>
          <Link to="/catalogo" className="btn btn-primary">
            Voltar ao catálogo
          </Link>
        </div>
      ) : (
        <>
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
                <span className="reviews-count">({book.reviewsCount} avaliações na comunidade)</span>
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
                  <button type="button" onClick={handleDecrease} className="qty-btn" title="Diminuir">
                    <i className="ph ph-minus"></i>
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button type="button" onClick={handleIncrease} className="qty-btn" title="Aumentar">
                    <i className="ph ph-plus"></i>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn btn-secondary-outline btn-lg"
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn btn-primary btn-lg"
                >
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
                type="button"
                className={`tab-btn ${activeTab === 'sinopse' ? 'active' : ''}`}
                onClick={() => setActiveTab('sinopse')}
              >
                Sinopse
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'informacoes' ? 'active' : ''}`}
                onClick={() => setActiveTab('informacoes')}
              >
                Informações Técnicas
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'avaliacoes' ? 'active' : ''}`}
                onClick={() => setActiveTab('avaliacoes')}
              >
                Avaliações ({reviewsList.length})
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
                      <dt>Páginas estimadas</dt>
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
                        <i className="ph-fill ph-star-half"></i>
                      </div>
                      <span>Média oficial da comunidade com base em avaliações verificadas</span>
                    </div>

                    {/* Lista com os 5 comentários garantidos */}
                    <div
                      className="reviews-user-list"
                      style={{
                        marginTop: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                      }}
                    >
                      {reviewsList.map((rev, index) => (
                        <div
                          key={index}
                          className="review-card"
                          style={{
                            padding: '16px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '8px'
                            }}
                          >
                            <strong style={{ fontSize: '14px', color: '#1e293b' }}>
                              {rev.nome}
                            </strong>
                            <span
                              style={{
                                color: Number(rev.nota) >= 4.0 ? '#f59e0b' : '#ef4444',
                                fontSize: '14px',
                                fontWeight: 'bold'
                              }}
                            >
                              ★ {rev.nota}
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                            "{rev.texto}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}