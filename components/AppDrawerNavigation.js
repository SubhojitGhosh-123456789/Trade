import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "./CustomSideBar";
import { AppTabNavigator } from "./AppTabNavigator";
import SettingsScreen from "../Screens/Settings-Screen";
import MyTradesScreen from "../Screens/MyTrades-Screen";
import NotificationsScreen from "../Screens/Notifications-Screen";
import { Icon } from "react-native-elements";
import RecievedItemsScreen from "../Screens/RecievedItems-Screen";
import { RFValue } from "react-native-responsive-fontsize";

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
            containerStyle={{ marginBottom: RFValue(34) }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: RFValue(34),
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
            containerStyle={{ marginBottom: RFValue(34) }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: RFValue(34),
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
            containerStyle={{ marginBottom: RFValue(34) }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: RFValue(34),
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
            containerStyle={{ marginBottom: RFValue(34) }}
          />
        ),
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: RFValue(34),
            }}
          >
            Notifications
          </Text>
        ),
      },
    },
    Recieved: {
      screen: RecievedItemsScreen,
      navigationOptions: {
        drawerLabel: (
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: RFValue(34),
            }}
          >
            Recieved Items
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
