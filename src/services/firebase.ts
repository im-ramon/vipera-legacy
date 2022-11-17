// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiVdrGxeVbVV7MoPtiRlvQjcKcvzxR6fY",
    authDomain: "vipera-8e4b9.firebaseapp.com",
    projectId: "vipera-8e4b9",
    storageBucket: "vipera-8e4b9.appspot.com",
    messagingSenderId: "574173365708",
    appId: "1:574173365708:web:5e1a7a5631e19b6344c969"
};

// Initialize Firebase
export const firebaseapp = ifirebase.nitializeApp(firebaseConfig)
export const firebaseDatabase = firebase.database();