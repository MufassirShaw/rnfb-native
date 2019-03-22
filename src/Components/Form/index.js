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
         H2
    } from 'native-base';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number: "",
        formError:"",
        code:""
    };

    console.log(this.props.firebaseAuth)
  }

  handleNumChange = (number)=>{
    this.setState({
        number
    })

  }

  handleNumSubmit = ()=>{
      //@ Convert the number to E.164 format and validate the input  
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


    handleCodeChange=(code)=>{
        this.setState({
            code
        })
    }
    handleCodeSubmit = ()=>{
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
                    onPress: this.handleCodeSubmit
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
                        onChangeText = {this.handleCodeChange}    
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
    const {uid} = this.props.firebaseAuth;
    // console.log();
    if(uid){
        return(
            <Button primary large
                onPress={()=>{
                    this.props.signout()
                }}
            ><Text>Sign Out</Text></Button>
        )
    }

    return (
        <Container>
            <Header>
                <Body>
                    <H2 style={{
                        color:"#fff"
                    }} >Form</H2>
                </Body>
                <Right>
                    <Text>Logo</Text>
                </Right>
            </Header>
            <Content>
                <Grid style={{height:250}}>
                    <Col style={{backgroundColor:"rgba(196, 196, 196, 0.25), "}}>
                      <Row style={{ alignItems:"center"}}>
                        <Item style={{borderWidth:2}}>
                            <Input 
                                placeholder="03xx-xxxxxxx" 
                                keyboardType="phone-pad"
                                onChangeText={this.handleNumChange}
                                value={this.state.number}
                                maxLength={15}
                                autoFocus={true}
                                style={styles.input}     
                                onSubmitEditing={this.handleNumSubmit}     
                                        
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
                                this.props.authState.codeErr
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
        </Container>
    );
  }
}



 
// with message

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


const mapDispatchToProps = (dispatch)=>{
    return{
        auth: (phone)=>(dispatch(authRequest(phone))),
        submitCode : (code,confirmCode)=>(dispatch(codeVerification(code,confirmCode))),
        signout : ()=>(dispatch(signOut()))
    }
}


const mapStateToProps =  (state)=>{
    return{
        authState: state.AuthReducer,
        firebaseAuth: state.firebase.auth
    
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);