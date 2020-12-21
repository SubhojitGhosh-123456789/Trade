import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate("LoginScreen");
    }, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.logost}>Trade</Text>

          <Text style={styles.logot}>Your Barter System App</Text>
          <ActivityIndicator size={80} color="orange" />
        </View>
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
  logot: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: "magenta",
    marginBottom: 50,
  },

  logost: {
    fontWeight: "bold",
    fontSize: 50,
    color: "yellow",
    textAlign: "center",
    marginBottom: 20,
  },
});
