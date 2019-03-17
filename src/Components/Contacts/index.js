import React, { Component } from 'react';
import { Container, 
        Header, 
        Content, 
        Card, 
        CardItem, 
        Thumbnail, 
        Right, 
        Left, 
        Body,
        H2,
        Text} from 'native-base';
import {StyleSheet} from "react-native";
export default class Contacts extends Component {
  render() {
    return (
        <Content>
          <Card >
            <CardItem style={styles.cardItem} >
                <Body style={styles.cardBody}> 
                    <H2 style={{color:"#fff"}}>21111111</H2>
                </Body>
                <Right>
                    <Thumbnail large 
                                source={{uri: 'https://via.placeholder.com/150/FFFFFF?Text=Avatar'}} 
                    />
                </Right>   
            </CardItem>
          </Card>
          
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