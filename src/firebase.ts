import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAi-BpKCSgG-IbpHjaGNSWLWPt3hGN8XsU",
  authDomain: "sm-graphics-6d213.firebaseapp.com",
  projectId: "sm-graphics-6d213",
  storageBucket: "sm-graphics-6d213.firebasestorage.app",
  messagingSenderId: "765674251134",
  appId: "1:765674251134:web:5ffda655d746802ad9892f"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Connection check
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
      return false;
    }
    // Any permission error still means server responded and connection was established
    return true;
  }
}
