/** @format */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Store} from "./src/Store"
import { createFirestoreInstance } from 'redux-firestore'
import RNfirebase from 'react-native-firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import {Provider} from "react-redux"
import React from 'react';



const reactNativeFirebaseConfig = {
    debug: true
  };
  
  const firebase = RNfirebase;
  
  const rrfConfig = {
    enableRedirectHandling: false,
    userProfile: 'Users',
    useFirestoreForProfile: true,
    // updateProfileOnLogin: false
  };
  
  const rrfProps = {
       firebase,
       config: rrfConfig,
       dispatch: Store.dispatch,
       createFirestoreInstance 
  }
  

  const Root = ()=>{
      return (
        <Provider store={Store}>
            <ReactReduxFirebaseProvider {...rrfProps} >
                <App/>
            </ReactReduxFirebaseProvider>
        </Provider>
      )
  }


AppRegistry.registerComponent(appName, () => Root);
