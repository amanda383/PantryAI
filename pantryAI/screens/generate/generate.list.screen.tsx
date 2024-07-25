// screens/GeneratedlistScreen.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold, Nunito_500Medium, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import Constants from "expo-constants"; // Import Constants for accessing environment variables
import { useRouter } from "expo-router";

interface Item {
  id: string;
  name: string;
}
//list of example ingredients once ai is finished the list will be updated here
const initialItems: Item[] = [
  { id: "1", name: "Tomatoes" },
  { id: "2", name: "Chicken" },
  { id: "3", name: "Cucumber" },
  { id: "4", name: "Onions" },
  { id: "5", name: "Garlic" },
  { id: "6", name: "Bell Peppers" },
  { id: "7", name: "Carrots" },
  { id: "8", name: "Potatoes" },
  { id: "9", name: "Spinach" },
  { id: "10", name: "Olive Oil" },
  { id: "11", name: "Lemon" },
  { id: "12", name: "Chickpeas" },
  { id: "13", name: "Broccoli" },
  { id: "14", name: "Zucchini" },
  { id: "15", name: "Mushrooms" },
  { id: "16", name: "Eggplant" },
  { id: "17", name: "Tomato Paste" },
  { id: "18", name: "Chicken Broth" },
  { id: "19", name: "Coriander" },
  { id: "20", name: "Cumin" },
  // Add more items here
];

const dietaryOptions = [
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Keto", value: "keto" },
  { label: "Paleo", value: "paleo" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "Low-Carb", value: "low-carb" },
  { label: "Dairy-Free", value: "dairy-free" },
  { label: "Nut-Free", value: "nut-free" },
  { label: "Soy-Free", value: "soy-free" },
  { label: "Low-Sodium", value: "low-sodium" },
  { label: "Low-Sugar", value: "low-sugar" },
  { label: "Whole30", value: "whole30" },
  { label: "Halal", value: "halal" },
  { label: "Kosher", value: "kosher" },
];

const fetchRecipeDetails = async (recipeId: number) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
        },
      }
    );

    // Log the entire response to inspect its structure
    console.log(
      "Recipe Details Response:",
      JSON.stringify(response.data, null, 2)
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching details for recipe ${recipeId}:`, error);
    return null;
  }
};

const GeneratedlistScreen = () => {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
  });
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const router = useRouter();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleGeneratePress = async () => {
    if (!selectedDietary) {
      Alert.alert("Error", "No dietary option selected");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            food: items.map((item) => item.name).join(","),
            diet: selectedDietary,
            apiKey: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
          },
        }
      );

      const recipeIds = response.data.results.map(
        (recipe: { id: number }) => recipe.id
      );
      const recipeDetailsPromises = recipeIds.map((id: number) =>
        fetchRecipeDetails(id)
      );
      const recipesDetails = await Promise.all(recipeDetailsPromises);

      const validRecipes = recipesDetails.filter((details) => details !== null);

      // Log validRecipes to see its structure
      console.log(
        "Detailed Data fetched:",
        JSON.stringify(validRecipes, null, 2)
      );

      router.push({
        pathname: "/generatefood",
        params: { recipes: JSON.stringify(validRecipes) },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error",
        "Failed to fetch data. Check your API key and try again."
      );
    } finally {
      setLoading(false);
    }
  };


  const handleAddItem = () => {
    if (newItem.trim().length === 0) {
      Alert.alert("Error", "Item name cannot be empty");
      return;
    }

    setItems((prevItems) => [
      ...prevItems,
      { id: (prevItems.length + 1).toString(), name: newItem },
    ]);
    setNewItem("");
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Items</Text>
        </View>
        <TouchableOpacity
          style={styles.missingItemsButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Missing Item</Text>
        </TouchableOpacity>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedDietary(value)}
            items={dietaryOptions}
            placeholder={{ label: "Select Dietary Option", value: null }}
            style={pickerSelectStyles}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={handleGeneratePress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Generate"}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item name"
              value={newItem}
              onChangeText={setNewItem}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.addButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 70,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14293A",
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "Nunito_500Medium",
  },
  pickerContainer: {
    marginTop: 20,
  },
  buttonWrapper: {
    backgroundColor: "#14293A",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 60,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Nunito_500Medium",
  },
  missingItemsButton: {
    backgroundColor: "#14293A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginBottom: 10,
  },
  modalView: {
    margin: 40,
    marginTop: 80,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#14293A",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontFamily: "Nunito_600SemiBold",
  },
  closeButton: {
    backgroundColor: "#8B0000",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    fontFamily: "Nunito_500Medium",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
    fontFamily: "Nunito_500Medium",
  },
});

export default GeneratedlistScreen;
