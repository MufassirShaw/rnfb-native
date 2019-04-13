import {IMAGE_UPLOAD_ERR, IMAGE_UPLOAD_REQUESTED,IMAGE_UPLOAD_SUCCESS} from "./Types"

export const uploadPicToFirebaseStorage = (ownProps,uri) => (dispatch,getState) => {
  
  const firebase = ownProps.firebase;
  const firestore = ownProps.firestore;

  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid;
  const mime = "image/jpg";
  let downloadUri = ""; 
  const imageRef = firebase.storage().ref("images/" + uid);
   dispatch({
     type:IMAGE_UPLOAD_REQUESTED
   })
   console.log(IMAGE_UPLOAD_REQUESTED);
  imageRef
    .putFile(uri, { contentType: mime })
    .then(data => {
       downloadUri = data.downloadURL;
      return firestore
        .collection("Users")
        .doc(uid) 
        .set(
          {
            photoUrl: downloadUri //update the photo url of the user 
          },
          { merge: true }
        );
    }).then(()=>{
      dispatch({
        type: IMAGE_UPLOAD_SUCCESS
      })
    })
    .catch(err => {
      dispatch({
        type:IMAGE_UPLOAD_ERR,
        payload:err.message
      })
    });
};
