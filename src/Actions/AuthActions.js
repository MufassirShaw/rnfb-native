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

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNo,true)
      .then(confirmResult => {
        console.log("CODE_SENT")
        dispatch({
          type: PHONE_CODE_SENT,
          payload:confirmResult
        })
      })
      .catch(error => { 
        dispatch({
          type:PHONE_NUM_ERR,
          payload:error
        })

        //handling the auto verification case
        firebase
        .auth()
        .onAuthStateChanged((user) => {
          dispatch({
            type:PHONE_AUTH_SUCCESS,
            payload:user
          })
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
      console.log(PHONE_AUTH_SUCCESS)


    }).catch((err)=>{
      dispatch({
        type:PHONE_CODE_ERR
      })
      console.log(PHONE_CODE_ERR)
    })
  }
)