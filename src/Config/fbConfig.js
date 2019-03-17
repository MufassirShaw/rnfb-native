import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


const config = {
    apiKey: "AIzaSyBEFybrEOfG3sSsDVRawc2RIAsrWC4OmqE",
    authDomain: "fyp14-cfbc0.firebaseapp.com",
    databaseURL: "https://fyp14-cfbc0.firebaseio.com",
    projectId: "fyp14-cfbc0",
    storageBucket: "fyp14-cfbc0.appspot.com",
    messagingSenderId: "80227516695"
};



firebase.initializeApp(config);

firebase.firestore();

export default firebase;