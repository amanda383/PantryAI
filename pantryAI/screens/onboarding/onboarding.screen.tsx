//onboarding screen when they first load page
//features logo, name, short intro, getting started button
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { Raleway_600SemiBold, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '@/styles/onboarding/onboard'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export default function OnBoardingScreen() {
    let [fontsloaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Raleway_600SemiBold,

    });

    if(!fontsloaded && !fontError){
        return null;
    }
  return (
    //backgroundcolor is a lovely navy blue gradient
    //touchableopacity for the button to proceed to welcome intro
    <LinearGradient colors={["#14293A","#F6F7F9"]} style={{flex: 1, alignItems:"center", justifyContent: 'center'}}>
        <View style={styles.firstContainer}>
          <View> 
              <Image 
                source={require("@/assets/images/pantryailogo.png")}
                style={styles.logo}
              /> 
          </View>
          <View>
            <Image
                source={require("@/assets/images/robot.png")}
                style={styles.robot}
              />
          </View>
          <View>
          <Text style={[styles.description, {fontFamily:"Raleway_700Bold"}]}> Put on your cooking hats and <Text style={{ color:'#14293A' }}>PantryAI</Text> </Text>
          </View>
          <TouchableOpacity style={styles.buttonWrapper} onPress={()=> router.push("/(routes)/welcome-intro")}>
            <Text style={[styles.buttonText, {fontFamily: "Nunito_700Bold"}]}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

