import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../../config/firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [apis,setapis] = useState([null]);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    const result = createUserWithEmailAndPassword(auth, email, password);
    return result;
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function GithubSignIn() {
    const githubAuthProvider  = new GithubAuthProvider();
    return signInWithPopup(auth, githubAuthProvider);
  }
  function forgetpassword(email){
  return sendPasswordResetEmail(auth,email)
  }
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user,apis, logIn, signUp, logOut, googleSignIn ,forgetpassword,GithubSignIn}}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}