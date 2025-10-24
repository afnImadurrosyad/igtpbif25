"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthDebugPage() {
  const { isLogin, isLoading, user, role, nim, checkRole } = useAuth();
  const [session, setSession] = useState(null);
  const [lsKeys, setLsKeys] = useState([]);
  const [errors, setErrors] = useState([]);
  const [envVars, setEnvVars] = useState({ url: null, keyPresent: false });

  useEffect(() => {
    const run = async () => {
      // Check env vars first
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON;
        setEnvVars({ url, keyPresent: !!key });

        if (!url || !key) {
          setErrors((e) => [
            ...e,
            "CRITICAL: Environment variables missing in production!",
          ]);
        }
      } catch (e) {
        setErrors((prev) => [...prev, `Env check error: ${e?.message}`]);
      }

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error)
          setErrors((e) => [...e, `getSession error: ${error.message}`]);
        setSession(data?.session ?? null);
      } catch (e) {
        setErrors((prev) => [...prev, `getSession fatal: ${e?.message}`]);
      }
      try {
        if (typeof window !== "undefined") {
          const keys = Object.keys(localStorage).filter((k) =>
            k.startsWith("sb-")
          );
          setLsKeys(keys);
        }
      } catch {}
    };
    run();
  }, []);

  const refresh = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data?.session ?? null);
  };

  return (
    <div className="min-h-screen p-6 font-mono">
      <h1 className="text-xl font-bold mb-4">Auth Debug (Production)</h1>

      {/* Environment Variables Check */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <div className="font-bold mb-2">Environment Variables:</div>
        <div>
          NEXT_PUBLIC_SUPABASE_URL:{" "}
          <b>{envVars.url ? "✅ Set" : "❌ MISSING"}</b>
        </div>
        <div>
          NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
          <b>{envVars.keyPresent ? "✅ Set" : "❌ MISSING"}</b>
        </div>
        {(!envVars.url || !envVars.keyPresent) && (
          <div className="mt-2 text-red-600 font-bold">
            ⚠️ Variables missing! Check Vercel Settings → Environment Variables
            → Production
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <div>
          isLoading: <b>{String(isLoading)}</b>
        </div>
        <div>
          isLogin: <b>{String(isLogin)}</b>
        </div>
        <div>
          role: <b>{String(role)}</b>
        </div>
        <div>
          nim: <b>{String(nim)}</b>
        </div>
        <div>
          user email: <b>{user?.email ?? "-"}</b>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div>
          session present: <b>{session ? "yes" : "no"}</b>
        </div>
        <div>
          access_token:{" "}
          <code className="break-all">{session?.access_token ?? "-"}</code>
        </div>
        <div>
          provider_token:{" "}
          <code className="break-all">{session?.provider_token ?? "-"}</code>
        </div>
      </div>
      <div className="space-y-2 mb-6">
        <div>localStorage sb-* keys:</div>
        <ul className="list-disc pl-6">
          {lsKeys.map((k) => (
            <li key={k}>
              <code>{k}</code>
            </li>
          ))}
          {lsKeys.length === 0 && <li>(none)</li>}
        </ul>
      </div>
      {errors.length > 0 && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded">
          <div className="font-bold">Errors</div>
          <ul className="list-disc pl-6">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={refresh}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Refresh session
        </button>
        <button
          onClick={checkRole}
          className="px-4 py-2 bg-blue-700 text-white rounded"
        >
          Run checkRole
        </button>
      </div>
    </div>
  );
}
