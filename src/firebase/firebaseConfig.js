import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFf9hw92TGmXQ55WAAecX5DJVYQcxF9NU",
  authDomain: "accuknox-b6742.firebaseapp.com",
  projectId: "accuknox-b6742",
  storageBucket: "accuknox-b6742.appspot.com",
  messagingSenderId: "770394312927",
  appId: "1:770394312927:web:b67ca8a73dc7af08ad596a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);