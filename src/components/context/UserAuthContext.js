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
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../config/firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [apis, setapis] = useState([null]);
  const [conversation, setConversation] = useState([]);
  const [title, setTitle] = useState("");
  const [apiKeys, setApiKeys] = useState([]);

  function logIn(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          if (response.user.emailVerified) {
            resolve(response);
          } else {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                reject({
                  message:
                    "Please verify your account via the email sent to you! (Check Spam Folder)",
                });
              })
              .catch((error) => {
                reject({
                  message:
                    "Unable to send verification email. Please try again.",
                });
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function signUp(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          sendEmailVerification(result.user)
            .then(() => {
              console.log(result);
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function GithubSignIn() {
    const githubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubAuthProvider);
  }
  function forgetpassword(email) {
    return sendPasswordResetEmail(auth, email);
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
      value={{
        user,
        apis,
        setapis,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        forgetpassword,
        GithubSignIn,
        conversation,
        setConversation,
        setTitle,
        title,
        setApiKeys,
        apiKeys,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
