import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD6bTx-Z_AJKQNaWnl0G3n6XcGfvnIJfmI",
  authDomain: "crwn-db-cd5de.firebaseapp.com",
  databaseURL: "https://crwn-db-cd5de.firebaseio.com",
  projectId: "crwn-db-cd5de",
  storageBucket: "crwn-db-cd5de.appspot.com",
  messagingSenderId: "355909052473",
  appId: "1:355909052473:web:6d9619f1d0babd2457c5e8",
  measurementId: "G-PD5XJFZL3R"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
