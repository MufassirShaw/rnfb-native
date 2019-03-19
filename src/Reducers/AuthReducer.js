import {
     PHONE_AUTH_REQUESTED,
     PHONE_AUTH_SUCCESS, 
     PHONE_CODE_ERR, 
     PHONE_NUM_ERR, 
     PHONE_CODE_SENT   
}from "./../Actions/Types";

const initState = {
        progressState:false,
        confirmPopUpState:false,
        phoneError:"",
        message:"",
        user: null,
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
        case PHONE_NUM_ERR:{
            return{
                ...state,
                progressState:false,
                phoneError: "Invalid phone number"
            }
        }
        case PHONE_CODE_SENT:{
            return {
                ...state,
                progressState:false,
                confirmPopUpState:true,
                phoneError:"",
                message:"",
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
                user:action.payload,
                phoneError:"",
                message:"Sucess...",
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