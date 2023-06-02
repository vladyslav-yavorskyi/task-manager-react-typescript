import firebase from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../.firebase';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>({
    isSignedIn: false,
    pending: true,
    currentUser: null,
  });
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser({ currentUser, pending: false, isSignedIn: currentUser });
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
