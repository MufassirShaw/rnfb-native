import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {getFirebase, firebaseReducer,reactReduxFirebase} from "react-redux-firebase";
import {getFirestore,  reduxFirestore, firestoreReducer  } from "redux-firestore";
import RNFirebase from 'react-native-firebase';

const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
};

const reactNativeFirebaseConfig = {
    debug: true
};


const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);


const reducer = (initState = {user:"someuser"})=>{
    return initState
  }
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    reducer: reducer
})


export const Store  = createStore(
    rootReducer,
    compose(
        reactReduxFirebase(firebase,
            reduxFirebaseConfig
        ),
        reduxFirestore(firebase),
        applyMiddleware(thunk.withExtraArgument(getFirebase,getFirestore))
    )
    
);


