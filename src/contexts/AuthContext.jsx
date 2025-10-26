'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { saveRoleToLocal, saveNimToLocal } from '@/utils/localRole';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [nim, setNim] = useState(null);
  const [namaPeserta, setNamaPeserta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent multiple concurrent checkRole calls
  const checkRoleInProgress = useRef(false);
  const isMounted = useRef(true);

  // 🔧 Fungsi utama: cek role pengguna with race condition prevention
  const checkRole = useCallback(async () => {
    // Prevent concurrent calls
    if (checkRoleInProgress.current) {
      console.log("checkRole already in progress, skipping...");
      return;
    }

    const nim = match[1];
    setNim(nim);
    saveNimToLocal(nim);
    const { data, error } = await supabase
      .from('dataif25')
      .select('nama')
      .eq('nim', nim)
      .single();
    setNamaPeserta(data);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted.current) return null;

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
        saveRoleToLocal(userRole);

        if (window.location.hash.includes('access_token')) {
          window.history.replaceState({}, document.title, '/');
        }
        return null;
      }

      const email = user.email;
      const match = email.match(/\.(\d+)@student\.itera\.ac\.id$/);

      if (!match) {
        console.warn("Format email tidak sesuai pola NIM");
        if (isMounted.current) {
          setRole("guest");
          saveRoleToLocal("guest");
        }
        return "guest";
      }

      const nimValue = match[1];
      if (isMounted.current) setNim(nimValue);

      // 🔹 Cek apakah NIM ada di tabel dataif25
      const { data: dataPeserta, error: errorPeserta } = await supabase
        .from("dataif25")
        .select("nama")
        .eq("nim", String(nimValue))
        .maybeSingle();

      if (!isMounted.current) return null;

      if (errorPeserta && errorPeserta.code !== "PGRST116") {
        console.error("Error checking role (peserta):", errorPeserta);
        if (isMounted.current) {
          setRole("guest");
          saveRoleToLocal("guest");
        }
        return "guest";
      }

      // 🔹 Jika ada di dataif25 → user biasa
      if (dataPeserta) {
        if (isMounted.current) {
          setNamaPeserta(dataPeserta.nama);
          setRole("user");
          saveRoleToLocal("user");
        }
        return "user";
      }

      // 🔹 Jika tidak ada, cek di tabel users (admin/mentor/daplok)
      const { data: dataUser, error: errorUser } = await supabase
        .from("users")
        .select("role")
        .eq("nim", String(nimValue))
        .maybeSingle();

      if (!isMounted.current) return null;

      if (errorUser && errorUser.code !== "PGRST116") {
        console.error("Error checking role (users):", errorUser);
        if (isMounted.current) {
          setRole("guest");
          saveRoleToLocal("guest");
        }
        return "guest";
      }

      if (dataUser) {
        if (isMounted.current) {
          setRole(dataUser.role);
          saveRoleToLocal(dataUser.role);
        }
        return dataUser.role;
      }

      console.warn("NIM tidak ditemukan di kedua tabel");
      if (isMounted.current) {
        setRole("guest");
        saveRoleToLocal("guest");
      }
      return "guest";
    } catch (error) {
      console.error("Fatal error in checkRole:", error);
      if (isMounted.current) {
        setRole("guest");
        saveRoleToLocal("guest");
      }
      return "guest";
    } finally {
      checkRoleInProgress.current = false;
    }
  }, []); // REMOVED role dependency to prevent infinite loop

  // Jalankan sekali saat startup
  useEffect(() => {
    isMounted.current = true;

    const init = async () => {
      try {
        setIsLoading(true);
        // 1) Attempt to exchange OAuth code/hash for a session if present (PKCE fallback)
        if (typeof window !== "undefined") {
          const hasCode = window.location.search.includes("code=");
          const hasAccessToken =
            window.location.hash.includes("access_token=") ||
            window.location.search.includes("access_token=");

          if (hasCode || hasAccessToken) {
            try {
              const { data: exData, error: exErr } =
                await supabase.auth.exchangeCodeForSession(
                  window.location.href
                );
              if (exErr) {
                console.error("exchangeCodeForSession error:", exErr.message);
              } else {
                console.log(
                  "exchangeCodeForSession success",
                  !!exData?.session
                );
              }
            } catch (ex) {
              console.error("exchangeCodeForSession fatal:", ex?.message);
            } finally {
              // Bersihkan query/hash agar URL rapi setelah proses OAuth
              try {
                const cleanUrl =
                  window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
              } catch {}
            }
          }
        }

        // 2) Lanjutkan cek user
        const { data } = await supabase.auth.getUser();

        if (!isMounted.current) return;

        if (data?.user) {
          setIsLogin(true);
          setUser(data.user);
          await checkRole();
        } else {
          // No user, set loading to false immediately
          setIsLoading(false);
        }

        // Catatan: Jangan menghapus hash OAuth secara manual di sini.
        // Supabase akan memproses hash saat inisialisasi (detectSessionInUrl: true).
        // Menghapus terlalu dini dapat menggagalkan set sesi.
      } catch (error) {
        console.error("Error during auth initialization:", error);
      } finally {
        if (isMounted.current) setIsLoading(false);
      }
    };

    init();

    // Listener perubahan session Supabase
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);

        if (!isMounted.current) return;

        if (event === "SIGNED_OUT") {
          setIsLogin(false);
          setUser(null);
          setRole(null);
          setNim(null);
          setNamaPeserta(null);
          clearRoleFromLocal();
          setIsLoading(false);
        } else if (session?.user) {
          setIsLogin(true);
          setUser(session.user);
          const userRole = await checkRole(session.user.email);
          setRole(userRole);
          saveRoleToLocal(userRole);

          if (window.location.hash.includes('access_token')) {
            window.history.replaceState({}, document.title, '/');
          }
        } else {
          console.log('User logged out');
          setIsLogin(false);
          setUser(null);
          setRole(null);
          setNim(null);
          setNamaPeserta(null);
          clearRoleFromLocal();
          setIsLoading(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [nim]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        role,
        nim,
        namaPeserta,
        checkRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
