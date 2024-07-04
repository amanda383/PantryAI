//onboarding screen when they first load page
//features logo, name, short intro, continue with email button
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


export const styles = StyleSheet.create({
    firstContainer:{
        alignItems:"center",
        height:'55%'
        
    },
    logo:{
        width: 230,
        height: 120,
        resizeMode: "contain"
    },
    robot:{
        width: 380,
        height: 220,
        resizeMode:'contain'
    },
    description:{
        alignItems: 'center',
        fontSize: hp("2%"),
        color: '#E9E4DE'
    },
    buttonWrapper:{
        backgroundColor:"#14293A",
        width: wp("92%"),
        paddingVertical: 18,
        borderRadius: 4,
        marginTop: 40,
    },
    buttonText:{
        color: 'white',
        textAlign: 'center'
    },
})