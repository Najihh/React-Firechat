import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB5SaExKiA8x7ySBr_dr8RlND7712fQdBk",
    authDomain: "najfire-sc.firebaseapp.com",
    databaseURL: "https://najfire-sc.firebaseio.com",
    projectId: "najfire-sc",
    storageBucket: "najfire-sc.appspot.com",
    messagingSenderId: "751412893240"
  };
  
 const firebaseApp  = firebase.initializeApp(config);

export default firebaseApp;
