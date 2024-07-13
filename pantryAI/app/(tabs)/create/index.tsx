import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
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
import * as ImagePicker from "expo-image-picker";


export default function Create() {
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

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = () => {
    router.push("/(routes)/camera");
  };

  return (

      <LinearGradient
        colors={["#E5ECF9", "#F6F7F9", "#E8EEF9"]}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Let's look into your pantry</Text>
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>
              <Text style={styles.buttonIcon}>📷 </Text>
              Open Camera & Take Photo
            </Text>
          </TouchableOpacity>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.uploadText}>Select file</Text>
          </TouchableOpacity>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/generate")} //change to only be able to generate when they upload or take a picture
            >
              <Text
                style={[styles.createtext, { fontFamily: "Nunito_700Bold" }]}
              >
                Create Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Raleway_700Bold",
    color: "#14293A",
  },
  uploadBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "#14293A",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    color: "#E8EEF9",
    marginBottom: 25,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E5ECF9",
    fontFamily: "Raleway_600SemiBold",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#14293A",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: "Raleway_600SemiBold",
    color: "#14293A",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    aspectRatio: 2,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#14293A",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E5ECF9",
    fontFamily: "Raleway_600SemiBold",
  },
  buttonIcon: {
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
  },
  buttonWrapper: {
    backgroundColor: "#14293A",
    paddingVertical: 18,
    borderRadius: 10,
    width: "100%",
  },
  createtext: {
    textAlign: "center",
    color: "#E5ECF9",
  },
});
