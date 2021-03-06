import React from 'react';
// import { View } from 'react-native';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
const Contact = ({
    children, 
    style, 
    item, 
    navigation,
    ...rest
}) => {

    return (
        <ListItem
            thumbnail 
            noIndent 
            noBorder 
            style={{backgroundColor:"#5770FF", marginTop:5, maxHeight:100, borderRadius:5}} 
            button    
            onPress={()=>{
                navigation.navigate("SelectChat",{
                     photoUrl: item.photoUrl,
                     phoneNumber : item.phoneNumber,
                     id: item.id
                })
            }}
        >
            <Left/>
            <Body>                
                <Text style={{color:"#fff", fontSize:20}} >{item.phoneNumber}</Text>
            </Body>
            <Right>
                   <Thumbnail large circular source={{ uri: item.photoUrl }} />
            </Right>
        </ListItem>
    )    
}


export default Contact;
