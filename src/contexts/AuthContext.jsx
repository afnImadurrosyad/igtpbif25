'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const checkRole = async (email) => {
    if (!email) return null;

    const match = email.match(/\.(\d{9})@student\.itera\.ac\.id$/);
    if (!match) {
      console.log('Format email tidak sesuai pola NIM');
      return 'guest';
    }

    const nim = match[1];
    const { data, error } = await supabase
      .from('dataif25')
      .select('nama')
      .eq('nim', nim)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking role:', error);
      console.log('jadi guest karena error');
      return 'guest';
    }

    //ini buat ngecek
    if (data) {
      return 'user';
    } else {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('nim', nim)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking role:', error);
        console.log('jadi guest karena error');
        return 'guest';
      }

      if (data) {
        console.log('aku admin kamu user :v');
        return data.role;
      } else {
        console.log('jadi guest karena gaada di kedua tabel');
        return 'guest';
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLogin(true);
        setUser(data.user);
        const userRole = await checkRole(data.user.email);
        setRole(userRole);
      }
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsLogin(true);
          setUser(session.user);
          const userRole = await checkRole(session.user.email);
          setRole(userRole);
        } else {
          setIsLogin(false);
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, user, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
