import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDWmxRIr-iAfjhzb3NI5Vk9OICQImnFww0",
  authDomain: "trade-4b53a.firebaseapp.com",
  databaseURL: "https://trade-4b53a-default-rtdb.firebaseio.com",
  projectId: "trade-4b53a",
  storageBucket: "trade-4b53a.appspot.com",
  messagingSenderId: "1097209650803",
  appId: "1:1097209650803:web:0a0dc5564172a363331406",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
