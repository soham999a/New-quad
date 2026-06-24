import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: any;
  userProfile: any;
  loading: boolean;
  signup: (
    email: string,
    password: string,
    name: string,
    role?: string,
    context?: string,
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  loginWithGoogle: (role?: string, context?: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserRole: (uid: string, role: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (snap.exists()) setUserProfile(snap.data());
        } catch (e: any) {
          console.warn("Could not load user profile:", e.message);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signup = async (
    email: string,
    password: string,
    name: string,
    role = "individual",
    context = "individual",
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const profile = {
      uid: cred.user.uid,
      name,
      email,
      role,
      context,
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, "users", cred.user.uid), profile);
    } catch (e: any) {
      console.warn("Could not save user profile:", e.message);
    }
    setUserProfile(profile);
    return cred.user;
  };

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    try {
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (snap.exists()) setUserProfile(snap.data());
    } catch (e: any) {
      console.warn("Could not load user profile:", e.message);
    }
    return cred.user;
  };

  const loginWithGoogle = async (role = "individual", context = "individual") => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const u = result.user;
    try {
      const snap = await getDoc(doc(db, "users", u.uid));
      if (!snap.exists()) {
        const profile = {
          uid: u.uid,
          name: u.displayName || "",
          email: u.email,
          role,
          context,
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, "users", u.uid), profile);
        setUserProfile(profile);
      } else {
        setUserProfile(snap.data());
      }
    } catch (e: any) {
      console.warn("Google sign-in Firestore error:", e.message);
    }
    return { user: u, isNew: !snap?.exists() };
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserRole = async (uid: string, role: string) => {
    try {
      await updateDoc(doc(db, "users", uid), { role, updatedAt: serverTimestamp() });
      if (user?.uid === uid) {
        setUserProfile((prev: any) => (prev ? { ...prev, role } : prev));
      }
    } catch (e: any) {
      console.warn("Could not update role:", e.message);
      throw e;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setUserProfile(snap.data());
      } catch (e: any) {
        console.warn("Could not refresh profile:", e.message);
      }
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        resetPassword,
        updateUserRole,
        refreshProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
