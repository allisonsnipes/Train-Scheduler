// 1. initialize firebase

  var config = {
    apiKey: "AIzaSyBv4N-6T0mTcj-3w3gFbe89ULnsjI6be3Y",
    authDomain: "trainscheducb.firebaseapp.com",
    databaseURL: "https://trainscheducb.firebaseio.com",
    projectId: "trainscheducb",
    storageBucket: "trainscheducb.appspot.com",
    messagingSenderId: "260908491041"
  };
firebase.initializeApp(config);

//establish shortcut to write code
var database = firebase.database();

//2. place an event listener on the button to add more trains
document.querySelector("#trainBut").addEventListener("click", function(event) {
  event.preventDefault();
})

//2. gather user's input and initilize them into variables
var tName = document.querySelector



