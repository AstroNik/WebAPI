import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBoRhQTTtmJkj8cf-cf4jOqNqstSzlVEdA",
    authDomain: "soilmoisturesensorapp.firebaseapp.com",
    databaseURL: "https://soilmoisturesensorapp.firebaseio.com",
    projectId: "soilmoisturesensorapp",
    storageBucket: "soilmoisturesensorapp.appspot.com",
    messagingSenderId: "720071628416",
    appId: "1:720071628416:web:9719544a48bced80623865",
    measurementId: "G-JRNBKFQR4Q"
};

const Fire = firebase.initializeApp(firebaseConfig);

export default Fire;