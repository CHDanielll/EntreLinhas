import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import './Carrinho.css';

export default function Carrinho() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const shippingFee = subtotal > 150 || cart.length === 0 ? 0 : 15.0;
  const total = subtotal + shippingFee;

  return (
    <div className="container cart-page">
      <div className="catalog-back-wrapper">
        <Link to="/catalogo" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Continuar comprando</span>
        </Link>
      </div>

      <h1 className="cart-title">
        Carrinho de Compras <span>({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
      </h1>

      {cart.length === 0 ? (
        <div className="empty-state cart-empty">
          <i className="ph ph-shopping-bag-open empty-icon"></i>
          <h3>Seu carrinho está vazio</h3>
          <p>Explore nosso catálogo e encontre suas próximas histórias.</p>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar livros
          </Link>
        </div>
      ) : (
        <div className="cart-grid-layout">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Livro</span>
              <span>Quantidade</span>
              <span>Preço</span>
              <span></span>
            </div>

            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.title} className="cart-thumb-img" />
                    <div>
                      <Link to={`/livro/${item.id}`} className="cart-book-title">
                        {item.title}
                      </Link>
                      <p className="cart-book-author">{item.author}</p>
                      <span className="cart-unit-price">
                        R$ {Number(item.price).toFixed(2).replace('.', ',')} cada
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-quantity">
                    <div className="quantity-selector">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        title="Diminuir"
                      >
                        <i className="ph ph-minus"></i>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        title="Aumentar"
                      >
                        <i className="ph ph-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-subtotal">
                    <strong>
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </strong>
                  </div>

                  <div className="cart-item-remove">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remover item"
                    >
                      <i className="ph ph-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions-footer">
              <button type="button" className="clear-cart-link" onClick={clearCart}>
                Esvaziar carrinho
              </button>
            </div>
          </div>

          <aside className="order-summary-card">
            <h2>Resumo do Pedido</h2>

            <div className="summary-row">
              <span>Subtotal ({totalItems} itens)</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="summary-row">
              <span>Frete</span>
              <span>
                {shippingFee === 0 ? (
                  <strong className="free-shipping">Grátis</strong>
                ) : (
                  `R$ ${shippingFee.toFixed(2).replace('.', ',')}`
                )}
              </span>
            </div>

            {subtotal < 150 && (
              <p className="free-shipping-tip">
                Faltam <strong>R$ {(150 - subtotal).toFixed(2).replace('.', ',')}</strong> para frete grátis!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block btn-checkout"
              onClick={() => alert('Próximo passo: Checkout / Pagamento!')}
            >
              Fechar Pedido
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}