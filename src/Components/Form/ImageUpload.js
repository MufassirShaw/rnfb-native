import React, { Component } from 'react';
import {Container, Text, Icon, Button, View, Content, Body} from "native-base"
import  {connect} from "react-redux";
import ImagePicker from 'react-native-image-picker';
import {uploadPicToFirebaseStorage} from "./../../Actions/ImageUploadActions";
import {compose} from "redux";
import {withFirebase,withFirestore} from "react-redux-firebase"
import { StyleSheet } from 'react-native';
import { ProgressDialog } from "react-native-simple-dialogs"
import {playAudio} from "./../../utils"

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err:""
    };
    this.sound = null;
  }

  onChooseImagePress = ()=>{
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      if(response.uri){
        this.props.uploadImage(response.uri);
      }
    });
  }

  componentDidMount() {
    this.sound = playAudio("upload_picture.mp3");
  }
  componentWillUnmount() {
    if(this.sound){
        this.sound.stop();
        this.sound.release();
    }     
  }


  render() {
    const {progressState, err} = this.props.imageUploadProps;
    return (
      <View style={{  
          flex:1
        }} 
      >
        <Body style={{flex:1, alignItems:'center',justifyContent:'center',}}>
          <Button primary onPress={this.onChooseImagePress} style={styles.imageUploadBtn} >
              <Icon name='camera' style={styles.cameraIcon} />
          </Button>       
        </Body>
        <ProgressDialog
          visible={progressState}
          title="Please Wait"
          message="Uploading...."
        />

        { <Text style={styles.err}>{err}</Text>}
    </View>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
      imageUploadProps: state.imageUpload.imageUploadState
  }   
}


const mapDispatchToProps = (dispatch, ownProps)=>{
  return{
    uploadImage: (imageUri)=>(dispatch(uploadPicToFirebaseStorage(ownProps,imageUri)))
  }
}
export default compose(
  withFirestore, //for firebase and firestore via props.fire(X).anyAction
  withFirebase, 
  connect(mapStateToProps, mapDispatchToProps)
)(ImageUpload);



const styles = StyleSheet.create({
  imageUploadBtn:{
    width:200,
    height:200,
    textAlign:"center",
    justifyContent:"center"
  },
  cameraIcon:{
    fontSize:100,
  },
  err:{
    fontSize:18,
    paddingTop:5,
    paddingBottom: 15,
    textAlign: "center",
    color:"rgba(226, 79, 79,.88)",
  },
});