import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./AuthReducer"
import imageUploadReducer from "./imageUploadReducer"
import contactReducer from "./ContactsReducer"
import {combineReducers} from "redux"

export const rootReducer = combineReducers({
    firebaseReducer,
    firestoreReducer,
    AuthReducer:AuthReducer,
    imageUpload:imageUploadReducer,
    contactReducer
})
