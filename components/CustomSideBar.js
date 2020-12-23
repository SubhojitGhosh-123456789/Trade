import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import SettingsScreen from "../Screens/Settings-Screen";
import db from "../config";
import firebase from "firebase";

export default class SideBar extends React.Component {
  render() {
    console.log(firebase.auth().currentUser.displayName);
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/draw.jpg")}
          style={{ width: "100%", height: 200 }}
        />
        <View style={{ backgroundColor: "#1182C6" }}>
          <Text style={styles.displayText}>
            Hello {firebase.auth().currentUser.displayName}
          </Text>
        </View>

        <View style={styles.drawerItems}>
          <DrawerItems {...this.props} />
        </View>

        <View style={styles.logOutContainer}>
          <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("LoginScreen");
              ToastAndroid.show(
                "You Have Signed Out Successlly!!",
                ToastAndroid.SHORT
              );
            }}
          >
            <Text style={styles.logOutText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerItems: {
    flex: 0.2,
    marginTop: 50,
  },
  logOutContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  logOutButton: {
    justifyContent: "center",
    width: "50%",
    backgroundColor: "#fb5b5a",
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    shadowOpacity: 0.44,
    shadowRadius: 50.32,
    elevation: 16,
    alignSelf: "center",
    color: "white",
  },
  logOutText: {
    fontSize: 20,
    color: "white",
  },
  displayText: {
    fontSize: 25,
    color: "white",
    margin: 20,
  },
});
