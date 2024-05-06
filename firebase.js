import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAAfNZK_2Ce_l4AiQ28wDPJUEtl52huWuc",
  authDomain: "reactproject1-4d834.firebaseapp.com",
  projectId: "reactproject1-4d834",
  storageBucket: "reactproject1-4d834.appspot.com",
  messagingSenderId: "648940520542",
  appId: "1:648940520542:web:4a7431738e1447e8bca0cf"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export {app, database}