'use client';
import { createClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

/* Config supabase client */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/* Manage supabase auth */
export const AuthSupabaseContext = createContext(null);

export const AuthSupabaseProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(null);

  /* Init session*/
  useEffect(() => {
    // get session data if there is an active session
    const session = supabase.auth.getSession();

    setUser(session?.user ?? null);
    setLoading(false);

    // listen for changes to auth
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user);
      setLoading(false);
      setAuthState(event);
    });
  }, []);

  // create signUp, signIn, signOut functions
  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signInWithPassword: (data) => supabase.auth.signInWithPassword(data),
    signInWithGoogle: () =>
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:3000/Homepage',
        },
      }),
    signOut: () => supabase.auth.signOut(),
    user,
    session,
    authState,
  };

  return (
    <AuthSupabaseContext.Provider value={value}>
      {children}
    </AuthSupabaseContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthSupabaseContext);
};
