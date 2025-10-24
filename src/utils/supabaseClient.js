import { createClient } from "@supabase/supabase-js";

// Singleton pattern - only create one instance
let supabaseInstance = null;

const getSupabaseInstance = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Debug logging in development/production to catch missing env vars
    if (typeof window !== "undefined") {
      console.log("[Supabase] Initializing with:", {
        url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "MISSING",
        keyPresent: !!supabaseAnonKey,
      });
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      const msg =
        "CRITICAL: Supabase environment variables missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.";
      console.error(msg);
      throw new Error(msg);
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
        flowType: "pkce",
        debug: process.env.NODE_ENV === "development",
      },
      global: {
        headers: {
          "x-application-name": "igttpb-2025",
        },
      },
      db: {
        schema: "public",
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });

    // Log successful init
    if (typeof window !== "undefined") {
      console.log("[Supabase] Client initialized successfully");
    }
  }
  return supabaseInstance;
};

// Export the same instance for all uses
export const supabase = getSupabaseInstance();

// Helper function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("dataif25")
      .select("count")
      .limit(1);
    return !error;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};

// Deprecated: Use supabase directly instead
export const getSupabaseClient = () => {
  return getSupabaseInstance();
};
