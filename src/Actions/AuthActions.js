import { 
    PHONE_AUTH_REQUESTED,
    PHONE_CODE_ERR,
    PHONE_AUTH_SUCCESS,
    PHONE_CODE_SENT,
    PHONE_NUM_ERR
 } from "./Types";
export const authRequest = (phoneNo) => (
  (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    dispatch({
      type: PHONE_AUTH_REQUESTED
    })
    firebase.auth()
      .signInWithPhoneNumber(phoneNo)
      .then(confirmResult => {
        dispatch({
          type: PHONE_CODE_SENT,
          payload:confirmResult
        })
      })
      .catch(error => { 

        console.log(error.message);
          dispatch({
            type:PHONE_NUM_ERR,
            payload:error
          })
      });

  }
)


export const codeVerification = (code,confirmResult)=>(
  (dispatch, getState, { getFirebase, getFirestore }) => {
 
    confirmResult.confirm(code).then((user)=>{
      dispatch({
        type:PHONE_AUTH_SUCCESS,
        payload:user
      })
    }).catch((err)=>{
      dispatch({
        type:PHONE_CODE_ERR
      })
    })
  }
)