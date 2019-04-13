import 
    {
    ADD_CONTACT_REQUESTED,
    ADD_CONTACT_ERR,
    ADD_CONTACT_SUCCESS, 
    GO_TO_CONTACTS,
    RESET
} from "./../Actions/Types"

const initState = {
    contactProps:{
        progressState:false,
        err:"",
        success: null,
    }
}

export default(state=initState, action)=>{
    switch(action.type){
        case ADD_CONTACT_REQUESTED:{
            return {
                ...state,
                contactProps:{
                    ...state.contactProps,
                    progressState:true,
                    success: null
                }
            }

        }
        case ADD_CONTACT_SUCCESS:{

            return {
                ...state,
                contactProps:{
                    ...state.contactProps,
                    progressState:false,
                    err:"",
                    success: true
                }
            }

        }
        case ADD_CONTACT_ERR:{
        
            return {
                ...state,
                contactProps:{
                    ...state.contactProps,
                    progressState:false,
                    err:action.payload,
                    success: false
                }
            }
        }
        case GO_TO_CONTACTS:{
            return {
                ...state,
                contactProps:{
                    ...state.contactProps,
                    progressState:false,
                    err:"",
                    success: false
                }
            }
        }
        case RESET :{
            return{
                ...state,
                contactProps:{
                  ...initState
                }

            }
        }
        default:{
            return{
                ...state
            }
        }
    }
}