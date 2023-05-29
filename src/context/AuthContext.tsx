import firebase from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../.firebase';

export const AuthContext = createContext<firebase.User | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
