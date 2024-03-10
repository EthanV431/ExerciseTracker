// Your web app's Firebase configuration


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getFirestore,
  ref,
  collection,
  onSnapshot,
  query,
  orderBy} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import {   getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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
  // Initialize variables
  const auth = getAuth(app)
  const database = getFirestore(app)
  
  // Set up our register function
  function register () {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let full_name = document.getElementById('username').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    signInWithEmailAndPassword(auth, email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

var register_button = document.getElementById("register_button");
var login_button = document.getElementById("login_button");
register_button.addEventListener("click", register);
login_button.addEventListener("click", login);