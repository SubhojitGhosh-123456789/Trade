import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { ListItem, Header } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import MyHeader from "../components/AppHeader";
import { RFValue } from "react-native-responsive-fontsize";

export default class TradeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
    this.requestRef = null;
  }

  getRequestedItemsList = async () => {
    this.requestRef = firebase
      .firestore()
      .collection("RequestedItems")
      .onSnapshot((snapshot) => {
        var requestedItemList = snapshot.docs.map((document) =>
          document.data()
        );
        this.setState({ list: requestedItemList });
      });
  };
  componentDidMount() {
    this.getRequestedItemsList();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.ItemName}</ListItem.Title>
          <ListItem.Subtitle>{item.Description}</ListItem.Subtitle>
          <Text>Trade Offer by {item.UserName}</Text>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("TradingScreen", {
                  Details: item,
                });
              }}
            >
              <Text style={{ color: "white" }}>Trade With {item.UserName}</Text>
            </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Find Barters" navigation={this.props.navigation} />
        <ScrollView>
          <View style={{ flex: 1 }}>
            {this.state.list.length === 0 ? (
              <View style={styles.subContainer}>
                <Text>Please Check Your Internet Connection</Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.list}
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
    marginBottom: RFValue(34),
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: RFValue(34),
    width: RFValue(3.2),
    backgroundColor: "#fb5b5a",
    height: RFValue(17),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.44,
    shadowRadius: 50.32,
    elevation: 16,
    alignSelf: "center",
    color: "white",
  },
});
