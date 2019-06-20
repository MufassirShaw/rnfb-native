import React, { Component } from 'react';
import { Container,Content, View, Text, Thumbnail, Button,  Spinner, Icon} from "native-base";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {createRoom , newMessage, sendAudioMessage} from "./../../Actions/Chats";
import {GiftedChat, Bubble} from "react-native-gifted-chat"
import {PermissionsAndroid, Platform, StyleSheet } from 'react-native';

import {AudioRecorder, AudioUtils} from 'react-native-audio';
import AudioMessageBubble from "./AudioMessage";
import {playAudio} from "./../../utils";

class AudioChat extends Component {

  constructor(props) {
    super(props);
    this.sound = null;
    const loggedInUserId = props.firebase.auth().currentUser.uid;
    const {sender} = this.props;

    const friendId = props.navigation.getParam('id');
    const friendPhotoUrl = props.navigation.getParam('photoUrl');
    const firendPhoneNumber = props.navigation.getParam('phoneNumber');
    
    const chatId  = friendId > loggedInUserId ? `${friendId}${loggedInUserId}` : `${loggedInUserId}${friendId}`;
    
    this.state = {
      fetching: true,
      sender:{
        _id:loggedInUserId,
        avatar:sender.photoUrl
      },
      reciver:{
        _id: friendId,
        avatar: friendPhotoUrl,
      },
      chatId, 
      messages : [],
    
    //audio recording and playing state

      currentTime: 0.0,
      recording: false,
      finished: false,
      audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
      hasPermission: undefined,
      disableBtn:false      
    }
  }


  componentDidMount() {
   this.sound = playAudio("record_message.mp3");
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
        }
      };
    });
  }
  
  componentWillUnmount() {
    if(this.sound){
      this.sound.stop();
      this.sound.release();
    } 
  }

  prepareRecordingPath = (audioPath)=>{
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }


  
  async _stop() {
    this.setState({disableBtn:true})
    const {messages,chatId,reciver} = this.state;
    
    AudioRecorder
    .stopRecording()
    .then((filePath)=>{
        this.setState({finished: true, recording: false, disableBtn:false});
        this.props.sendMessage(filePath, {messages:messages,chatId,reciver})
    })
    .catch ((error)=>{
        console.error(error);
    })
  }


  renderBubble = (props)=>{
    const {uri, _id}= props.currentMessage;
    return(
      <View>
        <AudioMessageBubble uri={uri} id={_id}/>
        <Bubble {...props} 
          wrapperStyle={{
            left: {
              backgroundColor: '#fff',
            },
            right: {
              backgroundColor: '#ECEFF1'
            }
          }}
        
        />
      </View>
    );
  }


  async _record() {

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }
    this.prepareRecordingPath(this.state.audioPath);

    try {
      this.setState({recording: true, finished:false});
      await AudioRecorder.startRecording();
    
    } catch (error) {
      console.error(error);
    }
  }


  onSend = (msg)=>{
    msg[0].createdAt = `${msg[0].createdAt.toString()}`; 
    const {chat} = this.props;
    const messages = chat.text[this.state.chatId].messages;
    let newMessages = messages.thread 
      ?
    [
      msg[0],
      ...messages.thread
    ]
      : 
    [msg[0]];

  }


  _loading = ()=>{
    return (
      <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Spinner style={{
          flex:1,
        }}
        size={60}
        />
      </Content>
    )
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const chatPath = nextProps.chat && nextProps.chat.audio && nextProps.chat.audio[prevState.chatId];
    if(isLoaded(chatPath) && chatPath){
      const messages = chatPath.messages;
      return {
        ...prevState,
        fetching: false,
        messages
      }    
    }
    return {
      ...prevState
    }
}

  renderSystemMessage  = (props)=> {
    return (
      <Container style={{alignItems:"center", justifyContent:"center"}}>
          <Thumbnail source={{uri:"https://i.stack.imgur.com/qLdPt.png"}} square style={{height: 200, width:200 , flex: 1, borderWidth:2}}/>
      </Container>
    )
  }


  _renderSend = (props)=>{
    return <View ></View>
  }

  _renderComposer = ()=>{
    return (
      <Content contentContainerStyle={{
            flex:1, 
            flexDirection:'row', 
            alignItems:"center", 
            justifyContent:"center",
          }}>
        {
          this.state.recording 
            ?
            <Button rounded onPress={()=>{this._stop()}} disabled={this.state.disableBtn} 
              style={{
                width:100,
                height:100,
                justifyContent:"center",
              }}
              danger
            >
              <Icon name="stop" type="FontAwesome" style={{color:"#fff", fontSize:60}}/>
            </Button>
            : 
            <Button rounded onPress={()=>{this._record()}} disabled={this.state.disableBtn} style={{
              width:100,
              height:100,
              justifyContent:"center",  
            }}>
                <Icon name="microphone" type="FontAwesome"  style={{color:"#fff", fontSize:80}}/>
            </Button>
        }
      </Content>
    )
  }

  render() {

    if(this.state.fetching || this.props.chatStatus.loading ){
      return (
        <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Spinner style={{
            flex:1,
          }}
          size={60}
          />
        </Content>
      )
    }else if(this.state.messages === null ){
      this.props.createChat(this.state.chatId);
      return (
        <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Spinner style={{
            flex:1,
          }} size={60}/>
        </Content>
      )
    }else{
      const {messages,sender} = this.state;
      const systemMsg = [
        {
          _id: 1,
          // createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          // Any additional custom parameters are passed through
        }
        
      ]
      const msgs = [{
        _id: 1,
        text: 'My message',
        createdAt: Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      }]
        return (
          <GiftedChat
            renderLoading = {this._loading}
            messages={messages.thread}
            user={sender}
            showUserAvatar
            isAnimated={true}
            dateFormat = "DD-MM-YYYY"
            renderSystemMessage = {this.renderSystemMessage }
            renderSend = {this._renderSend}
            renderComposer = {this._renderComposer}
            renderBubble = {this.renderBubble}
            renderChatFooter={(props)=>{
              return <View style={{marginTop:60,}}></View>
            }}
         />
        );
    }

  }
  
}



const mapStateToProps = state => {
  return {
    chatStatus: state.chatReducer.chatState,
    chat :state.firestoreReducer.data.Chat
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createChat : (chatId)=>(dispatch(createRoom(ownProps,chatId,false))),
    sendMessage: (filePath,chatInfo)=>(dispatch(sendAudioMessage(ownProps,filePath,chatInfo))),
  };
};

const AudioChatEnhanced = compose(
  withFirebase,
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect((props) =>{ 
    
    const loggedInUserId = props.firebase.auth().currentUser.uid;
    const friendId = props.navigation.getParam('id');
    const chatId  = friendId > loggedInUserId ? `${friendId}${loggedInUserId}` : `${loggedInUserId}${friendId}`;

    const path = { 
      collection: 'Chat',
      doc : "audio" , 
      subcollections: [
        {collection:`${chatId}` , doc: "messages"}
      ] 
    }
    return [ path]
  })
)(AudioChat);

export default class AudioChatContainer extends Component {
  static navigationOptions = (navProps) => {
    const { profile, signOut} = navProps.screenProps;
    const phoneNumber =  navProps.navigation.getParam('phoneNumber');
    const photoUrl =  navProps.navigation.getParam('photoUrl');
    const id =  navProps.navigation.getParam('id');
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
    
    const navigation = this.props.navigation;
    const {profile:{
      phoneNumber,
      photoUrl
    }} = this.props.screenProps;
    return <AudioChatEnhanced navigation={navigation} sender={{phoneNumber, photoUrl}}/>;
  }
}




var styles = StyleSheet.create({
  playBtn:{

  },
  stopBtn:{

  }
});
