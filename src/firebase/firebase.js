import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDQ2J7ifRBf0cslgi7HvX19xgCt39Fex54",
  authDomain: "ngetes-7e07f.firebaseapp.com",
  databaseURL: "https://ngetes-7e07f-default-rtdb.firebaseio.com/",
  projectId: "ngetes-7e07f",
  storageBucket: "ngetes-7e07f.appspot.com",
  messagingSenderId: "186797972663",
  appId: "1:186797972663:web:8002e7cb93bd0f861c0132",
  measurementId: "G-KJF6SS204D",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
