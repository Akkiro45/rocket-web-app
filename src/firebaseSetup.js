import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const setupFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCTvUptk1I82hHE2rASF31SkwgHNkVD8Ms",
    authDomain: "rocket-linksaver.firebaseapp.com",
    databaseURL: "https://rocket-linksaver.firebaseio.com",
    projectId: "rocket-linksaver",
    storageBucket: "rocket-linksaver.appspot.com",
    messagingSenderId: "39092207020",
    appId: "1:39092207020:web:5cf2830e351798cd438e09",
    measurementId: "G-4KCX2V3W8S"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}