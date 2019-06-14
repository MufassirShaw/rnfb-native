import React, { Component } from 'react';
import { View, Text, Button, Icon } from 'native-base';
import Sound from 'react-native-sound';
import {StyleSheet} from "react-native";

export default class AudioMessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // sound :null
    };
  }



  playMessage = (uri)=>{
      var sound;
      // These timeouts are a hacky workaround for some issues with react-native-sound.
      // See https://github.com/zmxv/react-native-sound/issues/89.
      setTimeout(() => {
         sound = new Sound("https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3", '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
          }
        });    

        setTimeout(() => {
          sound.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }, 100);
      }, 100);
    }


  render() {
    const {uri, id} = this.props; 
    console.log(uri,id)
    return (
      <View transparent style={styles.messageBubble}>
        <Button success style={styles.btn} onPress={()=>{this.playMessage(uri)}}>
    
          <Icon name="play" fontSize={40}/>       
          
        </Button>
        <Button danger style={styles.btn} onPress={()=>{this.playMessage(uri)}}>
            <Icon name="trash" fontSize={40}/>   
        </Button>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    messageBubble:{
        // flex:1,
        backgroundColor:"#ccc",
        width:250,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent:"flex-start",
    },
    btn:{
      borderRadius:5,
      width: 50,
      marginRight:5,
      justifyContent:"center",
      height:55,

    }

});