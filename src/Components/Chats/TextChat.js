import React, { Component } from 'react';
import { Container,Content , Text, Thumbnail, Button, View, Spinner} from "native-base";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase, withFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import {createRoom , newMessage} from "./../../Actions/Chats"
import {GiftedChat} from "react-native-gifted-chat"


class TextChat extends Component {

  constructor(props) {
    super(props);

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
      messages : []
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

    this.props.sendMessage({newThread: newMessages, chatId:this.state.chatId})
  }


  _loading = ()=>{
    return (
      <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Spinner style={{
          flex:1,
          height:600,
          width:600
        }}/>
      </Content>
    )
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const chatPath = nextProps.chat && nextProps.chat.text && nextProps.chat.text[prevState.chatId] ;
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

  render() {

    if(this.state.fetching || this.props.chatStatus.loading ){
      return (
        <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Spinner style={{
            flex:1,
            height:600,
            width:600
          }}/>
        </Content>
      )
    }else if(this.state.messages === null ){
      this.props.createChat(this.state.chatId);
      return (
        <Content contentContainerStyle={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <Spinner style={{
            flex:1,
            height:600,
            width:600
          }}/>
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
        return (
          <GiftedChat
            renderLoading = {this._loading}
            messages={messages.thread}
            onSend={this.onSend}
            user={sender}
            showUserAvatar
            isAnimated={true}
            renderSystemMessage = {this.renderSystemMessage }
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
    createChat : (chatId)=>(dispatch(createRoom(ownProps,chatId,true))),
    sendMessage : (data)=>(dispatch(newMessage(ownProps,data,true))),
  };
};

const TextChatEnhanced = compose(
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
      doc : "text" , 
      subcollections: [
        {collection:`${chatId}` , doc: "messages"}
      ] 
    }
    return [ path]
  })
)(TextChat);

export default class TextChatContainer extends Component {
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
    return <TextChatEnhanced navigation={navigation} sender={{phoneNumber, photoUrl}}/>;
  }
}
