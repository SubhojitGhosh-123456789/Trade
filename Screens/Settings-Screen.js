import React from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";
import { Header, Card } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class SettingsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: firebase.auth().currentUser.displayName,
      address: "",
      phone: "",
      email: firebase.auth().currentUser.email,
      password: "",
      userId: "",
      docId: "",
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
        userId: user.UserID,
        docId: doc.id,
      });
    });
  };

  updateProfile = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .doc(this.state.docId)
      .update({
        Name: this.state.username,
        Email: this.state.email,
        Password: this.state.password,
        Address: this.state.address,
        Phone: this.state.phone,
      });

    var user = firebase.auth().currentUser;

    user.updateEmail(this.state.email).then(function () {
      alert(
        "Please Check your email for a conformation and try logging in after sometime"
      );
    });
    user.updatePassword(this.state.password);

    if (user) {
      console.log("Ok");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
    this.props.navigation.navigate("LoginScreen");

    ToastAndroid.show(
      "Your Profile Has Been Successfully Updated",
      ToastAndroid.SHORT
    );
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
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignContent: "center",
            }}
          >
            <Card borderRadius={20} containerStyle={styles.card}>
              <Card.Title>Profile Details</Card.Title>
              <Card.Divider />
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.username}
              </Text>
              <Card.Divider />
              <Text style={{ fontWeight: "bold" }}>
                Email: {this.state.email}
              </Text>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Mobile Number: </Text>
                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor="gray"
                  style={styles.inputBox}
                  value={this.state.phone}
                  onChangeText={(text) => {
                    this.setState({ phone: text });
                  }}
                />
              </View>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Password: </Text>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={styles.inputBox}
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                />
              </View>
              <Card.Divider />
              <Text style={{ fontWeight: "bold" }}>Address</Text>
              <TextInput
                placeholder="Address"
                placeholderTextColor="gray"
                style={styles.textArea}
                value={this.state.address}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <Card.Divider />
            </Card>
            <TouchableOpacity
              style={styles.button}
              onPress={this.updateProfile}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                UPDATE PROFILE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "white",
    width: 170,
  },
  textArea: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    textAlign: "center",
    height: 200,
    backgroundColor: "white",
  },
  button: {
    width: "80%",
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
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#FCE0B1",
    alignContent: "center",
    justifyContent: "center",
  },
});
