import React, { Component } from "react";
import Contact from "./Contact";
import {
  Container,
  Header,
  Content,
  List,
  Text,
  Button,
  Thumbnail,
  Fab,
  Icon,
  View
} from "native-base";
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirebase, withFirestore } from "react-redux-firebase";

class Contacts extends Component {
  render() {
    const {
      navigate,
      profile: { contacts }
    } = this.props;
    const RenderedContacts = contacts && contacts.map((item, i) => {
        return <Contact item={item} key={i} />;
      })

    return (
      <Container>
        <Content>
          {
            (RenderedContacts.length)
            ?
            <List>{RenderedContacts}</List>
            :
            <Container
                style={{
                  flex: 1,
                  backgroundColor: "#dddddd",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  type="FontAwesome5"
                  name="frown"
                  style={{
                    color: "rgba(112, 112, 112, .3)",
                    fontSize: 250,
                    fontWeight: "normal"
                  }}
                />
          </Container>
        }
        </Content>
        <Fab
          position="bottomRight"
          style={{ backgroundColor: "#2F803E" }}
          onPress={() => navigate("AddContacts")}
        >
          <Icon name="add" style={{ fontSize: 25 }} />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebaseReducer.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const ContactEnhanced = compose(
  withFirebase,
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Contacts);

export default class ContactsContainer extends Component {
  static navigationOptions = ({ screenProps, navigationOptions }) => {
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
    const { navigate } = this.props.navigation;
    return <ContactEnhanced navigate={navigate} />;
  }
}
