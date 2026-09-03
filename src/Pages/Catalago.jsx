import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Catalago.css';

const CATEGORIES = [
  { label: 'Todos', value: 'livros' },
  { label: 'Mais Populares', value: 'bestseller' },
  { label: 'Ficção', value: 'ficcao' },
  { label: 'Romance', value: 'romance' },
  { label: 'Fantasia', value: 'fantasia' },
  { label: 'Suspense', value: 'suspense' },
  { label: 'Terror', value: 'terror' },
  { label: 'Desenvolvimento', value: 'autoajuda' },
  { label: 'Biografias', value: 'biografias' }
];

export default function Catalago() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('categoria') || 'livros';
  const query = searchParams.get('busca') || selectedCategory;

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      setLoading(true);

      try {
        const searchTermParam = query.trim() || 'livros';
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTermParam)}&limit=60`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('API indisponível');

        const data = await response.json();
        const docs = data.docs || [];

        if (isMounted) {
          const validBooks = docs
            .filter((item) => item.title && (item.author_name || item.authors))
            .map((item, index) => {
              const coverId = item.cover_i || item.cover_id;
              const image = coverId
                ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                : `https://picsum.photos/seed/${encodeURIComponent(item.title)}/300/450`;

              const authors = item.author_name
                ? item.author_name.slice(0, 2).join(', ')
                : 'Autor desconhecido';

              const basePrice = 29.9 + (index % 7) * 5.5;
              const hasDiscount = index % 3 === 0;

              return {
                id: item.key || String(index),
                title: item.title,
                author: authors,
                rating: (4.0 + (index % 10) * 0.1).toFixed(1),
                price: basePrice,
                oldPrice: hasDiscount ? basePrice * 1.25 : null,
                discount: hasDiscount ? '-20%' : null,
                image
              };
            });

          if (sortBy === 'price-asc') validBooks.sort((a, b) => a.price - b.price);
          if (sortBy === 'price-desc') validBooks.sort((a, b) => b.price - a.price);

          setBooks(validBooks);
        }
      } catch {
        if (isMounted) {
          setBooks([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [query, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ busca: searchTerm.trim() });
    }
  };

  const handleCategoryChange = (val) => {
    setSearchTerm('');
    if (val === 'livros') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: val });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy('relevance');
    setSearchParams({});
  };

  return (
    <div className="catalog-page container">
      <div className="catalog-back-wrapper">
       
        <Link to="/home" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Voltar para o início</span>
        </Link>
      </div>

      <div className="catalog-top-bar">
        <form className="search-bar catalog-search" onSubmit={handleSearchSubmit}>
          <i className="ph ph-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Buscar por título ou autor e pressione Enter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setSearchTerm('');
                setSearchParams({});
              }}
            >
              <i className="ph ph-x"></i>
            </button>
          )}
        </form>

        <div className="catalog-sort">
          <label htmlFor="sort-select">Ordenar por:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select-input"
          >
            <option value="relevance">Mais relevantes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
        </div>
      </div>

      <div className="catalog-layout">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filtros</h3>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Limpar filtros
            </button>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Gênero</h4>
            <div className="filter-options">
              {CATEGORIES.map((cat) => (
                <label key={cat.value} className="checkbox-label">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.value}
                    onChange={() => handleCategoryChange(cat.value)}
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="catalog-content">
          <div className="catalog-results-count">
            <span>
              Exibindo <strong>{books.length}</strong> livros em{' '}
              <strong>
                {CATEGORIES.find((c) => c.value === selectedCategory)?.label || 'Todos'}
              </strong>
            </span>
          </div>

          {loading ? (
            <div className="book-grid catalog-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-thumb"></div>
                  <div className="skeleton-line" style={{ width: '80%' }}></div>
                  <div className="skeleton-line" style={{ width: '50%' }}></div>
                  <div className="skeleton-line" style={{ width: '40%', height: '24px' }}></div>
                </div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <div className="book-grid catalog-grid">
              {books.map((book) => {
                const bookRouteId = book.id.replace('/works/', '');
                return (
                  <article key={book.id} className="book-card">
                    <div className="card-thumb">
                      {book.discount && <span className="badge badge-discount">{book.discount}</span>}
                      <button className="wishlist-btn" title="Favoritar">
                        <i className="ph ph-heart"></i>
                      </button>
                      <Link to={`/livro/${bookRouteId}`}>
                        <img src={book.image} alt={book.title} loading="lazy" />
                      </Link>
                    </div>
                    <div className="card-info">
                      <Link to={`/livro/${bookRouteId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                      <Link to={`/livro/${bookRouteId}`} className="btn btn-primary btn-block">
                        Ver detalhes
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <i className="ph ph-magnifying-glass empty-icon"></i>
              <h3>Nenhum livro encontrado para sua busca.</h3>
              <p>Tente buscar por outro termo ou categoria.</p>
              <button className="btn btn-primary" onClick={handleClearFilters}>
                Ver todos os livros
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}