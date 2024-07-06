import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Button from '@/components/button/button'
import { router } from 'expo-router'

export default function VerifyAccountScreen() {
    const [code, setCode] = useState(new Array(4).fill(''))

    const inputs = useRef<any>([...Array(4)].map(()=> React.createRef()))

    {/* handling input generate new code */}
    const handleInput = (text:any, index:any) =>{
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        {/* logic for moving to next index when inputing number */}
        if(text && index < 3){
            inputs.current[index + 1].current.focus();
        }

        if(text === "" && index>0){
            inputs.current[index-1].current.focus();
        }
    }

    const handleSubmit = ()=> {

    }

  return (
    <View style={styles.container}>
        <Text style={styles.headertext}>
            Verification Code</Text>
        <Text style={styles.subText}>
        We have sent the verification code to your email address
      </Text>
       {/* input container for verification code */}
       <View style={styles.inputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleInput(text, index)}
            value={code[index]}
            ref={inputs.current[index]}
            autoFocus={index === 0}
          />
        ))}
      </View>
     <View style={{marginTop: 10}}>
        <Button 
        title="submit"
        onPress={handleSubmit}/>
     </View>
     <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
          Back To?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "white"
    },
    headertext:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText:{
        fontSize: 16,
        color: "#14293A",
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer:{
        flexDirection: "row",
        marginBottom: 20,
    }, 
    inputBox:{
        width:60,
        height: 60,
        borderWidth:1,
        borderColor:"#ddd",
        textAlign: "center",
        marginRight:10,
        borderRadius: 10,
        fontSize: 20,

    },
    loginLink: {
        flexDirection: "row",
        marginTop: 30,
      },
      loginText: {
        color: "#14293A",
        marginLeft: 5,
        fontSize: 16,
      },
    
      backText: { fontSize: 16 },
})