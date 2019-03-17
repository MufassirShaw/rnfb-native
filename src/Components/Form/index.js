import React, { Component } from 'react';
import { Alert, StyleSheet} from 'react-native';
import {phoneAuth} from "../../Actions/AuthActions";
import  {connect} from "react-redux";
import {ParseError, parsePhoneNumber} from "libphonenumber-js";
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
         Row
    } from 'native-base';


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        number: "",
        formError:""
    };
  }

  handleChange = (number)=>{
    this.setState({
        number
    })

  }

  handleSubmit = ()=>{
      //@ Convert the number to E.164 format and validate the input  
    try {
        const number = parsePhoneNumber(this.state.number,"PK");
        if(number.isValid()){
            const num = number.formatInternational();
            this.setState({
                formError:"",
                number:num
            })
            this.props.auth(this.state.number);
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

  render() { 
    return (
        <Container>
            <Header>
                <Left/>
                <Body>
                    <Title>Form</Title>
                </Body>
                <Right>
                     <Icon name="clear" type="MaterialIcons" style={{color:"rgba(226, 79, 79,.88)"}}/>                
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
                                onChangeText={this.handleChange}
                                value={this.state.number}
                                maxLength={15}
                                autoFocus={true}
                                style={styles.input}     
                                onSubmitEditing={this.handleSubmit}     
                                        
                            />
                            {
                                !!this.state.formError &&
                                <Icon type="MaterialIcons" name="error" style={{color:"rgba(226, 79, 79,.88)"}} />
                            }
                        </Item>
                        </Row>
                        <Text style={styles.formError} >{this.state.formError}</Text> 
                    </Col>
                </Grid>            
            </Content>
        </Container>
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
        paddingTop:5,
        paddingBottom: 15,
        textAlign: "center",
        color:"rgba(226, 79, 79,.88)"
    }
})


const mapDispatchToProps = (dispatch)=>({
    auth: (phone)=>(dispatch(phoneAuth(phone)))
})


const mapStateToProps =  ()=>({

})

export default connect(null, mapDispatchToProps)(SignInForm);