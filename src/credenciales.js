// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtEoQl61hGUYWEzwy6A84q_9sJh0djZEo",
  authDomain: "gestortareaslogin.firebaseapp.com",
  projectId: "gestortareaslogin",
  storageBucket: "gestortareaslogin.appspot.com",
  messagingSenderId: "609286567177",
  appId: "1:609286567177:web:2646f5212ad3d3bad2cfd8",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
