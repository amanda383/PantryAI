import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import Constants from "expo-constants";

// Define a type for the recipe item
type RecipeItem = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number; // Add cook time
  instructions: string;
  ingredients: {
    name: string;
    image: string;
  }[];
};

export default function GenerateFoodScreen() {
  const params = useLocalSearchParams();
  const router = useRouter(); // For navigation
  let recipes: RecipeItem[] = [];

  // Parse recipes from params and handle potential errors
  try {
    recipes = JSON.parse(params.recipes as string);
  } catch (error) {
    console.error("Error parsing recipes:", error);
  }

  // State to manage the current recipe index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle generating the next recipe
  const handleGenerateAgain = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  // Function to handle bookmarking the current recipe
  const handleBookmark = async () => {
    const recipe = recipes[currentIndex];
    try {
      await axios.post(
        `${Constants.manifest?.extra?.backendUrl}/bookmark`, // Replace with your backend URL
        { recipeId: recipe.id },
        {
          headers: {
            Authorization: `Bearer ${Constants.manifest?.extra?.userToken}`, // Replace with actual token if needed
          },
        }
      );
      Alert.alert("Success", "Recipe bookmarked successfully");
    } catch (error) {
      console.error("Error bookmarking recipe:", error);
      Alert.alert("Error", "Failed to bookmark recipe. Please try again.");
    }
  };

  // Get the current recipe based on the index
  const recipe = recipes[currentIndex];

  // Function to handle navigation to home screen
  const handleHomePress = () => {
    router.push("/(tabs)"); // Adjust the route as necessary
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={styles.linearGradient}
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        {recipe ? (
          <>
            <Text style={styles.header}>{recipe.title}</Text>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.subHeader}>Cook Time:</Text>
            <Text style={styles.details}>{recipe.readyInMinutes} minutes</Text>
            <Text style={styles.subHeader}>Ingredients:</Text>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
                  <Image
                    source={{ uri: ingredient.image }}
                    style={styles.ingredientImage}
                  />
                  <Text style={styles.ingredientName}>- {ingredient.name}</Text>
                </View>
              ))
            ) : (
              <Text>No ingredients available</Text>
            )}
            <Text style={styles.subHeader}>Instructions:</Text>
            <Text style={styles.instructions}>{recipe.instructions}</Text>
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={handleBookmark}
            >
              <Text style={styles.bookmarkButtonText}>Bookmark</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noRecipe}>No recipe available</Text>
        )}
        <TouchableOpacity
          style={styles.generateagain}
          onPress={handleGenerateAgain}
        >
          <Text style={styles.bookmarkButtonText}>Generate Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 70,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ingredientImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  ingredientName: {
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    marginTop: 8,
  },
  linearGradient: {
    flex: 1,
  },
  noRecipe: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
  bookmarkButton: {
    backgroundColor: "#14293A",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  bookmarkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  generateagain: {
    backgroundColor: "#14293A",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
  },
  homeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#14293A",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
