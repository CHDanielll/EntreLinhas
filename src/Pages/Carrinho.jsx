import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import './Carrinho.css';

export default function Carrinho() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();


  const [cep, setCep] = useState('');
  const [shippingOption, setShippingOption] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState('');

 
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [orderCompleted, setOrderCompleted] = useState(null);

  // Frete
  const handleCalculateShipping = (e) => {
    e.preventDefault();
    setShippingError('');
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      setShippingError('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setShippingLoading(true);
    setTimeout(() => {
      setShippingLoading(false);
      // Compra maior q 150 = frete grátis, caso contrário frete de 15,90
      const isFree = subtotal >= 150;
      setShippingOption({
        type: isFree ? 'Econômica (Frete Grátis)' : 'Padrão EntreLinhas',
        price: isFree ? 0 : 15.9,
        days: '3 a 6 dias úteis'
      });
    }, 600);
  };

  // Cupons
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();

    if (code === 'POPETOEMALUCO') {
      setAppliedCoupon({ code: 'POPETOEMALUCO', discountRate: 0.3, label: '30% de desconto especial' });
      setCouponInput('');
    } else if (code === 'LIVRO10') {
      setAppliedCoupon({ code: 'LIVRO10', discountRate: 0.1, label: '10% de desconto' });
      setCouponInput('');
    } else if (code === 'ENTRELINHAS') {
      setAppliedCoupon({ code: 'ENTRELINHAS', freeShipping: true, label: 'Frete Grátis' });
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido! Tente "POPETOEMALUCO", "LIVRO10" ou "ENTRELINHAS".');
    }
  };

  
  const discountValue = appliedCoupon?.discountRate ? subtotal * appliedCoupon.discountRate : 0;
  let finalShippingPrice = shippingOption ? shippingOption.price : 0;
  if (appliedCoupon?.freeShipping) {
    finalShippingPrice = 0;
  }
  const orderTotal = Math.max(0, subtotal - discountValue + finalShippingPrice);

  const handleOpenCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleFinalizePurchase = () => {
    const orderId = `EL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCompleted({
      id: orderId,
      itemsCount: cart.length,
      total: orderTotal,
      payment: paymentMethod.toUpperCase(),
      date: new Date().toLocaleDateString('pt-BR')
    });
    clearCart();
  };

  return (
    <div className="container cart-page">
      <div className="catalog-back-wrapper">
        <Link to="/home" className="back-btn">
          <i className="ph ph-arrow-left"></i>
          <span>Continuar comprando</span>
        </Link>
      </div>

      <h1 className="section-title" style={{ marginBottom: '24px' }}>Meu Carrinho</h1>

      {cart.length === 0 && !orderCompleted ? (
        <div className="empty-state">
          <i className="ph ph-shopping-cart empty-icon"></i>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione histórias e aventuras à sua estante digital agora mesmo.</p>
          <Link to="/catalogo" className="btn btn-primary">
            Explorar catálogo
          </Link>
        </div>
      ) : orderCompleted ? (
        
        <div className="empty-state" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
          <i className="ph ph-check-circle" style={{ fontSize: '64px', color: '#16a34a', marginBottom: '16px' }}></i>
          <h2>Compra realizada com sucesso!</h2>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            Obrigado pela compra, <strong>{user?.name || 'Leitor'}</strong>! Enviamos a confirmação detalhada para seu e-mail cadastrado.
          </p>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px',
              margin: '24px 0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div><strong>Código do Pedido:</strong> #{orderCompleted.id}</div>
            <div><strong>Data:</strong> {orderCompleted.date}</div>
            <div><strong>Forma de Pagamento:</strong> {orderCompleted.payment}</div>
            <div><strong>Total Pago:</strong> R$ {orderCompleted.total.toFixed(2).replace('.', ',')}</div>
            <div><strong>Status:</strong> Pagamento aprovado / Em separação</div>
          </div>

          <Link to="/catalogo" className="btn btn-primary btn-block">
            Voltar ao Catálogo de Livros
          </Link>
        </div>
      ) : (
        
        <div className="cart-grid-layout">
          {/* Lista de Itens */}
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.title} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <Link to={`/livro/${item.id}`} className="cart-item-title">
                    {item.title}
                  </Link>
                  <span className="cart-item-author">{item.author}</span>
                  <div className="cart-item-price">
                    R$ {Number(item.price).toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="cart-qty-wrapper">
                  <div className="quantity-selector">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      <i className="ph ph-minus"></i>
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <i className="ph ph-plus"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="cart-remove-btn"
                    title="Remover item"
                  >
                    <i className="ph ph-trash"></i> Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fim do pedido com todos valores*/}
          <aside className="cart-summary-sidebar">
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Resumo do Pedido</h3>

            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Calcular Frete:
              </label>
              <form onSubmit={handleCalculateShipping} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="00000-000"
                  maxLength="9"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button type="submit" className="btn btn-secondary-outline" style={{ padding: '8px 16px' }}>
                  {shippingLoading ? '...' : 'Calcular'}
                </button>
              </form>
              {shippingError && (
                <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {shippingError}
                </span>
              )}
              {shippingOption && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#16a34a' }}>
                  ✓ {shippingOption.type}:{' '}
                  {appliedCoupon?.freeShipping || shippingOption.price === 0
                    ? 'Grátis'
                    : `R$ ${shippingOption.price.toFixed(2).replace('.', ',')}`}{' '}
                  ({shippingOption.days})
                </div>
              )}
            </div>

            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Cupom de Desconto:
              </label>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Ex: LIVRO10 ou ENTRELINHAS"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button type="submit" className="btn btn-secondary-outline" style={{ padding: '8px 16px' }}>
                  Aplicar
                </button>
              </form>
              {couponError && (
                <span style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  {couponError}
                </span>
              )}
              {appliedCoupon && (
                <span style={{ color: '#16a34a', fontSize: '13px', marginTop: '4px', display: 'block' }}>
                  ✓ Cupom {appliedCoupon.code} aplicado ({appliedCoupon.label})!
                </span>
              )}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />

           
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            {discountValue > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#16a34a' }}>
                <span>Desconto ({appliedCoupon.code}):</span>
                <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span>Frete:</span>
              <span>
                {shippingOption
                  ? finalShippingPrice === 0
                    ? 'Grátis'
                    : `R$ ${finalShippingPrice.toFixed(2).replace('.', ',')}`
                  : 'Não calculado'}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '2px dashed #e2e8f0',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1e293b'
              }}
            >
              <span>Total:</span>
              <span>R$ {orderTotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <button
              type="button"
              onClick={handleOpenCheckout}
              className="btn btn-primary btn-block"
              style={{ marginTop: '24px', padding: '14px' }}
            >
              Finalizar Compra
            </button>
          </aside>
        </div>
      )}

      
      {isCheckoutOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '20px' }}>Finalizar Pagamento</h3>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
              >
                <i className="ph ph-x"></i>
              </button>
            </div>

            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
              Selecione o método de pagamento para concluir seu pedido:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  border: `2px solid ${paymentMethod === 'pix' ? 'var(--brand-primary, #7c3aed)' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                />
                <i className="ph ph-qr-code" style={{ fontSize: '22px', color: '#10b981' }}></i>
                <div>
                  <strong>Pix</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Aprovação imediata</span>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  border: `2px solid ${paymentMethod === 'cartao' ? 'var(--brand-primary, #7c3aed)' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cartao'}
                  onChange={() => setPaymentMethod('cartao')}
                />
                <i className="ph ph-credit-card" style={{ fontSize: '22px', color: '#3b82f6' }}></i>
                <div>
                  <strong>Cartão de Crédito</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Até 3x sem juros</span>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  border: `2px solid ${paymentMethod === 'boleto' ? 'var(--brand-primary, #7c3aed)' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'boleto'}
                  onChange={() => setPaymentMethod('boleto')}
                />
                <i className="ph ph-barcode" style={{ fontSize: '22px', color: '#f59e0b' }}></i>
                <div>
                  <strong>Boleto Bancário</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>Vencimento em 3 dias</span>
                </div>
              </label>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
                <span>Itens:</span>
                <span>{cart.length} título(s)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                <span>Valor Final:</span>
                <span>R$ {orderTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              style={{ padding: '14px' }}
              onClick={() => {
                setIsCheckoutOpen(false);
                handleFinalizePurchase();
              }}
            >
              Confirmar e Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}