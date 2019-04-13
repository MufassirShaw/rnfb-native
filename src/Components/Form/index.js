import React, { Component } from 'react';
import { Alert, StyleSheet, View, TextInput} from 'react-native';
import {
    authRequest, 
    codeVerification,
    signOut
} from "../../Actions/AuthActions";
import  {connect} from "react-redux";
import {ParseError, parsePhoneNumber} from "libphonenumber-js";
import {ConfirmDialog, ProgressDialog} from "react-native-simple-dialogs";
import ImageUpload from "./ImageUpload";
import {compose} from "redux";
import { withFirebase,withFirestore, firebaseConnect } from "react-redux-firebase"
// import Logo from "../../../assets/imgs/logo.png"
import { Container, 
         Header, 
         Left, 
         Body, 
         Right, 
         Icon, 
         Title,
         Input,
         Content,
         Item,
         Text,
         Grid,
         Col,
         Row,
         Button,
         H2,
         Thumbnail
    } from 'native-base';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number: "",
        formError:"",
        code:""
    };
 }

  handlePhoneChange = (number)=>{
    this.setState({
        number
    })

  }

  handlePhoneSubmit = ()=>{
        try {
            const number = parsePhoneNumber(this.state.number,"PK");
            if(number.isValid()){
                const num = number.formatInternational();
                this.setState({
                    formError:"",
                    number:num
                })
                this.props.auth(num);
            } else{
                this.setState({
                    formError:"INVAILD NUMBER",
                })
            }        
        }catch (err) {
            if (err instanceof ParseError) {
                this.setState({
                    formError: err.message,
                })
            } else {
            throw err
            }
        }
    }
    handleOTPChange=(code)=>{
        this.setState({
            code
        })
    }
    
    handleOTPSubmit = ()=>{
        this.props.submitCode(this.state.code, this.props.authState.codeConfirmState) 
    }

    renderInputConfirmPopUp(){
        const {confirmPopUpState} = this.props.authState;
        return (
            <ConfirmDialog
                title="Confirm Dialog"
                visible={confirmPopUpState}
                positiveButton={{
                    title: "Submit",
                    onPress: this.handleOTPSubmit
                }} >
                <View>
                    <TextInput 
                        style={{
                            fontSize: 20,
                            borderColor:"rgba(196, 196, 196,1)",
                            textAlign: "center",
                            borderWidth:2

                        }} 
                        maxLength={6} 
                        placeholder="Put Code..." 
                        onChangeText = {this.handleOTPChange}    
                    />
                </View>
            </ConfirmDialog>
        )
    }


    renderProgressPopUp=()=>{
        const {progressState} = this.props.authState        

        return(
            <ProgressDialog
                visible={progressState}
                title="Please Wait"
                message="Sending Code..."
            />
        )
    }


  render() { 
    const {profile, uid} = this.props;


    
    return (
        <Container>
            <Header>
                <Left>
                    <Thumbnail source={require("./../../../assets/imgs/logo.png")} />
                </Left>
                <Body 
                
                >
                    <H2 style={{
                        color:"#fff",
                    }} > ChatKaro</H2>
                </Body>

            </Header>

             {
                !profile.photoUrl && uid //If Not
                    ?
                    <ImageUpload/>   //upload it 
                :
            <Content>
                <Grid style={{height:250}}>
                    <Col style={{backgroundColor:"rgba(196, 196, 196, 0.25), "}}>
                      <Row style={{ alignItems:"center"}}>
                        <Item style={{borderWidth:2}}>
                            <Input 
                                placeholder="03xx-xxxxxxx" 
                                keyboardType="phone-pad"
                                onChangeText={this.handlePhoneChange} 
                                value={this.state.number}
                                maxLength={15}
                                autoFocus={true}
                                style={styles.input}     
                                onSubmitEditing={this.handlePhoneSubmit}     
                                        
                            />
                            {
                                !!this.state.formError &&
                                <Icon type="MaterialIcons" name="error" style={{color:"rgba(226, 79, 79,.88)"}} />
                            }
                        </Item>
                        </Row>
                        <Text style={styles.formError} >
                            {   this.state.formError 
                                ||
                                this.props.authState.err
                            }
                        </Text> 
                        <Text style={styles.formSucess}>
                            { this.props.authState.message }
                        </Text>      
                    </Col>
                </Grid>           
            
                {this.renderInputConfirmPopUp()}
            
                {this.renderProgressPopUp()}
            </Content>
        }
        </Container>
    );
  }
}


const mapDispatchToProps = (dispatch, ownProps)=>{
    return{
        auth: (phone)=>(dispatch(authRequest(ownProps,phone))),
        submitCode : (code,confirmCode)=>(dispatch(codeVerification(ownProps,code,confirmCode))),
        signout : ()=>(dispatch(signOut(ownProps)))
    }
}


const mapStateToProps =  (state)=>{
    return{
        authState: state.AuthReducer.authState,
    }   
}

export default compose(
    withFirestore, //for firebase and firestore via props.fire(X).anyAction
    withFirebase, 
    connect(mapStateToProps, mapDispatchToProps)
)(SignInForm)




const styles = StyleSheet.create({
    input:{
        fontSize: 26,
        paddingLeft: 10,
        borderColor:"rgba(196, 196, 196, 0.45)",
        textAlign: "center"
    },
    formError:{
        fontSize:18,
        paddingTop:5,
        paddingBottom: 15,
        textAlign: "center",
        color:"rgba(226, 79, 79,.88)"
    },
    formSucess:{
        fontSize:18,
        paddingTop:5,
        paddingBottom: 15,
        textAlign: "center",
        color:"rgba(46, 125, 50, 0.93)"
    }

})

