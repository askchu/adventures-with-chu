import firebase from 'firebase/app';
import "firebase/auth";
const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_ID } = process.env;

const app = firebase.initializeApp({
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID
    // apiKey: "AIzaSyBA0tULZMZ3wL0-mVXxOLpfb4zGa3G5acM",
    // authDomain: "auth-production-90d68.firebaseapp.com",
    // projectId: "auth-production-90d68",
    // storageBucket: "auth-production-90d68.appspot.com",
    // messagingSenderId: "83876496888",
    // appId: "1:83876496888:web:7471c0781bc281ee7c020d"
})



export const auth = app.auth();
export default app;