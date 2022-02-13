import * as firebase from "firebase";
import "firebase/auth";
//import dataConfig from './dataConfig'

const app = firebase.initializeApp(
    {
    apiKey: "AIzaSyAoz-euenx3yKYZnpI5w8fFnhqbE5j7f6w",
    authDomain: "movii-tracking.firebaseapp.com",
    databaseURL: "https://movii-tracking-default-rtdb.firebaseio.com",
    projectId: "movii-tracking",
    storageBucket: "movii-tracking.appspot.com",
    messagingSenderId: "991210031183",
    appId: "1:991210031183:web:00c8e519824eea18b0023a",
    measurementId: "G-VZ0HJ78159"
}
);

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

export default app;