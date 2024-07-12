import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions = {({route}) => ({
            tabBarIcon: ({color}) => {
                let iconName;
                if(route.name === "index"){
                    iconName = require("@/assets/icons/home.png")
                }else if(route.name === "create/index"){
                    iconName = require("@/assets/icons/plus.png")
                }else if(route.name === "recipe/index"){
                    iconName = require("@/assets/icons/bookmark.png")
                }else if(route.name === "profile/index"){
                    iconName = require("@/assets/icons/profile.png")
                }
                return(
                    <Image 
                    style= {{width:25,height:25,tintColor:color}}
                    source={iconName}
                    />
                )
            },
            headerShown: false,
            tabBarShowLabel: false
        })}
    >
        <Tabs.Screen name = 'index' />
        <Tabs.Screen name = 'create/index' />
        <Tabs.Screen name = 'recipe/index' />
        <Tabs.Screen name = 'profile/index' />

    </Tabs>
  )
}

const styles = StyleSheet.create({})