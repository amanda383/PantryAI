import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const commonStyles = StyleSheet.create({
container:{
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
},
buttonContainer:{
    backgroundColor:"#99ABC1",
    width: responsiveWidth(88),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal:5,
},
dotStyle:{
    backgroundColor: "#E9E4DE",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
},
activeDotStyle:{
    backgroundColor: "#99ABC1",
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
},
title:{
    fontSize: hp("3.5%"),
    textAlign:'center'
},
description:{
    fontSize: hp("2.5%"),
    textAlign:'center',
    color: "#99ABC1"
},
sortDescription:{
    fontSize: hp("2.5%"),
    textAlign:'center',
    color: "#99ABC1"
},
welcomeButtonStyle:{
    backgroundColor: "#14293A",
    width: responsiveWidth(88),
    height: responsiveHeight(5.5),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 'auto'
},
input:{
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: 'white',
    color: "#99ABC1"
},
errorContainer:{
    flexDirection: "row",
    alignItems:"center",
    marginHorizontal:16,
    position: 'absolute',
    top: 60,
}
})