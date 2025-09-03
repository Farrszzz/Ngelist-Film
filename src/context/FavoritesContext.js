import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = '@movie_favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from AsyncStorage when app starts
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveFavoritesToStorage = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  };

  const toggleFavorite = async (movie) => {
    try {
      const isFavorite = favorites.some(fav => fav.id === movie.id);
      let newFavorites;
      
      if (isFavorite) {
        // Remove from favorites
        newFavorites = favorites.filter(fav => fav.id !== movie.id);
      } else {
        // Add to favorites
        newFavorites = [...favorites, movie];
      }
      
      // Update state
      setFavorites(newFavorites);
      
      // Save to AsyncStorage
      await saveFavoritesToStorage(newFavorites);
      
      console.log(`Movie "${movie.title}" ${isFavorite ? 'removed from' : 'added to'} favorites`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  const clearAllFavorites = async () => {
    try {
      setFavorites([]);
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      console.log('All favorites cleared');
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      clearAllFavorites,
      isLoaded, // Useful for showing loading state
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};