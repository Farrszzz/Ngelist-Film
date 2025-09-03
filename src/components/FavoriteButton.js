import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ movie, size = 24, style }) => {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites();
  
  const isMovieFavorite = isFavorite(movie.id);

  const handlePress = () => {
    if (isLoaded) {
      toggleFavorite(movie);
    }
  };

  // Show loading indicator if favorites haven't loaded yet
  if (!isLoaded) {
    return (
      <TouchableOpacity style={[styles.button, style]} disabled>
        <ActivityIndicator size="small" color="#999" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={[styles.button, style]}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, { fontSize: size }]}>
        {isMovieFavorite ? '❤️' : '🤍'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  icon: {
    textAlign: 'center',
  },
});

export default FavoriteButton;