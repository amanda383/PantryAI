//features: welcome intro descriptions
//with sliders that can scroll left and right to showcase description
// features: welcome intro descriptions
// with sliders that can scroll left and right to showcase description
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Raleway_700Bold } from '@expo-google-fonts/raleway';
import { useFonts } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { onboardingSwiperData } from '@/constants/constants';
import { router } from 'expo-router';
import { commonStyles } from '@/styles/common/common.styles';
import { styles } from '@/styles/onboarding/onboard';

export default function WelcomeIntroScreen() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //rendering the constant data information for the welcome intro screen 
  //being able to call image on top and then the title, description after
  const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
    <LinearGradient
      colors={["#E5ECF9", "F6F7F9", "#E8EEF9"]}
      style={{ flex: 1, paddingHorizontal: 10 }}
    >
      <View style={{ marginTop: 80 }}>
        <Image
          source={item.image}
          style={{ alignSelf: "center", marginBottom: 0, width:220, height:200 }}
        />
        <Text style={[commonStyles.title, { fontFamily: 'Raleway_700Bold' }]}>
          {item.title}
        </Text>
        <View style={{ marginTop: 15 }}>
          <Text style={[commonStyles.description, { fontFamily: "Nunito_400Regular" }]}>
            {item.description}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  //rendering button for next slide 
  const renderNextButton = () => (
    <View style={commonStyles.welcomeButtonStyle}>
      <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
        Next
      </Text>
    </View>
  );

  //rendering button for done slide when in AppIntroSlider onDone we proceed to login screen
  const renderDoneButton = () => (
    <View style={commonStyles.welcomeButtonStyle}>
      <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
        Done
      </Text>
    </View>
  );

  return (
    // swiper information with data
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        router.push("/(routes)/login");
      }}
      onSkip={() => {
        router.push("/(routes)/login");
      }}
      //calling render buttons
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      showSkipButton={false}
      dotStyle={commonStyles.dotStyle}
      bottomButton={true}
      activeDotStyle={commonStyles.activeDotStyle}
    />
  );
}
