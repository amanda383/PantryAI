import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome, Fontisto,Ionicons,SimpleLineIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold, Nunito_500Medium, Nunito_600SemiBold } from '@expo-google-fonts/nunito'
import { useState } from 'react'
import { commonStyles } from '@/styles/common/common.styles'
import { ScrollView, Image } from 'react-native'
import { TextInput } from 'react-native'
import { router } from 'expo-router'

export default function LoginScreen() {
    const [isPasswordVisible, setPasswordVisible] =useState(false);
    const [buttonSpinner, setButtonSpinner] =useState(false)
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })

    const [required, setRequired] =useState("")
    const [error,setError] =useState({
        password: ""
    })
    let [fontsloaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    if(!fontsloaded && !fontError){
        return null;
    }

    
    //checking password validation to make sure that it has enough security
    const handlePasswordValidation = (value:string) => {
        const password = value;
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
        const passwordOneNumber = /(?=.*[0-9])/;
        const passwordSixValue = /(?=.{6,})/;
        
        if(!passwordSpecialCharacter.test(password)){
            setError({
                ...error,
                password: "Write at least one special character"
            });
            setUserInfo({...userInfo, password: ""})
        }else if(!passwordOneNumber.test(password)){
            setError({
                ...error,
                password: "Write at least one number"
            });
            setUserInfo({...userInfo, password: ""})
        }else if(!passwordSixValue.test(password)){
            setError({
                ...error,
                password: "Write at least 6 characters"
            });
            setUserInfo({...userInfo, password: ""})
        }else{
            setError({
                ...error,
                password: ""
            });
            setUserInfo({...userInfo, password: value})
        }
    }

    const handleSignIn =() => {
        
    }

  return (
    //background gradient
    //adding a sign in image, and text for login 
    //adding input styles for form information
    <LinearGradient colors={["#E5ECF9", "F6F7F9", "#E8EEF9"]} style={{flex:1, paddingTop:20 }}>
        <ScrollView>
            <Image
            style={styles.signInImage}
            source={require("@/assets/sign-in/signin.png")}
            />
            <Text style={[styles.welcomeText,{fontFamily:"Raleway_700Bold"}]}>
            Welcome Back!
            </Text>
            <Text style={styles.subtext}>
            Login to your existing account
            </Text>
            <View style={styles.inputContainer}>
                <View>
                    <TextInput 
                        style={[commonStyles.input, {paddingLeft:40}]}
                        keyboardType='email-address'
                        value={userInfo.email}
                        placeholder='support@PantryAI.com'
                        onChangeText={(value)=> 
                            setUserInfo({...userInfo,email:value})}

                    />
                    <Fontisto 
                        style={{position:"absolute", left: 26, top: 17.8}}
                        name='email'
                        size={20}
                        color={"#99ABC1"}
                    />
                    {required && (
                        <View style={commonStyles.errorContainer}>
                            <Entypo name="cross" size={18} color={"red"}  />
                        </View>
                    )}
                    <View style={{marginTop: 15}}>
                        <TextInput 
                            style={[commonStyles.input, {paddingLeft:40}]}
                            keyboardType='default'
                            secureTextEntry={!isPasswordVisible}
                            defaultValue=''
                            placeholder='Password'
                            onChangeText={handlePasswordValidation}
                        />

                        <TouchableOpacity 
                        style={styles.visibleIcon}
                        onPress={()=> setPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? (
                            <Ionicons
                                name="eye-off-outline"
                                size={23}
                                color={"#99ABC1"}
                            />
                            ) : (
                            <Ionicons name="eye-outline" size={23} color={"#99ABC1"} />
                            )}
                        </TouchableOpacity>
                        <SimpleLineIcons 
                            style={styles.icon2}
                            name='lock'
                            size={20}
                            color={"#99ABC1"}
                        />
                    </View>
                    {error.password &&(
                        <View style={[commonStyles.errorContainer, {top:145}]}>
                            <Entypo name="cross" size={18} color={"red"} />
                            <Text style={styles.errorText}>{error.password}</Text>
                        </View>
                    )}
                   
                </View>
                <TouchableOpacity onPress={()=>router.push("/(routes)/forgot-password")}>
                    <Text style={[styles.forgotSection, {fontFamily:"Nunito_600SemiBold"}]}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 16, borderRadius:8,marginHorizontal: 16, backgroundColor: "#14293A"}} onPress={handleSignIn}>
                    {
                        buttonSpinner ? (
                            <ActivityIndicator size="small" color={"white"} />
                        ) : (
                            <Text style={{color: "white", textAlign: "center", fontSize: 16, fontFamily:"Raleway_700Bold"}}>Sign In</Text>
                        )
                    }

                </TouchableOpacity>
            
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:'center', marginTop:-10, marginBottom: -10}}>
                <TouchableOpacity>
                    <FontAwesome name='google' size={30} />
                    </TouchableOpacity>
                </View>
                

                <View style={styles.signupRedirect}>
                    <Text style={{fontSize: 18, fontFamily: "Raleway_600SemiBold"}}> Don't have an account?</Text>
                    <TouchableOpacity
                    onPress={()=>router.push("/(routes)/sign-up")}
                    >
                        <Text style={{fontSize:18, fontFamily:"Raleway_600SemiBold", color:"#14293A", marginLeft:5}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    signInImage:{
        width: "60%",
        height: 250,
        alignSelf: "center",
        marginTop: 50,
        // resizeMode: "contain",
        // paddingTop:4
    },
    welcomeText:{
        textAlign: "center",
        fontSize: 24,
    },
    subtext:{
        textAlign: "center",
        color:"#14293A",
        fontSize: 15,
        marginTop: 5
    },
    inputContainer:{
        marginHorizontal: 16,
        marginTop: 30,
        rowGap: 30,
    },
    visibleIcon:{
        position: 'absolute',
        right: 30,
        top: 15,
    },
    icon2:{
        position: 'absolute',
        left: 24,
        top: 17.8,
        marginTop: -2,
    },
    errorText:{
        color: 'red',
        fontSize: 11,
        marginTop: -1,
    },
    forgotSection:{
        marginHorizontal: 16,
        textAlign: 'right',
        fontSize: 16,
        marginTop: -20,
        color:"#14293A"
    },
    signupRedirect:{
        flexDirection: 'row',
        marginHorizontal: 16,
        justifyContent: "center",
        // marginBottom: 20,
        // marginTop: 20,
        
    }

    
})