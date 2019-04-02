import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import AuthReducer from "./../Reducers/AuthReducer";

import {combineReducers} from "redux"

export const rootReducer = combineReducers({
    firebaseReducer,
    firestoreReducer,
    AuthReducer:AuthReducer
})
