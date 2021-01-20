import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, ListItem, Header } from "react-native-elements";
import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/AppHeader";
import { ScrollView } from "react-native-gesture-handler";

export default class MyTradesScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();
    this.state = {
      traderName: firebase.auth().currentUser.displayName,
      userId: firebase.auth().currentUser.email,
      allTrades: [],
    };
  }

  getAllTrades = async () => {
    await firebase
      .firestore()
      .collection("TradedItems")
      .where("TraderEmail", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allTrades = snapshot.docs.map((document) => document.data());
        this.setState({
          allTrades: allTrades,
        });
      });
  };
  componentDidMount() {
    this.getAllTrades();
  }

  sendBook = async (itemDetails) => {
    if (itemDetails.RequestStatus === "Trader Interested") {
      var requestStatus = "Exchanged";
      await firebase
        .firestore()
        .collection("TradedItems")
        .where("TraderEmail", "==", itemDetails.TraderEmail)
        .where("RequestID", "==", itemDetails.RequestID)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id);
            firebase.firestore().collection("TradedItems").doc(doc.id).update({
              RequestStatus: requestStatus,
            });
          });
        });
      this.sendNotification(itemDetails, itemDetails.RequestStatus);
    } else {
      alert("Changing Request Status To Trader Interested");
      var requestStatus = "Trader Interested";
      await firebase
        .firestore()
        .collection("TradedItems")
        .where("TraderEmail", "==", itemDetails.TraderEmail)
        .where("RequestID", "==", itemDetails.RequestID)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id);
            firebase.firestore().collection("TradedItems").doc(doc.id).update({
              RequestStatus: requestStatus,
            });
          });
        });

      this.sendNotification(itemDetails, itemDetails.RequestStatus);
    }
  };

  sendNotification = async (itemDetails, requestStatus) => {
    var requestId = itemDetails.RequestedEmail;
    var traderId = itemDetails.traderEmail;

    await firebase
      .firestore()
      .collection("Notifications")
      .where("TraderEmail", "==", traderId)
      .where("RequestedEmail", "==", requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = "";
          if (requestStatus === "Exchanged") {
            message =
              this.state.traderName +
              " has Shown Interest In Exchanging The Item";
          } else {
            message =
              this.state.traderName + " has Exchanged With You For The Item";
          }
          firebase.firestore().collection("Notifications").doc(doc.id).update({
            Message: message,
            NotificationStatus: "Unread",
            Date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem key={i} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.ItemName}</ListItem.Title>
        <ListItem.Subtitle>Requested By: {item.RequestedBy}</ListItem.Subtitle>
        <ListItem.Subtitle>
          Request Status: {item.RequestStatus}
        </ListItem.Subtitle>
      </ListItem.Content>
      <View>
        <TouchableOpacity
          onPress={() => {
            this.sendBook(item);
          }}
        >
          <Icon
            name="check-circle"
            type="font-awesome"
            color="magenta"
            size={50}
          />
        </TouchableOpacity>
      </View>
    </ListItem>
  );

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="My Trades" navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ flex: 1 }}>
            {this.state.allTrades.length === 0 ? (
              <View style={styles.subtitle}>
                <Text
                  style={{ fontSize: 20, color: "white", alignSelf: "center" }}
                >
                  No Trades
                </Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allTrades}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  logost: {
    fontWeight: "bold",
    fontSize: 30,
    color: "yellow",
    textAlign: "center",
    marginBottom: 20,
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
