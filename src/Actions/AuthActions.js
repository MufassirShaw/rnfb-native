import {PHONE_AUTH_SUCCESS, PHONE_AUTH_PENDING, PHONE_AUTH_ERROR} from "./Types";
export const phoneAuth =(phoneNo)=>(
    (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase  = getFirebase();
        const firestore = getFirestore()

        console.log(firestore);
        // const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        //     'size': 'invisible',
        //   });

        // dispatch({type:PHONE_AUTH_PENDING});
        // firebase
        //     .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        //     .then((confirmationResult) => {
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).

        //         console.log("Code sent");

        //     })
        //     .catch((error) => {
        //     // Error; SMS not sent
        //     // Handle Errors Here
        //     return Promise.reject(error)
        //     });


        // firebase
    //     .push("todo", newTodo)
    //     .then(()=>{
    //         dispatch({
    //             type: PHONE_AUTH_SUCCESS,
    //             payload: newTodo
    //         })
    //     })
    //     .catch((err)=>{
    //         dispatch({
    //             type:PHONE_AUTH_ERROR,
    //             payload:err
    //         })

    //     })

    }
)