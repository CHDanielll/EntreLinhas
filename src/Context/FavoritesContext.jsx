import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('@EntreLinhas:favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('@EntreLinhas:favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Erro ao salvar favoritos', err);
    }
  }, [favorites]);

  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === book.id);
      if (exists) {
        return prev.filter((item) => item.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const isFavorite = (bookId) => {
    return favorites.some((item) => item.id === bookId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        totalFavorites: favorites.length
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
}