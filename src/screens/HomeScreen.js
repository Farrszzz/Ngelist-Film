import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";

const API_KEY = "5861cb9e53079bb2856291746a63cd12"; // ganti dengan API Key TMDB
const BASE_URL = "https://api.themoviedb.org/3";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('DetailFilmScreen', { film: movie });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Film Populer</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handleMoviePress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Rating: {item.vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 16, marginBottom: 10, borderRadius: 8 },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cardContent: { 
    flex: 1, 
    marginRight: 10 
  },
  title: { fontSize: 16, fontWeight: "bold" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
