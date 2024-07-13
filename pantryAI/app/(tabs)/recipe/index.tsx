import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  ListRenderItem,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@expo-google-fonts/raleway";
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

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  hours: string;
  image: string;
}

//this data will be fetched from what user saved after recipe is generated
//it will be stored in data base with user info
const data: Restaurant[] = [
  {
    id: "1",
    name: "Santa Maria Pizzeria",
    address: "160 New Cavendish St, Fitzrovia, London W1W 6YR",
    rating: 4.8,
    hours: "11:30AM to 11PM",
    image: "https://link-to-your-image.com/image1.jpg",
  },
  {
    id: "2",
    name: "Mazi Greek",
    address: "12-14 Hillgate St, Kensington, London W8 7SR",
    rating: 4.8,
    hours: "11:30AM to 11PM",
    image: "https://link-to-your-image.com/image2.jpg",
  },
  // Add more items here
];

export default function Recipe() {
  const [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Restaurant[]>(data);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //searches by name
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const renderItem: ListRenderItem<Restaurant> = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.hours}>{item.hours}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 10 }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Bookmark</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E5ECF9",
    backgroundColor: "#E5ECF9",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#888",
  },
  hours: {
    fontSize: 14,
    color: "#888",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
