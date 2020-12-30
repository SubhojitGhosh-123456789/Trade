import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import TradeScreen from "../Screens/Trade-Screen";
import TradingScreen from "../Screens/Trading-Screen";

export const AppStackNavigator = createStackNavigator(
  {
    TradeScreen: {
      screen: TradeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    TradingScreen: {
      screen: TradingScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "TradeScreen",
  }
);
