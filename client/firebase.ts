import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTsjrCoj6WZngTIjpVRpnI-fXEq7Hp5cY",
  authDomain: "bright-data-web-scraper.firebaseapp.com",
  projectId: "bright-data-web-scraper",
  storageBucket: "bright-data-web-scraper.appspot.com",
  messagingSenderId: "123763985077",
  appId: "1:123763985077:web:60d852b312c30a5f320cfc",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
