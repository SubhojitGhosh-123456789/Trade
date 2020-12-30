import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "./CustomSideBar";
import { AppTabNavigator } from "./AppTabNavigator";
import SettingsScreen from "../Screens/Settings-Screen";
import MyTradesScreen from "../Screens/MyTrades-Screen";
import NotificationsScreen from "../Screens/Notifications-Screen";

export const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    Settings: {
      screen: SettingsScreen,
    },
    Trades: {
      screen: MyTradesScreen,
    },
    Notifications: {
      screen: NotificationsScreen,
    },
  },
  {
    contentComponent: SideBar,
  },
  {
    initialRouteName: "Home",
  }
);
