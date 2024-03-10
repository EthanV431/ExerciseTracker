//tutorial can be found here: https://complete-serpent-bd9.notion.site/Firebase-Auth-Firestore-503c37fa10244e74926626767a2bd3de
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBD5O_BPgpNKIAYj4xa94D4TJqLfuLVkqQ',
  authDomain: 'fitnessdatabase-1292d.firebaseapp.com',
  projectId: 'fitnessdatabase-1292d',
  storageBucket: 'fitnessdatabase-1292d.appspot.com',
  messagingSenderId: '122665824402',
  appId: '1:122665824402:web:e86a6880b455bd7544f64b',
  measurementId: 'G-H1EMFSF19F',
};

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//==== FIREBASE AUTH ====
export function createAccount(username, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      updateProfile(userCredentials.user, { displayName: username });
    })
    .catch((error) => {
      alert(error);
    });
}

export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    alert(error);
  });
}

export function signOutUser() {
  signOut(auth).catch((error) => {
    alert(error);
  });
}

export function updateOnAuthStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

//==== FIRESTORE ====
export function dbAddComment(userID, username, comment) {
  if (comment.trim() != '') {
    addDoc(collection(db, 'comments'), {
      comment: comment,
      timestamp: Date.now(),
      userID: userID,
      username: username,
    }).catch((error) => {
      alert(error);
    });
  }
}

export function updateOnSnapshot(callback) {
  const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
  onSnapshot(q, callback);
}
