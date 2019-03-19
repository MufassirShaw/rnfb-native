import React, {Component} from 'react';
import { Container, Button, Text } from 'native-base';
import {Provider} from "react-redux";
import {Store} from "./src/Store";
import Form from "./src/Components/Form/index";
import Contacts from  "./src/Components/Contacts/index";

class App extends Component{
  render() {
    return (
        <Provider store={Store}>
          <Container>
            <Form/>
          </Container>
        </Provider> 
    );
  }

}


export default App;