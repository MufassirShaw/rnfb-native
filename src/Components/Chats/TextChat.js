import React, { Component } from 'react';
import { Container, Content,Text, Thumbnail, Button, View, Body, Icon, Footer, Input} from "native-base";


class TextChat extends Component {
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
      const id = this.props.navigation.getParam("id")
    return (
        <Container>
            <Container style={{flex:1}}>
                <Content style={{flex:1,}}>
                        <View style={{ flex:1,}}>
                            <Text> Messages Here </Text>
                        </View>
                </Content>
            </Container>

            <Footer style={{ 
                            backgroundColor:"#fff", 
                            borderWidth:2, 
                            borderRadius:2,
                            borderColor:"rgba(1,1,1,.3)"
                    }}>
                <Input style={{ flex:4 }}               
                        placeholder="your message....."
                />
                <Button transparent style={{flex:1,backgroundColor:"#2E7D32",borderRadius:2, height:50.5}}>
                    <Icon name='send' type="MaterialIcons" style={{color:"#fff",fontSize:40}} />
                </Button>
            </Footer>
          
        </Container>
    );
  }
}


export default TextChat;