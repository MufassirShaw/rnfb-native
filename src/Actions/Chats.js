import {
    CHAT_CREATE_REQUESTED,
    CHAT_CREATE_SUCCESS,
    CHAT_CREATE_ERR, 
    CHAT_LOAD_REQUESTED,
    CHAT_LOAD_ERR,
    CHAT_LOAD_SUCCESS,
    SEND_MESSAGE_ERR,
    SEND_MESSAGE_REQUESTED,
    SEND_MESSAGE_SUCCESS
} from "./Types";

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
  
  