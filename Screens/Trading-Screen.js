import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header, Icon, Card } from "react-native-elements";

export default class TradingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: firebase.auth().currentUser.email,
      donor: firebase.auth().currentUser.displayName,
      email: this.props.navigation.getParam("Details")["Email"],
      requestId: this.props.navigation.getParam("Details")["RequestID"],
      username: this.props.navigation.getParam("Details")["UserName"],
      itemname: this.props.navigation.getParam("Details")["ItemName"],
      description: this.props.navigation.getParam("Details")["Description"],
      address: "",
      phone: "",
      recieverRequestId: "",
    };
  }

  getRecieverDetails = async () => {
    await firebase
      .firestore()
      .collection("Users")
      .where("Email", "==", this.state.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data);
          this.setState({
            phone: doc.data().Phone,
            address: doc.data().Address,
          });
        });
      });

    await firebase
      .firestore()
      .collection("RequestedItems")
      .where("RequestID", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            recieverRequestId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getRecieverDetails();
  }

  updateTradeStatus = async () => {
    await firebase.firestore().collection("TradedItems").add({
      ItemName: this.state.itemname,
      RequestedBy: this.state.username,
      RequestedEmail: this.state.email,
      RequestID: this.state.requestId,
      Trader: this.state.donor,
      TraderEmail: this.state.userEmail,
      RequestStatus: "Trader Interested",
    });

    this.props.navigation.goBack();

    ToastAndroid.show("Bartered Successfully", ToastAndroid.SHORT);
  };

  addNotification = async () => {
    var message =
      this.state.donor +
      " has shown interest in exchanging the item- " +
      this.state.itemname;
    await firebase.firestore().collection("Notifications").add({
      ItemName: this.state.itemname,
      RequestedBy: this.state.username,
      RequestedEmail: this.state.email,
      Trader: this.state.donor,
      TraderEmail: this.state.userEmail,
      Date: firebase.firestore.FieldValue.serverTimestamp(),
      NotificationStatus: "Unread",
      Message: message,
    });

    this.props.navigation.goBack();

    ToastAndroid.show("Shown Interest Successfully", ToastAndroid.SHORT);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="white"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: "Trade Item",
            style: { color: "white", fontSize: 17, marginTop: 10 },
          }}
        />
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Card borderRadius={25}>
              <Card.Title>Item Request Information</Card.Title>
              <Card.Divider />
              <Card.Title>Item Name: {this.state.itemname}</Card.Title>
              <Card.Title>Description: {this.state.description}</Card.Title>
              <Card.Divider />
              <Card.Title>Name: {this.state.username}</Card.Title>
              <Card.Divider />
              <Card.Title>Mobile Number:</Card.Title>
              <Card.Title>{this.state.phone}</Card.Title>
              <Card.Divider />
              <Card.Title>Address:</Card.Title>
              <Card.Title>{this.state.address}</Card.Title>
              <Card.Divider />
              <Card.Title>Email:</Card.Title>
              <Card.Title>{this.state.email}</Card.Title>
            </Card>
            <View>
              {this.state.userEmail !== this.state.email ? (
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={() => {
                    this.updateTradeStatus();
                    this.addNotification();
                    this.props.navigation.navigate("MyTradesScreen");
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Interested To Barter Item
                  </Text>
                </TouchableOpacity>
              ) : (
                ToastAndroid.show(
                  "You Cannot Barter To Yourself",
                  ToastAndroid.LONG
                )
              )}
            </View>
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
    backgroundColor: "#00547A",
  },
  loginBtn: {
    width: "75%",
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
