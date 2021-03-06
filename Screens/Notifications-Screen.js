import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { ListItem, Icon, Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import MyHeader from "../components/AppHeader";
import AppSwipelist from "../components/AppSwipelist";

export default class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: [],
    };

    this.notificationRef = null;
  }

  getNotifications = () => {
    this.notificationRef = firebase
      .firestore()
      .collection("Notifications")
      .where("NotificationStatus", "==", "Unread")
      .where("RequestedEmail", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          allNotifications.push(notification);
        });
        this.setState({
          allNotifications: allNotifications,
        });
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        <Icon name="book" type="font-awesome" color="#696969" />
        <ListItem.Content>
          <ListItem.Title titleStyle={{ color: "black", fontWeight: "bold" }}>
            {item.ItemName}
          </ListItem.Title>
          <ListItem.Subtitle>{item.Message}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Notifications" navigation={this.props.navigation} />
        <ScrollView>
          <View>
            {this.state.allNotifications.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    alignSelf: "center",
                    fontSize: 16,
                  }}
                >
                  You Have No Unread Notifications
                </Text>
              </View>
            ) : (
              <AppSwipelist allNotifications={this.state.allNotifications} />
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
});
