"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut({
          scope: "global", // Sign out from all sessions
        });

        if (error) {
          console.error("Logout error:", error.message);
          alert("Gagal logout. Coba lagi.");
          return;
        }

        // Clear any local storage items if needed
        if (typeof window !== "undefined") {
          localStorage.removeItem("userRole");
        }

        // Redirect to home page
        router.replace("/");
      } catch (err) {
        console.error("Unexpected error:", err);
        // Even if there's an error, try to redirect
        router.replace("/");
      }
    };

    logout();
  }, [router]);

  return (
    <div className="bg-gray-200 text-gray-700 flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-xl font-semibold mb-4">Logging out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
