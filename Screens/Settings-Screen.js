import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Card } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: firebase.auth().currentUser.displayName,
      address: "",
      phone: "",
      email: firebase.auth().currentUser.email,
      password: "",
    };
  }

  componentDidMount() {
    this.getDetails(this.state.username);
  }

  getDetails = async (text) => {
    const ref = await firebase
      .firestore()
      .collection("Users")
      .where("Name", "==", text)
      .get();

    ref.docs.map((doc) => {
      var user = doc.data();
      this.setState({
        address: user.Address,
        phone: user.Phone,
        password: user.Password,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "Settings",
            style: { color: "white", fontSize: 17, marginTop: 10 },
          }}
        />
        <View
          style={{ justifyContent: "center", flex: 1, alignContent: "center" }}
        >
          <Card borderRadius={20}>
            <Card.Title>Profile Details</Card.Title>
            <Card.Divider />
            <Text style={{ fontWeight: "bold" }}>Name:</Text>
            <Text> {this.state.username}</Text>
            <Card.Divider />
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            <Text> {this.state.email}</Text>
            <Card.Divider />
            <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>
            <Text> {this.state.phone}</Text>
            <Card.Divider />
            <Text style={{ fontWeight: "bold" }}>Password:</Text>
            <Text> {this.state.password}</Text>
            <Card.Divider />
            <Text style={{ fontWeight: "bold" }}>Address:</Text>
            <Text> {this.state.address}</Text>
            <Card.Divider />
          </Card>
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
});
