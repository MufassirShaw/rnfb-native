import {
     PHONE_AUTH_REQUESTED,
     PHONE_AUTH_SUCCESS, 
     PHONE_CODE_ERR, 
     PHONE_CODE_SENT,
     PHONE_AUTH_ERR
}from "./../Actions/Types";

const initState = {
    authState:{
        progressState:false,
        confirmPopUpState:false,
        codeConfirmState:null,
        err:""
    }
}

export default(state=initState, action)=>{
    
    switch(action.type){
        case PHONE_AUTH_REQUESTED :{
            return {
                ...state,
                authState:{
                    ...state.authState,
                    progressState: true
                }
            }

        }
        case PHONE_CODE_SENT:{
            return {
                ...state,
                authState:{
                    ...state.authState,
                    progressState:false,
                    confirmPopUpState:true,
                    err:"",
                    codeConfirmState: action.payload    
                }
            }
        }
        case PHONE_CODE_ERR:{
           return {
                ...state,
                authState:{
                    ...state.authState,
                    confirmPopUpState:false,
                    codeConfirmState:null,
                    err:"Invalid Code..."    
                }
            }
        }
        case PHONE_AUTH_SUCCESS:{
 
            return {
                ...state,
                authState:{
                    ...state.authState,
                    confirmPopUpState:false,
                    codeConfirmState:null,
                    err:""
                }
            }

        }
        case PHONE_AUTH_ERR:{
            return {
                ...state,
                authState:{
                    ...state.authState,
                    confirmPopUpState: false,
                    progressState:false,
                    err:action.payload    
                }
            }
        }
        default:{
            return {
                ...state
            }

        }
    }

}