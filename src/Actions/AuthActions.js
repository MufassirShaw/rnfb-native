import {
  PHONE_AUTH_REQUESTED,
  PHONE_CODE_ERR,
  PHONE_AUTH_SUCCESS,
  PHONE_CODE_SENT,
  PHONE_AUTH_ERR
} from "./Types";
export const authRequest = (ownProps, phoneNo) =>(dispatch, getState) => {
  const firebase = ownProps.firebase;
  const firestore = ownProps.firestore;

  dispatch({
    type: PHONE_AUTH_REQUESTED
  });
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNo, true)
    .then(confirmResult => {
      dispatch({
        type: PHONE_CODE_SENT,
        payload: confirmResult
      });
    })
    .catch(error => {
      dispatch({
        type: PHONE_AUTH_ERR,
        payload: error.message
      });
    });

  // Auto Verifcation method
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log(user)
      //      add the user to firestore db
      firestore
        .collection("Users")
        .doc(user.uid)
        .set(
          {
            phoneNumber: user.phoneNumber
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: PHONE_AUTH_SUCCESS
          });
        });
    }
  });
};

export const codeVerification = (ownProps, code, confirmResult) => (
  dispatch,
  getState
) => {
  const firestore = ownProps.firestore;

  confirmResult
    .confirm(code)
    .then(user => {
      //add the user to firestore db
      firestore
        .collection("Users")
        .doc(user.uid)
        .set(
          {
            phoneNumber: user.phoneNumber
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: PHONE_AUTH_SUCCESS
          });
        });
    })
    .catch(err => {
      dispatch({
        type: PHONE_CODE_ERR
      });
    });
};

export const signOut = ownProps => {
  return (dispatch, getState) => {
    const firebase = ownProps.firebase;
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed Out Success");
      });
  };
};
