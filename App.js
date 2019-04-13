import React, {Component} from 'react'
import { Container, Button, Text, Thumbnail, View} from 'native-base'
import Form from "./src/Components/Form/index"
import Contacts from  "./src/Components/Contacts/index"
import SplashScreen from "react-native-splash-screen"
import {connect} from "react-redux"
import Navigtion from "./src/Components/Router/index"
import {firebaseConnect, withFirebase, isLoaded, isEmpty} from "react-redux-firebase"
import {compose } from "redux";
import {signOut} from "./src/Actions/AuthActions"
import Spinner from "react-native-loading-spinner-overlay"
class App extends Component{

  componentDidMount(){
    SplashScreen.hide() 
  }

  
  render() {
    const {profile, auth} = this.props.firebase;
    if(!(profile.isLoaded && auth.isLoaded)){
      return( 
        <Container>
          <Spinner
            visible={true}
            overlayColor="#3F51B5"
            stye={{ borderWidth: 12, borderColor: "green",}}
            children={
              <View style={{
                flex:1,
                alignItems:"center",
                justifyContent: 'center',
              }} >
                  <Thumbnail
                      source={require("./assets/imgs/logo.png")} 
                      style={{height:150, width:150}}
                  />             
                  <Text style={{color:"#fff", fontSize:20, justifyContent:"center"}}>Loading....</Text>
              </View>
            }
          />        
        </Container>
      )
    }
    return (
          <Container>
            {
              auth.uid && profile.photoUrl
              ?
              <Navigtion screenProps={{ // These props are accesable by every screen
                signOut: this.props.signout, 
                profile
              }}
              />
              :
              <Form profile={profile} uid={auth.uid}/>  //TODO Change auth Profile             
            }
          </Container>
    );
  }

}

const mapStateToProps = (state)=>{
  return {
    firebase: state.firebaseReducer
  }
}


const mapDispatchToProps = (dispatch, ownProps)=>{
  return{
    signout : ()=>(dispatch(signOut(ownProps)))
  }
}


export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
) (App);