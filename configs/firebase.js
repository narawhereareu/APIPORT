// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAoKP15xz9d4wks3iSXH_dfMkyjiVsq70",
  authDomain: "portfolionnj.firebaseapp.com",
  projectId: "portfolionnj",
  storageBucket: "portfolionnj.firebasestorage.app",
  messagingSenderId: "48176830146",
  appId: "1:48176830146:web:f8f1e0d5cd5d8002e64d5b",
  measurementId: "G-WBDGCK2W15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);