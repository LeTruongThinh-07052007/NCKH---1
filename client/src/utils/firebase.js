
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "slumbershift-87b2d.firebaseapp.com",
  projectId: "slumbershift-87b2d",
  storageBucket: "slumbershift-87b2d.appspot.com",
  messagingSenderId: "296734269123",
  appId: "1:296734269123:web:e6c7672202927425c84c76"
};


export const app = initializeApp(firebaseConfig);