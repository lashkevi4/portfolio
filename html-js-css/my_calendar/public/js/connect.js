const firebase = require('firebase');
// Required for side-effects
require("firebase/database");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAnxFwT75ER7eH-t7AosrupsqBrr63iPtw",
  authDomain: "finn-calendar.firebaseapp.com",
  databaseURL: "https://finn-calendar-default-rtdb.firebaseio.com",
  projectId: "finn-calendar",
  storageBucket: "finn-calendar.appspot.com",
  messagingSenderId: "247106375727",
  appId: "1:247106375727:web:cc7ae66bc609d1d427b6da"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// ПРОВЕРКА БАЗЫ ДАННАХ
let databaseReference = database.ref('test');
databaseReference.set({
  testKey: "testValue"
});

databaseReference.once('value', function (snapshot) {
  console.log(snapshot.val());
});
