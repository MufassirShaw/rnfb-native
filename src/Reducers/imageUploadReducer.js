import {IMAGE_UPLOAD_ERR, IMAGE_UPLOAD_REQUESTED, IMAGE_UPLOAD_SUCCESS} from "./../Actions/Types"

const initState = {
    imageUploadState:{
        progressState:false,
        err:""
    }
}

export default(state=initState, action)=>{

    switch(action.type){
        case IMAGE_UPLOAD_REQUESTED:{

            return {
                ...state,
                imageUploadState: {
                    ...state.imageUploadState,
                    progressState: true
                }   
            }

        }
        case IMAGE_UPLOAD_SUCCESS:{
            return {
                ...state,
                imageUploadState: {
                    ...state.imageUploadState,
                    progressState: false,
                    err:""
                }   
            }

        }
        case IMAGE_UPLOAD_ERR:{
            return {
                ...state,
                imageUploadState: {
                    ...state.imageUploadState,
                    progressState: false,
                    err: action.payload
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