import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyABuLW5Fk2m9Gy1UU3pyIvlMLRF1tI6nnA",
  authDomain: "santechapi-df0e8.firebaseapp.com",
  projectId: "santechapi-df0e8",
  storageBucket: "santechapi-df0e8.appspot.com",
  messagingSenderId: "686814201550",
  appId: "1:686814201550:web:5ed2a543013be6c6a7729f",
  measurementId: "G-KK9MCRF9BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
