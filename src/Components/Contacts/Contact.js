import React from 'react';
// import { View } from 'react-native';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

const Contact = ({
    children, style, item, ...rest
}) => {

    return (
        <ListItem
            thumbnail 
            noIndent 
            noBorder 
            style={{backgroundColor:"#324191", marginTop:5, maxHeight:100, borderRadius:5}} 
            button    
            onPress={()=>{
                alert(item.phoneNumber)
                //this.props.navigate.to("SelectChat",{
                     //photoUrl: item.photoUrl,
                     // phoneNumber : item.phoneNumber
                // })
            }}
        >
            <Left/>
            <Body>                
                <Text style={{color:"#fff", fontSize:25 }} >{item.phoneNumber}</Text>
            </Body>
            <Right>
                   <Thumbnail large circular source={{ uri: item.photoUrl }} />
            </Right>
        </ListItem>
    )    
}


export default Contact;
