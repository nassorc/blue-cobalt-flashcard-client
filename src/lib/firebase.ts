// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain:  import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId:  import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket:  import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId:  import.meta.env.VITE_FB_MSG_SENDER_ID,
    appId:  import.meta.env.VITE_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app;
export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
}