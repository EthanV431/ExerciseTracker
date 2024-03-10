// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyUo-rtq3hCtKWKuYmDBa7b9AuU3N-Bpg",
  authDomain: "fitnesstracker-5ccbd.firebaseapp.com",
  projectId: "fitnesstracker-5ccbd",
  storageBucket: "fitnesstracker-5ccbd.appspot.com",
  messagingSenderId: "875614735189",
  appId: "1:875614735189:web:97c10aa715c4a5289e7ddc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


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
