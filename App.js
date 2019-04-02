import React, {Component} from 'react';
import { Container, Button, Text } from 'native-base';
import {Provider} from "react-redux";
import {Store} from "./src/Store";
import Form from "./src/Components/Form/index";
import Contacts from  "./src/Components/Contacts/index";
import SplashScreen from "react-native-splash-screen";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import RNfirebase from 'react-native-firebase';


class App extends Component{

  componentDidMount(){
    SplashScreen.hide() 
  }

  
  render() {
    const reactNativeFirebaseConfig = {
      debug: true
    };
    
    const firebase = RNfirebase;

    console.log(firebase);
    
    const rrfConfig = {
      enableRedirectHandling: false,
      userProfile: 'Users',
      useFirestoreForProfile: true,
      // updateProfileOnLogin: true
    };
    
    const rrfProps = {
         firebase,
         config: rrfConfig,
         dispatch: Store.dispatch,
         createFirestoreInstance 
    }
    
  
    return (
        <Provider store={Store}>
          <ReactReduxFirebaseProvider {...rrfProps} >
          <Container>
            <Form/>
          </Container>
          </ReactReduxFirebaseProvider>
        </Provider> 
    );
  }

}


export default App;