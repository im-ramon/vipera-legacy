import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAiVdrGxeVbVV7MoPtiRlvQjcKcvzxR6fY",
    authDomain: "vipera-8e4b9.firebaseapp.com",
    databaseURL: "https://vipera-8e4b9-default-rtdb.firebaseio.com",
    projectId: "vipera-8e4b9",
    storageBucket: "vipera-8e4b9.appspot.com",
    messagingSenderId: "574173365708",
    appId: "1:574173365708:web:5e1a7a5631e19b6344c969"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)