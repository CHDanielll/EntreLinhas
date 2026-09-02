import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './Login.css';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { loginUser, registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSwitchTab = (toRegister) => {
    setIsRegister(toRegister);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validação estrita: impede campos em branco
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (isRegister) {
      if (!name.trim()) {
        setErrorMessage('O campo Nome é obrigatório para o cadastro.');
        return;
      }

      const result = registerUser(name, email, password);
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      navigate('/home');
    } else {
      const result = loginUser(email, password);
      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      navigate('/home');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-logo login-logo">
            <i className="ph ph-book-open-text"></i>
            <span className="logo-title">EntreLinhas</span>
          </div>
          <h2>{isRegister ? 'Crie sua conta' : 'Bem-vindo de volta'}</h2>
          <p>
            {isRegister
              ? 'Preencha seus dados para criar sua conta de leitor.'
              : 'Faça login para gerenciar seu carrinho e salvar favoritos.'}
          </p>
        </div>

        <div className="login-tabs">
          <button
            type="button"
            className={`tab-toggle ${!isRegister ? 'active' : ''}`}
            onClick={() => handleSwitchTab(false)}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`tab-toggle ${isRegister ? 'active' : ''}`}
            onClick={() => handleSwitchTab(true)}
          >
            Cadastrar
          </button>
        </div>

        {errorMessage && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="ph ph-warning-circle" style={{ fontSize: '18px' }}></i>
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <div className="input-field">
              <label htmlFor="name">Nome completo *</label>
              <input
                type="text"
                id="name"
                placeholder="Ex: Daniel Souza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-field">
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Senha *</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-submit">
            {isRegister ? 'Cadastrar e entrar' : 'Entrar na conta'}
          </button>
        </form>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button
          type="button"
          className="btn-guest"
          onClick={() => navigate('/home')}
        >
          <i className="ph ph-eye"></i>
          Quero só dar uma espiada
        </button>
      </div>
    </div>
  );
}