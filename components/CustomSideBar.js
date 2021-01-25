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
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      image: "#",
      userId: firebase.auth().currentUser.email,
    };
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
      this.setState({ image: uri });
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("UserProfiles/" + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("UserProfiles/" + imageName);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  componentDidMount() {
    this.fetchImage(this.state.userId);
  }

  render() {
    console.log(firebase.auth().currentUser.displayName);
    return (
      <View style={{ flex: 1, backgroundColor: "#235e71" }}>
        <View
          style={{
            backgroundColor: "#33867E",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size={150}
            onPress={() => {
              this.selectPicture();
            }}
            containerStyle={styles.imageContainer}
            showEditButton
          />
        </View>

        <View style={{ backgroundColor: "#33867E", alignItems: "center" }}>
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
    marginTop: RFValue(13),
  },
  logOutContainer: {
    marginTop: RFValue(13),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: RFValue(22),
  },
  logOutButton: {
    justifyContent: "center",
    width: RFValue(2),
    backgroundColor: "#fb5b5a",
    height: RFValue(17),
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
  imageContainer: {
    backgroundColor: "#1182C6",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: RFValue(34),
  },
});
