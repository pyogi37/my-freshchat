// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-m_zNKIwf2hhOpX_D3PevO00nMOZgbAA",
  authDomain: "my-freshchat.firebaseapp.com",
  projectId: "my-freshchat",
  storageBucket: "my-freshchat.firebasestorage.app",
  messagingSenderId: "727960222078",
  appId: "1:727960222078:web:c54e00f9ec0e84a88e5b2f",
  measurementId: "G-H8ZCF24DWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export instances for use in other parts of the app
export { db, auth };
