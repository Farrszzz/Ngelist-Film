import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // ganti YOUR_API_KEY dengan API key dari themoviedb.org
    axios
      .get("https://api.themoviedb.org/3/movie/popular?api_key=5861cb9e53079bb2856291746a63cd12&language=en-US&page=1")
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Film Populer</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Rating: {item.vote_average}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  card: { backgroundColor: "#fff", padding: 16, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
});
