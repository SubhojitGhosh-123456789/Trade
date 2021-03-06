import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Modal,
  Image,
  Picker,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Icon, Input, Card } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      isLoading: false,
      isModalVisible: false,
      currencyCode: "",
    };
  }

  showRegisterScreen = () => {
    return (
      <Modal
        borderRadius={5}
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: RFValue(1), height: RFValue(1) }}>
            <View style={styles.inputView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[
                      styles.logot,
                      { marginLeft: RFValue(30), color: "blue" },
                    ]}
                  >
                    Register User
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "red",
                        textAlign: "center",
                        marginTop: RFValue(34),
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>

                <Card borderRadius={10}>
                  <Input
                    label="Your Name"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    placeholder=" Name"
                    placeholderTextColor="gray"
                    onChangeText={(text) =>
                      this.setState({ displayName: text })
                    }
                    value={this.state.displayName}
                  />
                  <Input
                    label="Your Mobile Number"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    placeholder=" Phone Number"
                    placeholderTextColor="gray"
                    onChangeText={(text) => this.setState({ phone: text })}
                    value={this.state.phone}
                  />
                  <Input
                    label="Your Email Address"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    placeholder=" Email"
                    placeholderTextColor="gray"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                  />
                  <Input
                    label="Your Password"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    placeholder=" Password"
                    placeholderTextColor="gray"
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                  />

                  <Input
                    label="Your Country Currency Code"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    placeholder=" CCC"
                    placeholderTextColor="gray"
                    maxLength={3}
                    onChangeText={(text) => {
                      this.setState({
                        currencyCode: text,
                      });
                    }}
                  />

                  <Input
                    label="Your Address"
                    labelStyle={{ fontWeight: "bold" }}
                    style={{
                      marginTop: RFValue(22),
                    }}
                    numberOfLines={3}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder=" Address"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      this.setState({ address: text });
                    }}
                    value={this.state.address}
                  />
                </Card>

                <View style={styles.inputView}>
                  <TouchableOpacity
                    style={[styles.loginBtn, { alignSelf: "center" }]}
                    onPress={this.registerUser}
                  >
                    <Text style={styles.loginText}>REGISTER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        if (response) {
          ToastAndroid.show(
            "You Have Logged in Successfully!!",
            ToastAndroid.SHORT
          );
          this.setState({ email: "", password: "" });
          this.props.navigation.navigate("Drawer");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            ToastAndroid.show(
              "User doesn't Exist. Please Register If You do not have an Account.",
              ToastAndroid.SHORT
            );
            this.setState({ email: "", password: "" });
            break;
          case "auth/invalid-email":
            ToastAndroid.show("Incorrect Email entered", ToastAndroid.SHORT);
            this.setState({ email: "", password: "" });
            break;
          case "auth/wrong-password":
            ToastAndroid.show("Incorrect Password entered", ToastAndroid.SHORT);
            this.setState({ email: "", password: "" });
            break;
        }
      }
    } else {
      ToastAndroid.show(
        "Please Enter Your Email and Password",
        ToastAndroid.SHORT
      );
    }
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      ToastAndroid.show(
        "Please Enter Your Details to Signup",
        ToastAndroid.SHORT
      );
    } else {
      this.setState({ isLoading: true });

      firebase.firestore().collection("Users").add({
        Name: this.state.displayName,
        Email: this.state.email,
        Password: this.state.password,
        Phone: this.state.phone,
        Address: this.state.address,
        isItemRequestActive: false,
        CurrencyCode: this.state.currencyCode,
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          ToastAndroid.show(
            "You have Registered successfully!!",
            ToastAndroid.SHORT
          );
          this.setState({
            isLoading: false,
            displayName: "",
            phone: "",
            address: "",
            isModalVisible: false,
          });
        })
        .catch((error) => ToastAndroid.show(error.message), ToastAndroid.SHORT);
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>{this.showRegisterScreen()}</View>
          <View>
            <Image
              source={require("../assets/bg.png")}
              style={{ width: RFValue(1), height: RFValue(2.5) }}
            />
          </View>

          <Card>
            <Input
              label="Your Email Address"
              labelStyle={{ fontWeight: "bold" }}
              style={{
                marginTop: RFValue(22),
              }}
              placeholder=" Email"
              placeholderTextColor="gray"
              leftIcon={
                <Icon
                  name="envelope"
                  size={25}
                  color="gray"
                  type="font-awesome"
                />
              }
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
              value={this.state.email}
            />

            <Input
              label="Your Password"
              labelStyle={{ fontWeight: "bold" }}
              style={{
                marginTop: RFValue(22),
              }}
              placeholderTextColor="gray"
              leftIcon={
                <Icon name="lock" size={35} color="gray" type="font-awesome" />
              }
              secureTextEntry={true}
              placeholder=" Password"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
              value={this.state.password}
            />
          </Card>
          <View>
            <TouchableOpacity
              style={{
                width: RFValue(3.5),
                backgroundColor: "#fb5b5a",
                height: RFValue(1.3),
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFValue(34),
                borderWidth: 2,
                borderColor: "white",
                alignSelf: "center",
              }}
              onPress={() => {
                this.login(this.state.email, this.state.password);
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: RFValue(22),
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text style={styles.wText}>Do not have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}
            >
              <Text style={[styles.wText, { color: "yellow" }]}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  inputView: {
    marginBottom: RFValue(34),
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "#FCE0B1",
    borderRadius: 20,
    width: RFValue(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: RFValue(34),
  },
  loginBtn: {
    width: RFValue(3.5),
    backgroundColor: "#fb5b5a",
    height: RFValue(1.5),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: RFValue(34),
    borderWidth: 2,
    borderColor: "white",
  },
  loginText: {
    color: "white",
    fontSize: 20,
  },
  logot: {
    fontWeight: "bold",
    fontSize: 25,
    color: "orange",
    textAlign: "center",
    marginTop: RFValue(34),
    marginRight: RFValue(7),
  },
  loginBox: {
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "white",
    borderRadius: 25,
    height: RFValue(13),
    width: RFValue(2.4),
    textAlign: "center",
    marginTop: RFValue(22),
  },

  wText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
