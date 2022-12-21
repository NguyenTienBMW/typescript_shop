import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC-D45Xf9_MbqpGyB6erhNesnwzw6bgsPQ",
  authDomain: "myblog-ca5b2.firebaseapp.com",
  databaseURL: "https://myblog-ca5b2-default-rtdb.firebaseio.com",
  projectId: "myblog-ca5b2",
  storageBucket: "myblog-ca5b2.appspot.com",
  messagingSenderId: "966786373666",
  appId: "1:966786373666:web:324e557815f9bc08b9d27b",
  measurementId: "G-TJP3YFGRNJ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);