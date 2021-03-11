import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import 'firebase/firestore';

const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_ID } = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();
const firestore = firebase.firestore();

const auth = firebase.auth();
export { auth, storage, firestore, firebase as default };