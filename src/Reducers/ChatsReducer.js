import {
    CHAT_CREATE_REQUESTED,
    CHAT_CREATE_SUCCESS,
    CHAT_CREATE_ERR, 
    CHAT_LOAD_REQUESTED,
    CHAT_LOAD_ERR,
    CHAT_LOAD_SUCCESS,
} from "./../Actions/Types";
const initState = {
   chatState:{
       err:"",
       loading: false,
       chatId: null
   }
}

export default(state=initState, action)=>{
   
   switch(action.type){
        case CHAT_CREATE_REQUESTED:{
            return {
                ...state,
                chatState:{
                    ...state.chatState,
                    loading: true
                }
            }
        }
        case CHAT_CREATE_SUCCESS:{
            return {
                ...state,
                chatState:{
                    ...state.chatState,
                    loading: false,
                }
            }
        }

        case CHAT_CREATE_ERR:{
            return {
                ...state,
                chatState:{
                    ...state.chatState,
                    loading: false,
                    err: action.payload
                }
            }
        }
       default:{
        
           return {
               ...state,
           }

       }
   }

}