import React, { Component } from 'react';
import { View, Text, Button, Icon, Spinner } from 'native-base';
import Sound from 'react-native-sound';
import {StyleSheet} from "react-native";

export default class AudioMessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      loading: false
     };
     this.sound = null;
  }

  playMessage = (uri)=>{
    
    if(this.state.playing && this.sound){
      this.sound.stop();
      this.setState({
        playing:false,
        loading:false
      })
    
    }else{
        this.setState({
          loading:true
        })
      
      this.sound = new Sound(uri, null, (e) => {
        if (e) {
          console.log('error loading track:', e)
          this.setState({
            playing:false,
            loading:false
          })
        } else {
 
          if(this.sound.isLoaded()){    
            this.setState({
              playing:true,
              loading:false
            })  
          }
         

          this.sound.play((success)=>{

            if(success){
              this.setState({
                playing:false,
                loading:false
              })
              this.sound.release();
            }
          })
        }
      })
    }

  }

deleteMessage = (uri)=>{

}

  render() {
    const {uri, id} = this.props;
    const btnIcon = this.state.playing && !this.state.loading
              ? 
            "stop"
              :
              this.state.loading
                ? 
                "spinner" 
          :"play";
    return (
      <View transparent style={styles.messageBubble}>
        <Button success={!this.state.playing} danger={this.state.playing} style={styles.btn} onPress={()=>{this.playMessage(uri)}}>
          {
            btnIcon==="spinner"
             ?
              <Spinner style={{color:"#fff"}} size={40}/>
             :
            <Icon name={btnIcon} type="FontAwesome" fontSize={40}/>       

          }
          
        </Button>
        <Button warning style={styles.btn} onPress={()=>{this.deleteMessage(uri)}}>
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