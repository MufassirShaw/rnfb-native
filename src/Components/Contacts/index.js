import React, { Component } from 'react';
import Contact from "./Contact";
import { Container, Header, Content,List, Text} from 'native-base';
import {StyleSheet} from "react-native";
export default class Contacts extends Component{
  render() {
    const contacts = [
      {
        phoneNumber:"021423432432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"3432432234",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"2343342432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"021423432432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"3432432234",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"2343342432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"021423432432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"3432432234",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"2343342432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"021423432432",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"3432432234",
        photoUrl:"http://i.pravatar.cc/150"
      },
      {
        phoneNumber:"2343342432",
        photoUrl:"http://i.pravatar.cc/150"
      }











    ]

    const RenderedContacts = contacts.map((item,i)=>(<Contact item={item} key={i}/>));
    return (
      <Content>
        <List style={{borderWidth:2}}>
            {RenderedContacts}
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({

    cardItem:{
        backgroundColor:"rgba(63, 81, 181, 0.7)",
        
    },
    cardBody:{
        alignItems:"flex-start", 
        justifyContent:"center",
     
    }



});