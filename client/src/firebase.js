// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, //import.meta.env.VITE_FIREBASE_API_KEY is used to hide the api key of the firebase through environment variables
  authDomain: "mern-profitestate.firebaseapp.com",
  projectId: "mern-profitestate",
  storageBucket: "mern-profitestate.firebasestorage.app",
  messagingSenderId: "1039732002037",
  appId: "1:1039732002037:web:994d7f6fabb63f578449bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);