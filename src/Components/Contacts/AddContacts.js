import React, { Component } from "react";
import {
  Text,
  Button,
  Thumbnail,
  Content,
  Icon,
  View,
  Grid,
  Col,
  Row,
  Input,
  Item } from "native-base";
import { connect } from "react-redux";
import { withFirebase, withFirestore } from "react-redux-firebase";
import { compose } from "redux";
import {ParseError, parsePhoneNumber } from "libphonenumber-js";
import { ProgressDialog } from "react-native-simple-dialogs";
import { StyleSheet } from "react-native";
import { addContact} from "./../../Actions/ContactsActions"
import { RESET } from "./../../Actions/Types";

import {playAudio} from "./../../utils";

class AddContacts extends Component {

    constructor(props) {
      super(props);
      this.sound = null;      
      this.state = {
        number: "",
        formError:"",
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
                this.props.addPhone(num);
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
    componentWillReceiveProps({contactProps,navigation}) {
      if(contactProps.success){
          navigation.goBack();
      }
    }

  componentDidMount() {
    this.sound =  playAudio("insert_friend_number.mp3");
  }
    componentWillUnmount() {
      this.props.reset();
      if(this.sound){
        this.sound.stop();
        this.sound.release();
      }     
    }

  render() {
    const {err, progressState } = this.props.contactProps;
    return (
        <Content>
          <Grid style={{ height: 250 }}>
            <Col style={{ backgroundColor: "rgba(196, 196, 196, 0.25), " }}>
              <Row style={{ alignItems: "center" }}>
                <Item style={{ borderWidth: 2 }}>
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
                  {!!this.state.formError && (
                    <Icon
                      type="MaterialIcons"
                      name="error"
                      style={{ color: "rgba(226, 79, 79,.88)" }}
                    />
                  )}
                </Item>
              </Row>
              <Text style={styles.formError}>
                {
                  this.state.formError
                  ||
                  err 
                }
              </Text>
            </Col>
          </Grid>
          <ProgressDialog
            visible={progressState}
            title="Please Wait"
            message="Checking..."
          />
        </Content>
    );
  }
}


const styles = StyleSheet.create({
    input:{
        fontSize: 26,
        paddingLeft: 10,
        borderColor:"rgba(196, 196, 196, 0.45)",
        textAlign: "center"
    },
    formError:{
        fontSize:18,
        paddingTop:2,
        paddingBottom: 15,
        textAlign: "center",
        color:"rgba(226, 79, 79,.88)"
    },
    formSucess:{
        paddingTop:2,
        paddingBottom: 10,
        color:"rgba(46, 125, 50, 0.93)",
        justifyContent:"center",
        alignItems:"center",
    }

})



const mapStateToProps = state => {
  return {
      contactProps : state.contactReducer.contactProps,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPhone: (phoneNumber)=>(dispatch(addContact(ownProps,phoneNumber))),
    reset : ()=>(dispatch({
      type: RESET
    }))
  };
};


const AddContactsEnhanced = compose( withFirebase, 
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps)
)(AddContacts);




export default class AddContactsContainer extends Component { //Just so the navigationOption work
  static navigationOptions = ({ screenProps}) => {
    const { profile, signOut } = screenProps;
    return {
      headerLeft: (
        <Thumbnail
          style={{ marginLeft: 2 }}
          circular
          source={{ uri: profile.photoUrl }}
        />
      ),
      headerRight: (
        <Button
          danger
          rounded
          style={{
            borderWidth: 1,
            borderColor: "#fff",
            marginTop: 5,
            marginLeft: 2
          }}
          onPress={signOut}
        >
          <Text>Logout</Text>
        </Button>
      ),
      title: profile.phoneNumber
    };
  };


  render() {
    return (
      <AddContactsEnhanced navigation={this.props.navigation}/>
    );
  }
}


