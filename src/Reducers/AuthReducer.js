import {
     PHONE_AUTH_REQUESTED,
     PHONE_AUTH_SUCCESS, 
     PHONE_CODE_ERR, 
     PHONE_CODE_SENT   
}from "./../Actions/Types";

const initState = {
        progressState:false,
        confirmPopUpState:false,
        codeConfirmState:null,
        codeErr:""
}

export default(state=initState, action)=>{
    
    switch(action.type){
        case PHONE_AUTH_REQUESTED :{
            return {
                ...state,
                progressState: true
            }
        }
        case PHONE_CODE_SENT:{
            return {
                ...state,
                progressState:false,
                confirmPopUpState:true,
                codeErr:"",
                codeConfirmState: action.payload
            }
        }
        case PHONE_CODE_ERR:{
           return {
                ...state,
                confirmPopUpState:false,
                codeConfirmState:null,
                codeErr:"Invalid Code..."
            }
        }
        case PHONE_AUTH_SUCCESS:{
 
            return {
                ...state,
                confirmPopUpState:false,
                codeConfirmState:false,
                codeErr:""
            }

        }
        default:{
            return {
                ...initState
            }

        }
    }

}