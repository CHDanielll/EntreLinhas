import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('@EntreLinhas:user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('@EntreLinhas:registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('@EntreLinhas:user', JSON.stringify(user));
      } else {
        localStorage.removeItem('@EntreLinhas:user');
      }
    } catch (err) {
      console.error('Erro ao salvar sessão ativa:', err);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('@EntreLinhas:registered_users', JSON.stringify(registeredUsers));
    } catch (err) {
      console.error('Erro ao salvar lista de usuários:', err);
    }
  }, [registeredUsers]);

  const registerUser = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const exists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      return { success: false, message: 'Este e-mail já está cadastrado no sistema!' };
    }

    const newUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: cleanEmail,
      password: password.trim()
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setUser({ name: newUser.name, email: newUser.email });
    return { success: true };
  };

  const loginUser = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return {
        success: false,
        message: 'Usuário não encontrado! Por favor, faça seu cadastro primeiro.'
      };
    }

    if (found.password !== password.trim()) {
      return {
        success: false,
        message: 'Senha incorreta! Verifique os dados digitados.'
      };
    }

    setUser({ name: found.name, email: found.email });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        registerUser,
        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}