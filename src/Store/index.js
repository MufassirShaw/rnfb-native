import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import {getFirebase, firebaseReducer,reactReduxFirebase} from "react-redux-firebase";
import {getFirestore,  reduxFirestore, firestoreReducer  } from "redux-firestore";
import RNFirebase from 'react-native-firebase';
import AuthReducer from "./../Reducers/AuthReducer";

const reduxFirebaseConfig = {
    enableRedirectHandling: false
};

const reactNativeFirebaseConfig = {
    debug: true
};


const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);



const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    AuthReducer:AuthReducer

})


export const Store  = createStore(
    rootReducer,
    compose(
        reactReduxFirebase(firebase,
            reduxFirebaseConfig
        ),
        reduxFirestore(firebase),
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore}))
    )
    
);



