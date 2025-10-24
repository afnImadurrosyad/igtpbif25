"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthDebugPage() {
  const { isLogin, isLoading, user, role, nim, checkRole } = useAuth();
  const [session, setSession] = useState(null);
  const [lsKeys, setLsKeys] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const run = async () => {
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
      <h1 className="text-xl font-bold mb-4">Auth Debug</h1>
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
