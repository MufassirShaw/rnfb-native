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

class AddContacts extends Component {
    state = {
        number: "",
        formError:"",
    };

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
 
    componentWillUnmount() {
      this.props.reset();
    }

  render() {

    const {err, progressState, success} = this.props.contactProps;

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
              <View style={styles.formSucess}>
              {
                success
                &&
                <Text style={{color:"#2F803E", fontSize:25}}>Success <Icon name="check" type="FontAwesome" style={{color:"#2F803E", fontSize:40}} /> </Text>
              }
            </View>
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


