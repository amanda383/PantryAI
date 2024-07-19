import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
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

export default function Profile() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  //make the buttons such as settings and edits work and be able to update backend with database
  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 10 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <View style={styles.nameEditContainer}>
            <Text style={styles.username}>John Doe</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bio}>
            This is a short bio about John Doe. Passionate about coding and
            coffee.
          </Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>john.doe@example.com</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoText}>+123 456 7890</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoText}>123 Main St, Anytown, USA</Text>
          </View>
        </View>

        {/*Last generated recipe can be recalled here */}
        <View style={styles.activitySection}>
          <Text style={styles.activityHeader}>Recent Activities</Text>
          <Text style={styles.activityText}> Last Generate Recipe</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 70,
    paddingHorizontal: 10,
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
  settingsButton: {
    backgroundColor: "#14293A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  settingsButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameEditContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14293A",
  },
  editProfileButton: {
    backgroundColor: "#14293A",
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  editProfileButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14293A",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#14293A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 50,
    alignItems: "center",
  },
  activitySection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  activityHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#14293A",
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});
