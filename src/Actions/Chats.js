import {
    CHAT_CREATE_REQUESTED,
    CHAT_CREATE_SUCCESS,
    CHAT_CREATE_ERR, 
    CHAT_LOAD_REQUESTED,
    CHAT_LOAD_ERR,
    CHAT_LOAD_SUCCESS,
    SEND_MESSAGE_ERR,
    SEND_MESSAGE_REQUESTED,
    SEND_MESSAGE_SUCCESS,
} from "./Types";
import {v4}  from "uuid"
import RNFetchBlob from "rn-fetch-blob";

export const createRoom = (ownProps, chatId, isText) => {
    return (dispatch, getState) => {
        const firebase = ownProps.firebase;
        const firestore  = ownProps.firestore;
        const chatType = isText ? "text" : "audio"; 
        const docRef = firestore.collection(`Chat/${chatType}/${chatId}`)
        dispatch({
            type:CHAT_CREATE_REQUESTED
        })
        docRef.doc("messages").set({
            thread:[]
        })
        .then(()=>{
            dispatch({
                type:CHAT_CREATE_SUCCESS,
                payload: chatId
            })
        })
        .catch((err)=>{
            dispatch({
                type:CHAT_CREATE_ERR,
                payload: err.message
            })
            console.error("Opps!",err.message);
        })


    };
};



export const newMessage = (ownProps, { newThread, chatId}, isText) => {
    return (dispatch, getState) => {
        const firebase = ownProps.firebase;
        const firestore  = ownProps.firestore;
        const chatType = isText ? "text" : "audio"; 
        const colRef = firestore.collection(`Chat/${chatType}/${chatId}`)

        dispatch({
            type:SEND_MESSAGE_REQUESTED
        })
        colRef.doc("messages").set({
            thread : newThread
        })
        .then(()=>{
            dispatch({
                type:SEND_MESSAGE_SUCCESS
            })
        })
        .catch((err)=>{
            dispatch({
                type:SEND_MESSAGE_ERR,
                payload: err.message
            })
            console.error("Opps!",err.message);
        })


    };
};
  
export const sendAudioMessage = (ownProps, uri, {chatId, messages, reciver} ) => {
    return (dispatch, getState) => {
        const firebase = ownProps.firebase;
        const firestore = ownProps.firestore;
        const colRef = firestore.collection(`Chat/audio/${chatId}`)

        const mime = "application/octet-stream";
        let downloadUri = ""; 
        const uuid = v4();

        //setting up blob
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const fileRef = firebase.storage().ref(`audioMessages/${chatId}/${uuid}`);
        let uploadBlob = null;

        dispatch({
            type:SEND_MESSAGE_REQUESTED
        })

        fs.readFile(uri,"base64")
        .then((data)=>{
            return Blob.build(data,{type:`${mime};BASE64`})
        })
        .then((blob)=>{
            uploadBlob = blob;
            return fileRef.putFile(blob._ref, { contentType: mime })
        })
        .then(data => {
            uploadBlob.close();
            downloadUri = data.downloadURL;

            const newMessage = {
                _id: v4(),
                uri: downloadUri,
                user:{
                    ...reciver
                },
                createdAt: `${Date(Date.now())}`, // not sure to go for this

            }
            return colRef.doc("messages").set({
                thread : messages.thread && messages.thread.length ? [
                    {...newMessage},
                    ...messages.thread
                ]
                :[
                    {...newMessage}
                ]
            })
        })
        .then(()=>{
            dispatch({
                type:SEND_MESSAGE_SUCCESS
            })
        })
        .catch(err=>{
            console.error(err);
        })  


    };
};
  



  