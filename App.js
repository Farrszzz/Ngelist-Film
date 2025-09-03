import React from "react";
import { SafeAreaView, StyleSheet } from "react-native"; // ✅ tambahkan StyleSheet
import HomeScreen from "./src/screens/HomeScreen";
import DetailFilmScreen from "./src/screens/DetailFilmScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FavoritesProvider } from "./src/context/FavoritesContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="DetailFilmScreen" 
            component={DetailFilmScreen}
            options={{ title: 'Movie Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
