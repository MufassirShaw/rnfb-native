import { Container, Text, Thumbnail, Button, View, Body, Icon } from "native-base";
import React, { Component } from 'react';
import {StyleSheet} from "react-native";

class SelectChat extends Component { 
    static navigationOptions = (navProps) => {
      const { profile, signOut} = navProps.screenProps;
      const phoneNumber =  navProps.navigation.getParam('phoneNumber');
      const photoUrl =  navProps.navigation.getParam('photoUrl');

      return {
        headerLeft: (
          <Thumbnail
            style={{ marginLeft: 2 }}
            circular
            source={{ uri: photoUrl }}
          />
        ),
        headerRight: (
          <Button
            danger
            rounded
            style={{
              borderWidth: 1,
              borderColor: "#fff",
              marginTop: 5,
              marginLeft: 2
            }}
            onPress={signOut}
          >
            <Text>Logout</Text>
          </Button>
        ),
        title: phoneNumber
      };
    };
  
  
    render() {
      const {navigation }= this.props
      const phoneNumber =  navigation.getParam('phoneNumber');
      const photoUrl =  navigation.getParam('photoUrl');
      const id =  navigation.getParam('id');

      return (
        <View style={{  
          flex:1
        }} 
      >
        <Body style={{flex:1, alignItems:'center',justifyContent:'center',}}>
          <Button style={{
            ...styles.btn,
            backgroundColor:"#D9B912"
          }} 
            onPress={()=>{
              navigation.navigate("TextChat",{
                photoUrl: photoUrl,
                phoneNumber : phoneNumber,
                id: id
              })              
            }}
          
          >
              <Thumbnail square source={require("./../../..//assets/imgs/keyboard.png")} style={styles.icon} />
          </Button>    
          
          
          <Button  style={{
              ...styles.btn,
              backgroundColor:"#2E7D32"
            }}
            onPress={()=>{
              navigation.navigate("AudioChat",{
                photoUrl: photoUrl,
                phoneNumber : phoneNumber,
                id: id
              })              
            }}
          >
              <Thumbnail square source={require("./../../..//assets/imgs/speaker.png")} style={styles.icon} />
          </Button>    
        </Body>
      </View>
      );
    }
  }
  
  
  export default SelectChat;




  
const styles = StyleSheet.create({
  btn:{
    width:250,
    height:180,
    textAlign:"center",
    justifyContent:"center",
    marginBottom:30
  },
  icon:{
    // fontSize:100,
    height:120,
    width:120
  },
});