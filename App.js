import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SplashScreen from "./Screens/Splash-Screen";
import LoginScreen from "./Screens/Login-Screen";
import { AppDrawer } from "./components/AppDrawerNavigation";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const screen = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  Drawer: {
    screen: AppDrawer,
  },
});

const AppContainer = createAppContainer(screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00547A",
  },
});
