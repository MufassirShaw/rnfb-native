import { ADD_CONTACT_ERR, ADD_CONTACT_REQUESTED, ADD_CONTACT_SUCCESS, GO_TO_CONTACTS } from "./Types"


export const addContact = (ownProps, phone) => {
    return (dispatch, getState) => {
      const firebase = ownProps.firebase;
      const uid = firebase.auth().currentUser.uid;
      let loggedInUser  ={};
      const firestore = ownProps.firestore;
      phone  = phone.split(" ").join(""); // removing white spaces
      dispatch({
        type: ADD_CONTACT_REQUESTED
      })
      console.log(ADD_CONTACT_REQUESTED)
      firestore.collection("Users").where("phoneNumber","==", phone ).get() // search the user in the db with phoneNumber 
      .then(function(querySnapshot) {
        if(!querySnapshot.size){ //number not found in our db
          dispatch({
            type: ADD_CONTACT_ERR,
            payload:"Number Not Found..."
          })
        }else{
          querySnapshot.forEach(function(doc) {
            const id = doc.id;
            const {phoneNumber, photoUrl} = doc.data()

            return firestore.collection("Users").doc(uid).update({
              contacts:firebase.firestore.FieldValue.arrayUnion({
                id,
                phoneNumber,
                photoUrl
              })
            })
            .then(()=>{
              const docRef = firestore.collection("Users").doc(uid);
              return docRef.get()
            })
            .then((doc) =>{
              loggedInUser = {
                  id: doc.id,
                  photoUrl: doc.data().photoUrl,
                  phoneNumber: doc.data().phoneNumber
                }
                
              return firestore.collection("Users").doc(id).update({
                contacts:firebase.firestore.FieldValue.arrayUnion({
                 ...loggedInUser
                })
              })
            })
            .then(()=>{
              dispatch({
                type:ADD_CONTACT_SUCCESS
              })
            })
          })
        }
      })
      .catch((err)=>{
        console.log(err)
      });
  }
}

