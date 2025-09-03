import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import FavoriteButton from '../components/FavoriteButton';

const { width } = Dimensions.get('window');

const DetailFilmScreen = ({ route }) => {
  const { film } = route.params;

  // Use different container styles for web vs native
  const ContainerComponent = Platform.OS === 'web' ? 'div' : View;
  const containerStyle = Platform.OS === 'web' 
    ? {
        flex: 1,
        backgroundColor: '#1a1a1a',
        overflow: 'auto',
        height: '100vh',
      }
    : styles.container;

  const content = (
    <>
      {/* Movie Poster */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: film.poster_path
              ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }}
          style={styles.poster}
          resizeMode="cover"
        />
      </View>

      {/* Movie Details */}
      <View style={styles.detailsContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{film.title}</Text>
          <FavoriteButton movie={film} size={32} style={styles.favoriteButton} />
        </View>

        {/* Release Date & Rating */}
        <View style={styles.infoRow}>
          {film.release_date && (
            <Text style={styles.releaseDate}>
              {new Date(film.release_date).getFullYear()}
            </Text>
          )}
          {film.vote_average && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.rating}>
                {film.vote_average.toFixed(1)}/10
              </Text>
            </View>
          )}
        </View>

        {/* Overview */}
        {film.overview ? (
          <View style={styles.overviewContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{film.overview}</Text>
          </View>
        ) : (
          <View style={styles.overviewContainer}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.noOverview}>No overview available.</Text>
          </View>
        )}

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          {film.genre_ids && film.genre_ids.length > 0 && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Genre IDs:</Text>
              <Text style={styles.infoValue}>
                {film.genre_ids.join(', ')}
              </Text>
            </View>
          )}
          
          {film.original_language && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Language:</Text>
              <Text style={styles.infoValue}>
                {film.original_language.toUpperCase()}
              </Text>
            </View>
          )}

          {film.popularity && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Popularity:</Text>
              <Text style={styles.infoValue}>
                {Math.round(film.popularity)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );

  if (Platform.OS === 'web') {
    return (
      <div style={containerStyle}>
        <StatusBar barStyle="light-content" />
        {content}
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  posterContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  poster: {
    width: Platform.OS === 'web' ? Math.min(width * 0.6, 300) : width * 0.6,
    height: Platform.OS === 'web' ? Math.min(width * 0.9, 450) : width * 0.9,
    borderRadius: 12,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#2a2a2a',
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  releaseDate: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: '600',
  },
  overviewContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    textAlign: 'justify',
  },
  noOverview: {
    fontSize: 16,
    color: '#888888',
    fontStyle: 'italic',
  },
  additionalInfo: {
    borderTopWidth: 1,
    borderTopColor: '#444444',
    paddingTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default DetailFilmScreen;