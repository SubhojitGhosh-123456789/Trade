import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import db from "../config";
import firebase from "firebase";

export default class AppSwipelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
    };
  }

  updateMarkAsread = (notification) => {
    firebase
      .firestore()
      .collection("Notifications")
      .doc(notification.doc_id)
      .update({
        NotificationStatus: "Read",
      });
  };

  onSwipeValueChange = (swipeData) => {
    var allNotifications = this.state.allNotifications;
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      const newData = [...allNotifications];
      this.updateMarkAsread(allNotifications[key]);
      newData.splice(key, 1);
      this.setState({
        allNotifications: newData,
      });
    }
  };

  renderItem = (data) => {
    return (
      <Animated.View>
        <ListItem
          bottomDivider
          containerStyle={{ backgroundColor: "blue", borderRadius: 15 }}
        >
          <Icon name="exchange" type="font-awesome" color="white" />
          <ListItem.Content>
            <ListItem.Title
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            >
              {data.item.ItemName}
            </ListItem.Title>
            <ListItem.Subtitle style={{ color: "yellow", marginTop: 10 }}>
              {data.item.Message}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Animated.View>
    );
  };

  renderHiddenItem = () => {
    return (
      <View style={styles.rowBack}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>Mark as read</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: "#29b6f6",
    right: 0,
  },
});
