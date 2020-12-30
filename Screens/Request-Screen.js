import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header, Card } from "react-native-elements";

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      username: firebase.auth().currentUser.displayName,
      itemName: "",
      description: "",
    };
  }

  createRequestId() {
    return Math.random().toString(36).substring(7);
  }

  request = async (itemName, description) => {
    var email = this.state.userId;
    var username = this.state.username;
    var requestId = this.createRequestId();
    firebase.firestore().collection("RequestedItems").add({
      UserName: username,
      ItemName: itemName,
      Description: description,
      RequestID: requestId,
      Email: email,
    });

    this.setState({ itemName: "", description: "" });
    ToastAndroid.show(
      "Your Request Has Been Submitted Successfully",
      ToastAndroid.SHORT
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "Request Exchange",
            style: { color: "white", fontSize: 17, marginTop: 10 },
          }}
        />
        <View>
          <Card>
            <Card.Title>Hello {this.state.username}!!</Card.Title>
            <Text style={{ textAlign: "center" }}>
              Can You Please Enter These Details To Request An Exchange?
            </Text>
          </Card>

          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter The Item Name"}
            onChangeText={(text) => {
              this.setState({
                itemName: text,
              });
            }}
            value={this.state.itemName}
          />

          <TextInput
            style={[styles.formTextInput, { height: 200, width: "90%" }]}
            multiline
            numberOfLines={8}
            placeholder={"Description Of The Item"}
            onChangeText={(text) => {
              this.setState({
                description: text,
              });
            }}
            value={this.state.description}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.request(this.state.itemName, this.state.description);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Request Exchange
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },

  logost: {
    fontWeight: "bold",
    fontSize: 30,
    color: "yellow",
    textAlign: "center",
    marginBottom: 20,
  },
  formTextInput: {
    borderWidth: 3,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    width: "75%",
    textAlign: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  button: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    shadowOpacity: 0.44,
    shadowRadius: 50.32,
    elevation: 16,
    alignSelf: "center",
    color: "white",
  },
});
