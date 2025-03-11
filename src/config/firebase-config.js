import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa6am5pN2gUT8D4xaLM5O24c1b1SaH-nY",
  authDomain: "santechapi-df0e8.firebaseapp.com",
  projectId: "santechapi-df0e8",
  storageBucket: "santechapi-df0e8.appspot.com",
  messagingSenderId: "686814201550",
  appId: "1:686814201550:web:0c4b98a0d5f27dd0a7729f",
  measurementId: "G-5GLMM12J5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
