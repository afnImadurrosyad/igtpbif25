"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { supabase } from "../utils/supabaseClient";
import { saveRoleToLocal, clearRoleFromLocal } from "../utils/localRole";

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
      return role;
    }

    checkRoleInProgress.current = true;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted.current) return null;

      if (!user) {
        setRole(null);
        setNim(null);
        setNamaPeserta(null);
        clearRoleFromLocal();
        return null;
      }

      const email = user.email;
      const match = email.match(/\.(\d+)@student\.itera\.ac\.id$/);

      if (!match) {
        console.warn("Format email tidak sesuai pola NIM");
        setRole("guest");
        saveRoleToLocal("guest");
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
        setRole("guest");
        saveRoleToLocal("guest");
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
        setRole("guest");
        saveRoleToLocal("guest");
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
  }, [role]);

  // Jalankan sekali saat startup
  useEffect(() => {
    isMounted.current = true;

    const init = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getUser();

        if (!isMounted.current) return;

        if (data?.user) {
          setIsLogin(true);
          setUser(data.user);
          await checkRole();
        }

        // Hilangkan access_token hash
        if (
          typeof window !== "undefined" &&
          window.location.hash.includes("access_token")
        ) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
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
        if (!isMounted.current) return;

        if (event === "SIGNED_OUT") {
          setIsLogin(false);
          setUser(null);
          setRole(null);
          setNim(null);
          setNamaPeserta(null);
          clearRoleFromLocal();
        } else if (session?.user) {
          setIsLogin(true);
          setUser(session.user);
          await checkRole();
        } else {
          setIsLogin(false);
          setUser(null);
          setRole(null);
          setNim(null);
          setNamaPeserta(null);
          clearRoleFromLocal();
        }
      }
    );

    return () => {
      isMounted.current = false;
      listener.subscription.unsubscribe();
    };
  }, [checkRole]);

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
