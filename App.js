import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SplashScreen from "./Screens/Splash-Screen";
import LoginScreen from "./Screens/Login-Screen";

import TradeScreen from "./Screens/Trade-Screen";
import RequestScreen from "./Screens/Request-Screen";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Trade: {
      screen: TradeScreen,
    },
    Request: {
      screen: RequestScreen,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName === "Trade") {
          return (
            <Image
              source={require("./assets/trade.png")}
              style={{ width: 60, height: 60, marginBottom: 20 }}
            />
          );
        } else if (routeName === "Request") {
          return (
            <Image
              source={require("./assets/request.png")}
              style={{ width: 40, height: 40, marginBottom: 20 }}
            />
          );
        }
      },
    }),
  }
);
const screen = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  LoginScreen: {
    screen: LoginScreen,
  },
  TabNavigator: {
    screen: TabNavigator,
  },
});

const AppContainer = createAppContainer(screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00547A",
  },
});
