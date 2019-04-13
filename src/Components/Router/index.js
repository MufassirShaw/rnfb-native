import React from "react"
import { Button, Text } from "react-native"
import { createStackNavigator, createAppContainer } from "react-navigation"
import Contacts from "./../Contacts/index"
import AddContacts from "./../Contacts/AddContacts"


const AppNavigator = createStackNavigator({
    Contacts: Contacts,
    AddContacts:AddContacts
  },{
    defaultNavigationOptions:{
        initialRouteName: "Contacts",
        headerStyle:{
          backgroundColor:"#3F51B5",
          color:"#fff",
        },
        headerTintColor:"#fff",
        headerTitleStyle:{
          flex: 1,
          textAlign:"center",
          color:"#fff"
        }
    }
})

export default createAppContainer(AppNavigator)
  
  
