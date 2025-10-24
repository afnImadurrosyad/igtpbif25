'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [nim, setNim] = useState(null);
  const [namaPeserta, setNamaPeserta] = useState(null);

  // 🔧 Fungsi utama: cek role pengguna
  const checkRole = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setRole(null);
        return null;
      }

      const email = user.email;
      const match = email.match(/\.(\d+)@student\.itera\.ac\.id$/);

      if (!match) {
        console.warn('Format email tidak sesuai pola NIM');
        setRole('guest');
        return 'guest';
      }

      const nimValue = match[1];
      setNim(nimValue);

      // 🔹 Cek apakah NIM ada di tabel dataif25
      const { data: dataPeserta, error: errorPeserta } = await supabase
        .from('dataif25')
        .select('nama')
        .eq('nim', String(nimValue))
        .maybeSingle();

      if (errorPeserta && errorPeserta.code !== 'PGRST116') {
        console.error('Error checking role (peserta):', errorPeserta);
        setRole('guest');
        return 'guest';
      }

      // 🔹 Jika ada di dataif25 → user biasa
      if (dataPeserta) {
        setNamaPeserta(dataPeserta.nama);
        setRole('user');
        return 'user';
      }

      // 🔹 Jika tidak ada, cek di tabel users (admin/mentor/daplok)
      const { data: dataUser, error: errorUser } = await supabase
        .from('users')
        .select('role')
        .eq('nim', String(nimValue))
        .maybeSingle();

      if (errorUser && errorUser.code !== 'PGRST116') {
        console.error('Error checking role (users):', errorUser);
        setRole('guest');
        return 'guest';
      }

      if (dataUser) {
        setRole(dataUser.role);
        return dataUser.role;
      }

      console.warn('NIM tidak ditemukan di kedua tabel');
      setRole('guest');
      return 'guest';
    } catch (error) {
      console.error('Fatal error in checkRole:', error);
      setRole('guest');
      return 'guest';
    }
  };

  // Jalankan sekali saat startup
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setIsLogin(true);
        setUser(data.user);
        await checkRole(); // otomatis setRole di dalamnya
      }

      // Hilangkan access_token hash
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState({}, document.title, '/');
      }
    };
    init();

    // Listener perubahan session Supabase
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setIsLogin(true);
          setUser(session.user);
          await checkRole();
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
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        role,
        nim,
        namaPeserta,
        checkRole,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
