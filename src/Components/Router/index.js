
import { createStackNavigator, createAppContainer } from "react-navigation"
import Contacts from "./../Contacts/index"
import AddContacts from "./../Contacts/AddContacts"
import SelectChat from "./../SelectChat/index"
import AudioChat from "./../Chats/AudioChat";
import TextChat from "./../Chats/TextChat";
const AppNavigator = createStackNavigator({
    Contacts: Contacts,
    AddContacts:AddContacts,
    SelectChat : SelectChat,
    AudioChat: AudioChat,
    TextChat: TextChat
  },{
    defaultNavigationOptions:{
        initialRouteName: "Contacts",
        headerStyle:{
          backgroundColor:"#3F51B5",
          color:"#fff",
        },
        headerTintColor:"#fff",
        headerTitleStyle:{
          textAlign:"left",
          color:"#fff",
        }
    }
})

export default createAppContainer(AppNavigator)
  
  
