import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert } from "react-native";
import db from "../config.js";
import firebase from "firebase";

export default class MyHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      userId: firebase.auth().currentUser.email,
    };
  }

  getNotifications = () => {
    firebase
      .firestore()
      .collection("Notifications")
      .where("NotificationStatus", "==", "Unread")
      .where("RequestedEmail", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({ value: unreadNotifications.length });
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="yellow"
          size={30}
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
        <Badge
          value={this.state.value}
          status="error"
          containerStyle={{
            position: "absolute",
            top: -5,
            right: -5,
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            size={30}
            color="white"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: "white", fontSize: 20, fontWeight: "bold" },
        }}
        rightComponent={<this.BellIconWithBadge {...this.props} />}
      />
    );
  }
}
