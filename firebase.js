// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDJvJR2tF0JQN0u86-hH2FDheCoHrBJAxI",
    authDomain: "jomshare-43f62.firebaseapp.com",
    databaseURL: "https://jomshare-43f62.firebaseio.com",
    projectId: "jomshare-43f62",
    storageBucket: "jomshare-43f62.appspot.com",
    messagingSenderId: "603263020052",
    appId: "1:603263020052:web:76ead44618bf9fc5160b01",
    measurementId: "G-4NPH9VKST3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Init Firestore
var db = firebase.firestore();