import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class TradeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logost}>Trade Screen</Text>
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
});
