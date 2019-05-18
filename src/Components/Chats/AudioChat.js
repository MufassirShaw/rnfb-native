import React, { Component } from 'react';
import { Container, Content,Text, Thumbnail, Button, View, Body, Icon, Footer } from "native-base";


class AudioChat extends Component {
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
    return (
        <Container style={{flex:1}}>
            <Container style={{flex:4}}>
                <Content style={{flex:1,}}>
                        <View style={{ flex:1,}}>
                            <Text> Messages Here </Text>
                        </View>
                </Content>
            </Container>
            <Footer style={{flex:1, flexDirection:"row",alignItems:"center", justifyContent:"center", borderRadius:4}}>
            
                <Button style={{flex:1, height:100, justifyContent:"center", borderRadius:4}} >
                  <Icon name='mic' type="MaterialIcons" style={{color:"#fff",fontSize:70}} />
                </Button>
            </Footer>
        </Container>
    );
  }
}


export default AudioChat;