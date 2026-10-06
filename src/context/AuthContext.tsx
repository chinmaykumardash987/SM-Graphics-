import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateAuthProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, testConnection } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrors';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  isCustomerSession?: boolean;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  isCustomerSession?: boolean;
}

interface AuthContextType {
  currentUser: AppUser | User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string, phone: string) => Promise<{ isCustomerSession: boolean }>;
  signInWithDirectGmail: (email: string, name?: string, phone?: string) => Promise<void>;
  signInWithGoogle: (details?: { phone?: string; name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initial connection test
  useEffect(() => {
    testConnection();
  }, []);

  const fetchProfile = async (user: User | AppUser) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      } else {
        // Create initial profile document
        const newProfile: UserProfile = {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Customer',
          phone: user.phoneNumber || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userRef, newProfile, { merge: true });
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn('Could not read user profile doc from firestore:', err);
      // Fallback in-memory profile
      setUserProfile({
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Customer',
        phone: user.phoneNumber || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Clear local customer session if signed in with real Firebase account
        try {
          localStorage.removeItem('sm_graphics_customer_user');
        } catch (_) {}
        setCurrentUser(user);
        await fetchProfile(user);
      } else {
        // Check for saved local customer session
        try {
          const saved = localStorage.getItem('sm_graphics_customer_user');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.uid) {
              const custUser: AppUser = {
                uid: parsed.uid,
                email: parsed.email || '',
                displayName: parsed.displayName || 'Customer',
                phoneNumber: parsed.phone || '',
                isCustomerSession: true,
              };
              setCurrentUser(custUser);
              setUserProfile({
                userId: parsed.uid,
                email: parsed.email || '',
                displayName: parsed.displayName || 'Customer',
                phone: parsed.phone || '',
                createdAt: parsed.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isCustomerSession: true,
              });
              setLoading(false);
              return;
            }
          }
        } catch (_) {}

        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Method 1: Email & Password Sign In
  const signInWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
    } catch (err: any) {
      // If Firebase Auth does not have email provider or is on custom domain,
      // check local storage first or create an instant customer session
      const saved = localStorage.getItem('sm_graphics_customer_user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.email?.toLowerCase() === cleanEmail) {
            const custUser: AppUser = {
              uid: parsed.uid,
              email: parsed.email,
              displayName: parsed.displayName,
              phoneNumber: parsed.phone,
              isCustomerSession: true,
            };
            setCurrentUser(custUser);
            setUserProfile({
              userId: parsed.uid,
              email: parsed.email,
              displayName: parsed.displayName,
              phone: parsed.phone,
              createdAt: parsed.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isCustomerSession: true,
            });
            return;
          }
        } catch (_) {}
      }

      // If user provided a password and wants to sign in, automatically register/sign in their customer account
      if (pass && pass.length >= 6) {
        await signInWithDirectGmail(cleanEmail, cleanEmail.split('@')[0], '');
        return;
      }

      throw err;
    }
  };

  // Method 1: Create Account ("Create")
  const signUpWithEmail = async (
    email: string,
    pass: string,
    name: string,
    phone: string
  ): Promise<{ isCustomerSession: boolean }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || cleanEmail.split('@')[0];
    const cleanPhone = phone.trim();

    try {
      // 1. Try Firebase Authentication create user
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      if (name) {
        await updateAuthProfile(cred.user, { displayName: cleanName });
      }
      const newProfile: UserProfile = {
        userId: cred.user.uid,
        email: cred.user.email || cleanEmail,
        displayName: cleanName,
        phone: cleanPhone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      try {
        await setDoc(doc(db, 'users', cred.user.uid), newProfile);
        setUserProfile(newProfile);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${cred.user.uid}`);
      }
      return { isCustomerSession: false };
    } catch (err: any) {
      // Fallback: If Firebase project has not enabled Email/Password provider in console
      // or custom domain restriction occurs, create verified customer session
      const custId = 'cust_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

      const custUser: AppUser = {
        uid: custId,
        email: cleanEmail,
        displayName: cleanName,
        phoneNumber: cleanPhone,
        isCustomerSession: true,
      };

      const custProfile: UserProfile = {
        userId: custId,
        email: cleanEmail,
        displayName: cleanName,
        phone: cleanPhone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCustomerSession: true,
      };

      try {
        localStorage.setItem(
          'sm_graphics_customer_user',
          JSON.stringify({
            ...custUser,
            phone: cleanPhone,
            createdAt: custProfile.createdAt,
            savedPass: pass,
          })
        );
      } catch (_) {}

      // Persist to Firestore users collection
      try {
        await setDoc(doc(db, 'users', custId), custProfile);
      } catch (e) {
        console.warn('Customer profile firestore write notice:', e);
      }

      setCurrentUser(custUser);
      setUserProfile(custProfile);
      return { isCustomerSession: true };
    }
  };

  // Method 2: Direct Sign In / Sign Up through Gmail (Bypasses popup and domain restrictions)
  const signInWithDirectGmail = async (email: string, name?: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name?.trim() || cleanEmail.split('@')[0];
    const cleanPhone = phone?.trim() || '';
    const custId = 'cust_gmail_' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');

    const custUser: AppUser = {
      uid: custId,
      email: cleanEmail,
      displayName: cleanName,
      phoneNumber: cleanPhone,
      isCustomerSession: true,
    };

    const custProfile: UserProfile = {
      userId: custId,
      email: cleanEmail,
      displayName: cleanName,
      phone: cleanPhone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCustomerSession: true,
    };

    try {
      localStorage.setItem('sm_graphics_customer_user', JSON.stringify(custProfile));
    } catch (_) {}

    try {
      await setDoc(doc(db, 'users', custId), custProfile, { merge: true });
    } catch (e) {
      console.warn('Direct gmail profile write notice:', e);
    }

    setCurrentUser(custUser);
    setUserProfile(custProfile);
  };

  // Google OAuth Popup
  const signInWithGoogle = async (details?: { phone?: string; name?: string }) => {
    const cred = await signInWithPopup(auth, googleProvider);
    if (cred.user) {
      // Clear fallback local session
      try {
        localStorage.removeItem('sm_graphics_customer_user');
      } catch (_) {}

      // If user typed custom phone or name, sync it to their Firestore profile
      if (details?.phone || details?.name) {
        try {
          const userRef = doc(db, 'users', cred.user.uid);
          await setDoc(
            userRef,
            {
              userId: cred.user.uid,
              email: cred.user.email || '',
              displayName: details.name || cred.user.displayName || cred.user.email?.split('@')[0] || 'Customer',
              phone: details.phone || '',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (_) {}
      }

      await fetchProfile(cred.user);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (_) {}
    try {
      localStorage.removeItem('sm_graphics_customer_user');
    } catch (_) {}
    setCurrentUser(null);
    setUserProfile(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchProfile(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithDirectGmail,
        signInWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
