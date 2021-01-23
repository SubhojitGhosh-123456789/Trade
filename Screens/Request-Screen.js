import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/AppHeader";
import { Icon, Input, Card } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";

export default class RequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      username: firebase.auth().currentUser.displayName,
      itemName: "",
      description: "",
      value: "",

      isItemRequestActive: false,

      requestedItemName: "",
      requestedItemStatus: "",
      requestedEmail: "",
      requestId: "",
      requesteddocId: "",
      userDocID: "",
      requestedItemValue: "",

      itemValue: "",
      currencyCode: "",
      itemPrice: "",
    };
  }

  createRequestId() {
    return Math.random().toString(36).substring(7);
  }

  request = async (itemName, description) => {
    var email = this.state.userId;
    var username = this.state.username;
    var requestId = this.createRequestId();

    await firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.userId)
      .onSnapshot((data) => {
        data.forEach((doc) => {
          this.setState({
            currencyCode: doc.data().CurrencyCode,
          });
        });
      });

    fetch(
      "http://data.fixer.io/api/latest?access_key=a0994a85d21c529ccb449f80192c4a4c"
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var currencyCode = this.state.currencyCode;
        var currency = responseData.rates[currencyCode];
        console.log(this.state.itemValue * currency);
        var itemPrice = this.state.itemValue * currency;
        this.setState({
          itemValue: itemPrice,
          itemPrice: itemPrice,
        });
      });

    firebase.firestore().collection("RequestedItems").add({
      UserName: username,
      ItemName: itemName,
      Description: description,
      RequestID: requestId,
      Email: email,
      ItemStatus: "Requested",
      ItemValue: this.state.itemPrice,
    });

    this.setState({ itemName: "", description: "", ItemValue: "" });
    ToastAndroid.show(
      "Your Request Has Been Submitted Successfully",
      ToastAndroid.SHORT
    );

    this.setState({
      isItemRequestActive: true,
    });

    firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.firestore().collection("Users").doc(doc.id).update({
            isItemRequestActive: this.state.isItemRequestActive,
          });
        });
      });
    ToastAndroid.show(
      "Your Request Has Been Submitted Successfully",
      ToastAndroid.SHORT
    );

    await this.getItemRequest();
  };

  getisItemRequestActive = () => {
    firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var isItemRequestActive = doc.data().isItemRequestActive;
          this.setState({
            isItemRequestActive: isItemRequestActive,
            userDocID: doc.id,
          });
        });
      });
  };

  getItemRequest = () => {
    firebase
      .firestore()
      .collection("RequestedItems")
      .where("Email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().ItemStatus === "Requested") {
            this.setState({
              requestId: doc.data().RequestID,
              requestedItemName: doc.data().ItemName,
              requestedItemStatus: doc.data().ItemStatus,
              requesteddocId: doc.id,
              requestedEmail: doc.data().Email,
              requestedItemValue: doc.data().ItemValue,
            });
          }
        });
      });
  };

  receivedItems = async (requestedItemName) => {
    var userId = this.state.userId;
    var requestId = this.state.requestId;
    await firebase.firestore().collection("RecievedItems").add({
      Email: userId,
      ItemName: requestedItemName,
      RequestID: requestId,
      ItemStatus: "Received",
    });
  };

  sendNotification = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().Name;

          firebase
            .firestore()
            .collection("Notifications")
            .where("RequestID", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donor = doc.data().Trader;
                var donorEmail = doc.data().TraderEmail;
                var itemName = doc.data().ItemName;

                firebase
                  .firestore()
                  .collection("Notifications")
                  .add({
                    Name: donor,
                    RequestedEmail: donorEmail,
                    Message: name + " Has Received the Item " + itemName,
                    NotificationStatus: "Unread",
                    ItemName: itemName,
                  });
              });
            });
        });
      });
  };

  componentDidMount() {
    this.getItemRequest();
    this.getisItemRequestActive();
  }

  updateItemRequestStatus = async () => {
    await firebase
      .firestore()
      .collection("RequestedItems")
      .doc(this.state.requesteddocId)
      .update({
        ItemStatus: "Recieved",
      });

    this.setState({
      isItemRequestActive: false,
    });

    await firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          firebase.firestore().collection("Users").doc(doc.id).update({
            isItemRequestActive: this.state.isItemRequestActive,
          });
        });
      });
  };

  render() {
    if (this.state.isItemRequestActive === true) {
      return (
        <View style={styles.container}>
          <MyHeader title="Request Item" navigation={this.props.navigation} />
          <View>
            <Card>
              <Card.Title>Item Name: {this.state.requestedItemName}</Card.Title>
              <Card.Title>
                Item Status: {this.state.requestedItemStatus}
              </Card.Title>
              <Card.Title>
                Item Value: {this.state.requestedItemValue}
              </Card.Title>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "orange",
                  backgroundColor: "orange",
                  width: 300,
                  alignSelf: "center",
                  alignItems: "center",
                  height: 30,
                  marginTop: 30,
                }}
                onPress={() => {
                  this.sendNotification();
                  this.updateItemRequestStatus();
                  this.receivedItems(this.state.requestedItemName);
                }}
              >
                <Text>I Have Recieved The Item</Text>
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MyHeader title="Request Item" navigation={this.props.navigation} />
          <ScrollView>
            <View>
              <Card>
                <Card.Title>Hello {this.state.username}!!</Card.Title>
                <Text style={{ textAlign: "center" }}>
                  Can You Please Enter These Details To Request An Exchange?
                </Text>
              </Card>

              <Card borderRadius={10}>
                <Input
                  label="Your Item Name"
                  labelStyle={{ fontWeight: "bold" }}
                  style={{
                    marginTop: RFValue(22),
                  }}
                  leftIcon={
                    <Icon
                      name="address-card"
                      size={35}
                      color="gray"
                      type="font-awesome"
                    />
                  }
                  placeholderTextColor="gray"
                  onChangeText={(text) => {
                    this.setState({
                      itemName: text,
                    });
                  }}
                  value={this.state.itemName}
                />

                <Input
                  label="Value Of The Item In Euros"
                  labelStyle={{ fontWeight: "bold" }}
                  style={{
                    marginTop: RFValue(22),
                  }}
                  leftIcon={
                    <Icon
                      name="eur"
                      size={35}
                      color="gray"
                      type="font-awesome"
                    />
                  }
                  placeholderTextColor="gray"
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({
                      itemValue: text,
                    });
                  }}
                  value={this.state.itemValue}
                />

                <Input
                  label="Description Of Your Item"
                  labelStyle={{ fontWeight: "bold" }}
                  style={{
                    marginTop: RFValue(22),
                  }}
                  leftIcon={
                    <Icon
                      name="address-card"
                      size={35}
                      color="gray"
                      type="font-awesome"
                    />
                  }
                  numberOfLines={3}
                  multiline={true}
                  underlineColorAndroid="transparent"
                  placeholder=" "
                  placeholderTextColor="gray"
                  onChangeText={(text) => {
                    this.setState({
                      description: text,
                    });
                  }}
                  value={this.state.description}
                />
              </Card>

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
          </ScrollView>
        </View>
      );
    }
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
    marginBottom: RFValue(34),
  },
  formInput: {
    borderWidth: 3,
    borderColor: "gray",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    width: "75%",
    textAlign: "center",
    marginTop: RFValue(22),
    alignSelf: "center",
  },
  button: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: RFValue(34),
    shadowOpacity: 0.44,
    shadowRadius: 50.32,
    elevation: 16,
    alignSelf: "center",
    color: "white",
  },
});
