"use client"; // jika pakai app router; di pages router tidak perlu
import React from "react";
import { supabase } from "../../utils/supabaseClient";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirectTo defaultnya akan ke /api/auth/callback (auth-helpers sudah support)
        // tetapi bisa override:
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth signIn error", error);
      alert("Login gagal: " + error.message);
      return;
    }

    // data.url berisi URL yang perlu di-redirect (Supabase host)
    if (data?.url) {
      // redirect ke Supabase-hosted OAuth flow
      window.location.href = data.url;
    }
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
}
