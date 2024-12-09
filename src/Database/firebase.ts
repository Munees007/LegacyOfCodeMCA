// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBw82dnnYPQ1UCflVOEnFBe1WLH04fIfxo",
  authDomain: "legacyofcode-89ebe.firebaseapp.com",
  databaseURL: "https://legacyofcode-89ebe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "legacyofcode-89ebe",
  storageBucket: "legacyofcode-89ebe.firebasestorage.app",
  messagingSenderId: "1085696896374",
  appId: "1:1085696896374:web:715ef22937a3492f0d5e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app,db};