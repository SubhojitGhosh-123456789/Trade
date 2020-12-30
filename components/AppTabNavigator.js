import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppStackNavigator } from "./AppStackNavigator";
import TradeScreen from "../Screens/Trade-Screen";
import RequestScreen from "../Screens/Request-Screen";

export const AppTabNavigator = createBottomTabNavigator({
  Donate: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/trade.png")}
          style={{ width: 60, height: 60, marginBottom: 20 }}
        />
      ),
      tabBarLabel: "Trade",
    },
  },
  Request: {
    screen: RequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request.png")}
          style={{ width: 40, height: 40, marginBottom: 20 }}
        />
      ),
      tabBarLabel: "Request",
    },
  },
});
