import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
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
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen() {
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

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 10 }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome to PantryAI</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Looking for a delicious meal?</Text>
          <Text style={styles.description}>
            Just scan your fridge and let our chefbots do the work
          </Text>
        </View>
        <Image
          source={require("@/assets/images/homerobo.png")}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push("/(tabs)/create")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Create Now
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Raleway_700Bold",
    color: "#14293A",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    fontFamily: "Nunito_500Medium",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: hp("2%"),
    textAlign: "center",
    color: "#99ABC1",
  },
  image: {
    width: wp("80%"),
    height: hp("40%"),
    alignSelf: "center",
    marginTop: 20,
  },
  buttonWrapper: {
    backgroundColor: "#14293A",
    paddingVertical: 18,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
