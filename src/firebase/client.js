import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDqLacdF4Esesi_0v7igY1zK7ezPWKvk58",
    authDomain: "e-commerce-36c65.firebaseapp.com",
    projectId: "e-commerce-36c65",
    storageBucket: "e-commerce-36c65.appspot.com",
    messagingSenderId: "345795490716",
    appId: "1:345795490716:web:be1c930fa9ce01f9964e59"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);




