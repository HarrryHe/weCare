// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC82JYWZAs8bdWMz8g9CRogN8Hs4nVVfz0",
    authDomain: "wecare-b39ab.firebaseapp.com",
    projectId: "wecare-b39ab",
    storageBucket: "wecare-b39ab.appspot.com",
    messagingSenderId: "450953404821",
    appId: "1:450953404821:web:46abc157f6e3e0919d569c",
    measurementId: "G-LYNM8B3VZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { analytics, app, auth, db };

