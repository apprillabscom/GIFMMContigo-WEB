import * as firebase from "firebase";
import "firebase/auth";
//import dataConfig from './dataConfig'

const app = firebase.initializeApp(
    {
        apiKey: "AIzaSyB--W4wRJJcoUEOaU-UdMRzkVkPRZdSMfo",
        authDomain: "oimcol.firebaseapp.com",
        databaseURL: "https://oimcol-default-rtdb.firebaseio.com",
        projectId: "oimcol",
        storageBucket: "oimcol.appspot.com",
        messagingSenderId: "70900825873",
        appId: "1:70900825873:web:61a38976380b3819e396b0",
        measurementId: "G-REHXBLGDBH"
    }
);

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

export default app;