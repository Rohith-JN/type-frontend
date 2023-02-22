import React, { useContext, createContext } from 'react';
import 'firebase/compat/auth';
import firebaseClient from './firebaseClient';
import useFirebaseAuth from './useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (email,password) => {},
  createUserWithEmailAndPassword: async (email,password) => {},
  signOut: async () => {}
});

export function AuthUserProvider({ children }) {
  firebaseClient();
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);