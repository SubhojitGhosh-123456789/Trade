import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import db from "../config";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecievedItemsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
    this.recieveRef = null;
  }

  getRecievedItemsList = async () => {
    console.log("Calling");
    this.recieveRef = firebase
      .firestore()
      .collection("RecievedItems")
      .onSnapshot((snapshot) => {
        var recievedItemList = snapshot.docs.map((document) => document.data());
        this.setState({ list: recievedItemList });
      });
  };
  componentDidMount() {
    this.getRecievedItemsList();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.ItemName}</ListItem.Title>
          <ListItem.Subtitle>{item.ItemStatus}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Recieved Items" navigation={this.props.navigation} />
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
    width: RFValue(3.5),
    backgroundColor: "#fb5b5a",
    height: RFValue(1.7),
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
