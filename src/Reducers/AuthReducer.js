import { PHONE_AUTH_ERROR,
         PHONE_AUTH_PENDING,
         PHONE_AUTH_SUCCESS
    }from "./../Actions/Types";

const initState = {
    authState:{
        authPending:null,
        AuthSuccess: null,
        authError: null
    }
}

export default(initState, action)=>{

    switch(action.type){
        case PHONE_AUTH_ERROR :{
            
        }
        case PHONE_AUTH_PENDING:{

        }
        case PHONE_AUTH_SUCCESS:{

        }
        default:{

        }
    }

}