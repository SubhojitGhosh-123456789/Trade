import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "./CustomSideBar";
import { AppTabNavigator } from "./AppTabNavigator";
import SettingsScreen from "../Screens/Settings-Screen";
import MyTradesScreen from "../Screens/MyTrades-Screen";
import NotificationsScreen from "../Screens/Notifications-Screen";
import { Icon } from "react-native-elements";

export const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: (
          <Icon
            name="home"
            size={24}
            type="font-awesome"
            color="white"
            containerStyle={{ marginBottom: 20 }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Home
          </Text>
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: (
          <Icon
            name="cog"
            size={24}
            type="font-awesome"
            color="white"
            containerStyle={{ marginBottom: 20 }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Settings
          </Text>
        ),
      },
    },
    Trades: {
      screen: MyTradesScreen,
      navigationOptions: {
        drawerIcon: (
          <Icon
            name="exchange"
            size={24}
            type="font-awesome"
            color="white"
            containerStyle={{ marginBottom: 20 }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            My Trades
          </Text>
        ),
      },
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        drawerIcon: (
          <Icon
            name="bell"
            size={24}
            type="font-awesome"
            color="white"
            containerStyle={{ marginBottom: 20 }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Notifications
          </Text>
        ),
      },
    },
  },
  {
    contentComponent: SideBar,
  },
  {
    initialRouteName: "Home",
  }
);
