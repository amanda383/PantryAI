import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
// import { SPOONACULAR_API_KEY } from "@";

interface Item {
  id: string;
  name: string;
}

const initialItems: Item[] = [
  { id: "1", name: "Tomatoes" },
  { id: "2", name: "Chicken" },
  { id: "3", name: "Cucumber" },
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

export default function GeneratedlistScreen() {
  const [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleDietaryPress = () => {
    console.log("Dietary button pressed", selectedDietary);
  };

  const handleGeneratePress = async () => {
    if (!selectedDietary) {
      console.log("No dietary option selected");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            dietaryRestrictions: selectedDietary,
            // apiKey: SPOONACULAR_API_KEY,
          },
        }
      );
      console.log("Data fetched:", response.data);
      // Process response data here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        <FlatList
          data={initialItems}
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
        >
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

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
  },
  pickerContainer: {
    marginTop: 20,
    textAlign: "center",
    alignContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 70,
  },
  buttonWrapper: {
    backgroundColor: "#14293A",
    paddingVertical: 18,
    borderRadius: 4,
    marginTop: 40,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    alignContent: "center",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    alignContent: "center",
  },
});
