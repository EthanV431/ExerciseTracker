
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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


function showAll() {
  //let x = "";

  /*
  var request = new XMLHttpRequest();
  request.open('GET', 'http://127.0.0.1:5000/grades');

  request.onload = function () {
      const ourData = JSON.parse(request.responseText);

      console.log(Object.keys(ourData[0]))
      console.log(Object.values(ourData[0]))

      tbl = document.getElementById("text");
      console.log(tbl.rows.length)
      let size = tbl.rows.length;
      for (j = 0; j < size; j = j + 1) {
          tbl.deleteRow(0);
          console.log(j)
      }

      for (y in ourData) {
          const tr = tbl.insertRow();
          const td = tr.insertCell();
          const td2 = tr.insertCell();
          td.appendChild(document.createTextNode(Object.keys(ourData[y])))
          td2.appendChild(document.createTextNode(Object.values(ourData[y])))
          console.log(y)
      }
  };
  request.send();
  //console.log()
  */

}





document.getElementById("create").addEventListener("submit", function (event) {
  event.preventDefault()

  let names = document.getElementById("name1").value;
  let muscleGroup = document.getElementById("muscles").value;

  let reps = document.getElementById("reps").checked;
  let time = document.getElementById("time").checked;

  console.log(names);
  console.log(muscleGroup)

  console.log(reps)
  console.log(time)
});

document.getElementById("login").addEventListener("submit", function (event) {
  event.preventDefault()

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      updateProfile(userCredentials.user, { displayName: username });
    })
    .catch((error) => {
      alert(error);
    });



});